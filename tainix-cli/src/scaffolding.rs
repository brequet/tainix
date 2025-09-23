use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

/// Creates the challenge directory and writes the TypeScript file.
pub fn write_challenge_file(output_dir: &str, challenge_code: &str, content: &str) -> Result<()> {
    let stripped_challenge_code = challenge_code.split("_").next().unwrap_or(challenge_code);

    let folder_path = Path::new(output_dir).join(stripped_challenge_code);
    fs::create_dir_all(&folder_path)
        .with_context(|| format!("Failed to create directory: {}", folder_path.display()))?;

    let file_path = folder_path.join(format!("{}.ts", challenge_code));
    fs::write(&file_path, content).with_context(|| {
        format!(
            "Failed to write TypeScript file to: {}",
            file_path.display()
        )
    })?;

    println!(
        "✅ Successfully generated project in '{}'",
        folder_path.display()
    );
    Ok(())
}
