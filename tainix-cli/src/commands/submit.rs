use crate::config::Config;
use crate::scaffolding::get_challenge_file_path;
use crate::tainix::client::TainixClient;
use anyhow::{Context, Result};
use regex::Regex;
use std::fs;
use std::process::Command;

/// Main handler for the 'submit' command.
pub async fn handle_submit(challenge_code: String, config: &Config) -> Result<()> {
    println!("Submitting challenge: {}...", challenge_code);

    let ts_file_path = get_challenge_file_path(&challenge_code, &config.output_dir)
        .context("Failed to find challenge file path")?;

    if !ts_file_path.exists() {
        anyhow::bail!("Challenge file not found: {}", ts_file_path.display());
    }

    // 1. Get the answer by running the script
    let answer = get_answer_from_script(&ts_file_path)?;
    println!("- Computed answer: '{}'", answer);

    // 2. Get the challenge token from the file content
    let token = get_token_from_file(&ts_file_path)?;

    // 3. Submit to the API
    let client = TainixClient::new(config);
    let response = client
        .submit_challenge_response(&token, &answer)
        .await
        .context("Failed to submit challenge response")?;

    println!("\n--- Submission Result ---");
    if response.success && response.game_success.unwrap_or(false) {
        println!("✅ Success!");
    } else {
        println!("❌ Failed!");
    }
    println!(
        "Message: {}",
        response
            .game_message
            .unwrap_or_else(|| "No message received.".to_string())
    );

    Ok(())
}

/// Executes the TypeScript file to get the final answer.
fn get_answer_from_script(ts_file_path: &std::path::Path) -> Result<String> {
    let output = Command::new("node")
        .arg(ts_file_path)
        .output()
        .context("Failed to execute Node.js script to get the answer")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("Node script execution failed: {}", stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let answer_prefix = "Challenge result is: ";

    stdout
        .lines()
        .find(|line| line.starts_with(answer_prefix))
        .map(|line| line.trim_start_matches(answer_prefix).to_string())
        .context("Could not find the answer in the script's output")
}

/// Parses the TypeScript file to extract the challenge token.
fn get_token_from_file(ts_file_path: &std::path::Path) -> Result<String> {
    let content =
        fs::read_to_string(ts_file_path).context("Failed to read challenge file to get token")?;

    // Regex to find "Challenge Token: <token>"
    let re = Regex::new(r"Challenge Token: ([a-f0-9]+)")
        .expect("Invalid regex pattern for token parsing");

    re.captures(&content)
        .and_then(|caps| caps.get(1))
        .map(|match_| match_.as_str().to_string())
        .context("Challenge token not found in the file header")
}
