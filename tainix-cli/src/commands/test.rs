use crate::config::Config;
use crate::scaffolding::get_challenge_file_path;
use anyhow::{Context, Result};
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

    // Execute the node command and stream its output
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

    if !status.success() {
        anyhow::bail!("Test execution failed.");
    }

    Ok(())
}
