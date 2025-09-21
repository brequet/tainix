use crate::tainix::models::ChallengeData;
use lazy_static::lazy_static;
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
    context.insert("data", &data.details);

    let example_input = data
        .details
        .example_input
        .as_deref()
        .unwrap_or("{\n  \"message\": \"Could not parse example input\"\n}");
    context.insert("example_input", example_input);

    TEMPLATES.render("challenge.ts", &context)
}
