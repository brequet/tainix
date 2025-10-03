use crate::tainix::models::ChallengeData; // Assuming your models are in this path
use lazy_static::lazy_static;
use serde_json;
use tera::{Context, Tera};

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let mut tera = Tera::default();
        tera.add_raw_template(
            "challenge.tera.ts",
            include_str!("templates/challenge.tera.ts"),
        )
        .expect("Failed to parse embedded template");
        tera
    };
}

pub fn render_ts_template(data: &ChallengeData) -> Result<String, tera::Error> {
    let mut context = Context::new();

    // --- Core Data ---
    context.insert("details", &data.details);

    context.insert("input_data", &data.input_data);

    // --- Input & Testing Data ---
    // Serialize data to a pretty JSON string for readability in the generated file.
    let input_str =
        serde_json::to_string_pretty(&data.input_data.input).unwrap_or_else(|_| "{}".to_string());
    context.insert("input", &input_str);

    let example_input_val = data
        .details
        .example_input
        .clone()
        .unwrap_or(serde_json::Value::Null);
    let example_input_str =
        serde_json::to_string_pretty(&example_input_val).unwrap_or_else(|_| "{}".to_string());
    context.insert("example_input", &example_input_str);

    // --- Dynamic Destructuring Keys ---
    // Extract keys from the example_input to generate the destructured function signature.
    // This assumes the main input and example input share the same structure.
    let data_keys: Vec<String> = if let Some(obj) = example_input_val.as_object() {
        obj.keys().cloned().collect()
    } else {
        Vec::new()
    };
    context.insert("data_keys", &data_keys);

    // --- Dynamic Command Handling ---
    // This list can be extended in the future without changing the template.
    let commands = vec!["test", "run"];
    context.insert("commands", &commands);

    // --- Expected Output for Testing ---
    // Serialize to a JSON string to handle all escaping and quoting automatically.
    let expected_output_str =
        serde_json::to_string(&data.details.expected_output.clone().unwrap_or_default())
            .unwrap_or_else(|_| "\"\"".to_string());
    context.insert("expected_output", &expected_output_str);

    // --- Render the Final Template ---
    TEMPLATES.render("challenge.tera.ts", &context)
}
