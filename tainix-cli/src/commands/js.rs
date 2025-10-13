use crate::config::Config;
use crate::scaffolding::get_challenge_file_path;
use crate::vscode::open_editor;
use anyhow::{Context, Result, bail};
use regex::Regex;
use std::fs;
use std::fs::OpenOptions;
use std::io::Write;
use std::process::Command;
use tempfile::Builder;

/// Main handler for the `js` command.
/// Transpiles a challenge's TypeScript file into an executable JavaScript file.
pub async fn handle_js(challenge_code: &str, config: &Config) -> Result<()> {
    println!(
        "Transpiling challenge '{}' to JavaScript...",
        challenge_code
    );

    // 1. Find and read the TypeScript file
    let ts_filepath = get_challenge_file_path(challenge_code, &config.output_dir)?;
    if !ts_filepath.exists() {
        bail!("Challenge file not found at {}", ts_filepath.display());
    }
    let original_content = fs::read_to_string(&ts_filepath)
        .with_context(|| format!("Failed to read challenge file at {}", ts_filepath.display()))?;

    // 2. Pre-process the TS content in-memory (Part 1: cleanup)
    let content_head = match original_content.find("// --- Command Handling ---") {
        Some(index) => &original_content[..index],
        None => &original_content,
    };
    let content_no_exports = content_head.replace("export function", "function");

    // 3. Extract parameters from the `solve` function signature for later use
    let solve_sig_re = Regex::new(r"function solve\(\{\s*([^}]+)\s*\}\: InputData\)")
        .expect("Invalid regex for solve signature");
    let params_str = solve_sig_re
        .captures(&content_no_exports)
        .and_then(|caps| caps.get(1).map(|m| m.as_str().trim()))
        .with_context(|| "Could not find `solve` function signature to extract parameters.")?;

    // 4. Write the cleaned TS content to a temporary file for transpilation
    let mut temp_ts_file = Builder::new()
        .suffix(".ts")
        .tempfile()
        .with_context(|| "Failed to create temporary TypeScript file")?;
    temp_ts_file
        .write_all(content_no_exports.as_bytes())
        .with_context(|| "Failed to write to temporary TypeScript file")?;

    // 5. Transpile the temporary file using `tsc`
    let js_filepath = ts_filepath.with_extension("js");
    println!("Transpiling to {}...", js_filepath.display());

    let mut command = if cfg!(target_os = "windows") {
        Command::new("tsc.cmd")
    } else {
        Command::new("tsc")
    };

    let output = command
        .arg(temp_ts_file.path())
        .arg("--target")
        .arg("ES2022")
        .output()
        .with_context(|| "Failed to execute 'tsc'. Is the TypeScript compiler installed globally (`npm install -g typescript`)?")?;

    if !output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);
        bail!(
            "TypeScript transpilation failed.\n\n--- STDOUT ---\n{}\n\n--- STDERR ---\n{}",
            stdout.trim(),
            stderr.trim()
        );
    }

    // 6. Copy the generated JS file to the final destination
    let generated_js_path = temp_ts_file.path().with_extension("js");
    fs::copy(&generated_js_path, &js_filepath).with_context(|| {
        format!(
            "Failed to copy transpiled JS file from {} to {}",
            generated_js_path.display(),
            js_filepath.display()
        )
    })?;

    // 7. Post-process (Part 2: Append the execution footer to the final .js file)
    // Best Practice: Open the file in append mode to add the final lines.
    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .open(&js_filepath)
        .with_context(|| format!("Failed to open {} for appending", js_filepath.display()))?;

    let footer = format!(
        "\n\nconst result = solve({{ {} }});\nconsole.log(result);\n",
        params_str
    );

    file.write_all(footer.as_bytes())
        .with_context(|| format!("Failed to append footer to {}", js_filepath.display()))?;

    println!(
        "✅ Successfully created executable JavaScript file at {}",
        js_filepath.display()
    );

    open_editor(js_filepath)?;

    Ok(())
}
