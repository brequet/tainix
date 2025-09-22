use crate::error::AppError;
use crate::tainix::models::ChallengeDetails;
use regex::Regex;
use scraper::{Element, Html, Selector};
use serde_json;

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
    let h3_selector = Selector::parse("p.h3.mt-4").ok()?;

    // 1. Find the paragraph containing the steps by locating its header first
    let steps_html = document
        .select(&h3_selector)
        .find(|el| {
            el.text()
                .any(|text| text.contains("Déroulé étape par étape"))
        })
        .and_then(|el| el.next_sibling_element())
        .filter(|sibling| sibling.value().name() == "p")
        .map(|p| p.inner_html())?;

    // 2. Use a regex to strip all HTML tags (`<span>`, `<br>`, etc.) from the inner content.
    let tag_stripper = Regex::new(r"<[^>]*>").ok()?;
    let cleaned_text = tag_stripper.replace_all(&steps_html, "");

    // 3. The steps are separated by "&nbsp;". We split the cleaned text by this entity.
    let steps: Vec<String> = cleaned_text
        .split("&nbsp;")
        .map(|s| s.trim()) // Clean up leading/trailing whitespace
        .filter(|s| !s.is_empty()) // Remove any empty entries
        .map(|s| s.to_string())
        .collect();

    if steps.is_empty() { None } else { Some(steps) }
}
