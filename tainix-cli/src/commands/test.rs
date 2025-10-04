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

    // Spawn the node process to run the test
    let output = Command::new("node")
        .arg(&ts_file_path)
        .arg("test")
        .output()
        .with_context(|| {
            format!(
                "Failed to execute node command for '{}'",
                ts_file_path.display()
            )
        })?;

    // Check if the test script itself executed successfully
    if output.status.success() {
        // The script ran, now check the output to see if the test passed logically
        let stdout = String::from_utf8_lossy(&output.stdout);

        if stdout.contains("✅ Test passed!") {
            println!("{}", stdout.trim()); // Print the success message from the script

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
            // The script ran but the test failed (e.g., "❌ Test failed:")
            // Print the output from the script which contains the failure details.
            io::stdout().write_all(&output.stdout)?;
            io::stderr().write_all(&output.stderr)?;
            anyhow::bail!("Test failed. See output above for details.");
        }
    } else {
        // The node process itself failed to run.
        io::stdout().write_all(&output.stdout)?;
        io::stderr().write_all(&output.stderr)?;
        anyhow::bail!("Test execution reported a failure.");
    }
}
