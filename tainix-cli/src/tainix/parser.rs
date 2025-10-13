use crate::tainix::models::ChallengeDetails;
use crate::{error::AppError, tainix::models::ChallengeInputData};
use regex::Regex;
use scraper::{Element, Html, Selector};
use serde_json::{self, Map, Value};

pub fn parse_challenge_page(
    challenge_name: &str,
    html_content: &str,
) -> Result<ChallengeDetails, AppError> {
    let document = Html::parse_document(html_content);

    let details = ChallengeDetails {
        challenge_name: challenge_name.to_string(),
        challenge_code: extract_challenge_code(&document)?,
        example_input: extract_example_input(&document),
        expected_output: extract_expected_output(&document),
        steps: extract_steps(&document).unwrap_or_default(),
    };

    Ok(details)
}

pub fn parse_sandbox_page_for_input_data(
    html_content: &str,
) -> Result<ChallengeInputData, AppError> {
    let document = Html::parse_document(html_content);

    let token = extract_sandbox_token(&document)?;
    let input = parse_sandbox_script_variables(&document)?;

    Ok(ChallengeInputData {
        input,
        token,
        success: true,
        errors: None,
    })
}

fn extract_sandbox_token(document: &Html) -> Result<String, AppError> {
    let selector = Selector::parse(r#"input[type="hidden"][name="token"]"#)
        .map_err(|_| AppError::Parsing("Failed to parse sandbox token selector".into()))?;

    document
        .select(&selector)
        .next()
        .and_then(|el| el.value().attr("value"))
        .map(|s| s.to_string())
        .ok_or_else(|| AppError::Parsing("Could not find sandbox token in HTML".into()))
}

fn parse_sandbox_script_variables(document: &Html) -> Result<Value, AppError> {
    let selector = Selector::parse("#editor")
        .map_err(|e| AppError::Parsing(format!("Failed to parse #editor selector: {}", e)))?;

    let editor_text = document
        .select(&selector)
        .next()
        .ok_or_else(|| AppError::Parsing("Could not find editor element with id='editor'".into()))?
        .text()
        .collect::<String>();

    let code_block = editor_text
        .split("// NE PAS TOUCHER")
        .nth(1)
        .ok_or_else(|| {
            AppError::Parsing("Could not find the expected comment-fenced code block".into())
        })?;

    let mut data = Map::new();

    for line in code_block.lines() {
        let trimmed_line = line.trim();
        if !trimmed_line.starts_with("const") {
            continue;
        }

        if let Some((declaration, value_str)) = trimmed_line.split_once('=') {
            // Extract the variable name
            if let Some(key) = declaration.split_whitespace().nth(1) {
                // Clean the value string and make it JSON-compliant
                let value_cleaned = value_str.trim().trim_end_matches(';');
                let json_compatible_str = value_cleaned.replace('\'', "\"");

                // Attempt to parse the string as a JSON Value
                let value = serde_json::from_str(&json_compatible_str)
                    .unwrap_or_else(|_| Value::String(value_cleaned.to_string()));

                data.insert(key.to_string(), value);
            }
        }
    }

    if data.is_empty() {
        return Err(AppError::Parsing(
            "Failed to parse any variables from the script block".into(),
        ));
    }

    println!("Parsed input data: {:?}", data);

    Ok(Value::Object(data))
}

fn extract_challenge_code(document: &Html) -> Result<String, AppError> {
    let selector = Selector::parse("a[href*='/sandbox/play/']")
        .map_err(|_| AppError::Parsing("Failed to parse selector".into()))?;

    document
        .select(&selector)
        .next()
        .and_then(|el| el.value().attr("href"))
        .and_then(|href| href.split('/').last().map(|s| s.to_string()))
        .ok_or_else(|| AppError::Parsing("Failed to extract challenge code".into()))
}

fn extract_example_input(document: &Html) -> Option<serde_json::Value> {
    let selector = Selector::parse("div.format.format-json").ok()?;
    document.select(&selector).next().and_then(|el| {
        let text = el.text().collect::<String>();
        serde_json::from_str(&text).ok()
    })
}

fn extract_expected_output(document: &Html) -> Option<String> {
    let selector = Selector::parse("p.h3.mt-4").ok()?;

    document
        .select(&selector)
        .find(|el| el.text().any(|text| text.contains("Réponse attendue")))
        .and_then(|el| el.next_sibling_element())
        .filter(|sibling| sibling.value().name() == "p")
        .map(|p| p.text().collect::<String>().trim().to_string())
}

fn extract_steps(document: &Html) -> Option<Vec<String>> {
    // 1. Use a more general selector to find ANY <p> tag.
    let p_selector = Selector::parse("p").ok()?;

    // 2. Find the header <p>, get its next sibling element which should be the steps <p>.
    let steps_html = document
        // Select all paragraphs
        .select(&p_selector)
        // Find the one that contains our header text
        .find(|el| {
            el.text()
                .any(|text| text.trim() == "Déroulé étape par étape")
        })
        // Get the next ELEMENT node, skipping over any whitespace/text nodes
        .and_then(|el| el.next_sibling_element())
        // Make sure this sibling is also a <p> tag
        .filter(|sibling| sibling.value().name() == "p")
        // If all checks pass, get its inner HTML
        .map(|p| p.inner_html())?;

    // 3. Use regex to strip all HTML tags (`<span>`, `<br>`, etc.).
    // This regex is good, it will remove any tag.
    let tag_stripper = Regex::new(r"<[^>]*>").ok()?;
    let cleaned_text = tag_stripper.replace_all(&steps_html, "");

    // 4. The steps are separated by "&nbsp;". We split the cleaned text by this entity.
    let steps: Vec<String> = cleaned_text
        .split("&nbsp;")
        .map(|s| s.trim()) // Clean up leading/trailing whitespace
        .filter(|s| !s.is_empty()) // Remove any empty entries
        .map(|s| s.to_string())
        .collect();

    if steps.is_empty() { None } else { Some(steps) }
}
