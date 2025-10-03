use super::submit::handle_submit;
use crate::config::Config;
use crate::scaffolding::get_challenge_file_path;
use anyhow::{Context, Result};
use std::io::{self, Write};
use std::process::Command;

/// Main handler for the 'test' command.
/// Executes the TypeScript test for a given challenge.
pub async fn handle_test(challenge_code: String, config: &Config) -> Result<()> {
    println!("Testing challenge: {}...", challenge_code);

    let ts_file_path = get_challenge_file_path(&challenge_code, &config.output_dir)
        .context("Failed to determine challenge file path")?;

    if !ts_file_path.exists() {
        anyhow::bail!("Challenge file not found at: {}", ts_file_path.display());
    }

    let mut child = Command::new("node")
        .arg(&ts_file_path)
        .arg("test")
        .spawn()
        .with_context(|| {
            format!(
                "Failed to execute node command for '{}'",
                ts_file_path.display()
            )
        })?;

    let status = child
        .wait()
        .context("Failed to wait for node process to finish")?;

    if status.success() {
        // Test passed, now prompt the user for submission
        print!("\nDo you want to submit the solution now? (y/N) ");
        io::stdout().flush().context("Failed to flush stdout")?;

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .context("Failed to read user input")?;

        println!(); // Add a newline for better formatting

        if input.trim().eq_ignore_ascii_case("y") || input.trim().eq_ignore_ascii_case("yes") {
            // User confirmed, call the submit handler directly.
            handle_submit(challenge_code, config).await
        } else {
            // User declined or entered something else.
            println!(
                "Submission skipped. You can run this command to submit later:\n\ntainix submit {}\n",
                challenge_code
            );
            Ok(())
        }
    } else {
        anyhow::bail!("Test execution reported a failure.");
    }
}
