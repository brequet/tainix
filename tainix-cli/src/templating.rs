use crate::tainix::models::ChallengeData;
use lazy_static::lazy_static;
use serde_json;
use tera::{Context, Tera};

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let mut tera = Tera::default();
        tera.add_raw_template("challenge.ts", include_str!("templates/challenge.ts"))
            .expect("Failed to parse embedded template");
        tera
    };
}

pub fn render_ts_template(data: &ChallengeData) -> Result<String, tera::Error> {
    let mut context = Context::new();
    context.insert("data", data);

    let example_input_val = data
        .details
        .example_input
        .clone()
        .unwrap_or_else(|| serde_json::json!({ "message": "Could not parse example input" }));

    let example_input_str = serde_json::to_string_pretty(&example_input_val)
        .unwrap_or_else(|_| "{\n  \"message\": \"Could not parse example input\"\n}".to_string());
    context.insert("example_input", &example_input_str);

    let data_keys: Vec<String> = if let Some(obj) = example_input_val.as_object() {
        obj.keys().cloned().collect()
    } else {
        vec![]
    };
    context.insert("data_keys", &data_keys);

    TEMPLATES.render("challenge.ts", &context)
}
