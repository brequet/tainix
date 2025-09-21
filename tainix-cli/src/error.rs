use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Configuration error: {0}")]
    Config(String),

    #[error("Tainix API request failed: {0}")]
    Request(#[from] reqwest::Error),

    #[error("Tainix API error: {0}")]
    Api(String),

    #[error("Failed to parse HTML content: {0}")]
    Parsing(String),

    #[error("Filesystem error: {0}")]
    Io(#[from] std::io::Error),
}
