use crate::config::Config;
use crate::scaffolding::write_challenge_file;
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
        .fetch_challenge_input_data(&challenge_name)
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

    Ok(())
}
