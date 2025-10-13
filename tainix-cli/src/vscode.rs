use std::path::PathBuf;

use anyhow::{Context, Result};

pub fn open_editor(challenge_file_path: PathBuf) -> Result<()> {
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
