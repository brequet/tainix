use std::path::PathBuf;

use crate::config::Config;
use crate::scaffolding::{get_challenge_file_path, write_challenge_file};
use crate::tainix::models::ChallengeData;
use crate::tainix::{client::TainixClient, parser::parse_challenge_page};
use crate::templating::render_ts_template;
use anyhow::{Context, Result};

/// Main handler for the 'generate' command.
/// Orchestrates fetching, parsing, rendering, and file writing.
pub async fn handle_generate(challenge_name: String, config: &Config) -> Result<()> {
    println!("Generating challenge: {}...", challenge_name);

    let client = TainixClient::new(config);
    let html = client
        .fetch_challenge_data_page(&challenge_name)
        .await
        .context("Failed to fetch challenge page")?;
    println!("Successfully fetched challenge page.");

    let details = parse_challenge_page(&challenge_name, &html)
        .context("Failed to parse challenge details from HTML")?;
    println!("Successfully parsed challenge details.");

    let input_data = client
        .fetch_challenge_input_data(&details.challenge_code)
        .await
        .context("Failed to fetch challenge input data")?;

    let data = ChallengeData {
        details,
        input_data,
    };

    let ts_content = render_ts_template(&data).context("Failed to render TypeScript template")?;

    write_challenge_file(
        &config.output_dir,
        &data.details.challenge_code,
        &ts_content,
    )
    .context("Failed to write project files")?;

    println!(
        "You can test it using:\n\ttainix test {}",
        data.details.challenge_code
    );

    let _ = get_challenge_file_path(&data.details.challenge_code, &config.output_dir)
        .and_then(open_editor);

    Ok(())
}

fn open_editor(challenge_file_path: PathBuf) -> Result<()> {
    let status = std::process::Command::new("cmd")
        .arg("/C")
        .arg("code")
        .arg(challenge_file_path)
        .status();

    let status = status
        .context("Failed to execute 'code' command. Is VS Code installed and in your PATH?")?;

    if !status.success() {
        println!("Warning: 'code' command finished with a non-zero status.");
    }

    Ok(())
}
