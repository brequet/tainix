use crate::error::AppError;
use anyhow::Result;

pub struct Config {
    pub user_token: String,
    pub phpsessid: String,
    pub output_dir: String,
}

impl Config {
    /// Loads configuration from environment variables.
    pub fn load() -> Result<Self> {
        dotenvy::dotenv().ok();

        let user_token = Self::load_mandatory_var("TAINIX_USER_TOKEN")?;
        let phpsessid = Self::load_mandatory_var("TAINIX_PHPSESSID")?;
        let output_dir = std::env::var("TAINIX_OUTPUT_DIR").unwrap_or_else(|_| "challenges".into());

        Ok(Self {
            user_token,
            phpsessid,
            output_dir,
        })
    }

    fn load_mandatory_var(name: &str) -> Result<String> {
        let value = std::env::var(name).map_err(|_| {
            AppError::Config(format!(
                "{} not found. Make sure it is set correctly in your .env file.",
                name
            ))
        })?;

        if value.is_empty() {
            return Err(AppError::Config(format!("{} must not be empty", name)).into());
        }

        Ok(value)
    }
}
