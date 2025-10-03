use anyhow::{Context, Result};
use std::fs;
use std::path::{Path, PathBuf};

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
        "✅ Successfully generated project: '{}'",
        file_path.display()
    );

    Ok(())
}

/// Helper to get the path to a challenge's folder.
pub fn get_challenge_folder_path(challenge_code: &str, output_dir: &str) -> PathBuf {
    let stripped_challenge_code = challenge_code.split('_').next().unwrap_or(challenge_code);
    Path::new(output_dir).join(stripped_challenge_code)
}

/// Helper to get the full path to a challenge's TypeScript file.
pub fn get_challenge_file_path(challenge_code: &str, output_dir: &str) -> Result<PathBuf> {
    let folder_path = get_challenge_folder_path(challenge_code, output_dir);
    Ok(folder_path.join(format!("{}.ts", challenge_code)))
}
