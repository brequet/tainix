mod cli;
mod commands;
mod config;
mod error;
mod scaffolding;
mod tainix;
mod templating;

use anyhow::Result;
use clap::Parser;

use cli::{Cli, Commands};
use commands::{generate::handle_generate, submit::handle_submit, test::handle_test};
use config::Config;

#[tokio::main]
async fn main() -> Result<()> {
    let config = Config::load()?;
    let cli = Cli::parse();

    match cli.command {
        Commands::Generate { name } => {
            handle_generate(name, &config).await?;
        }
        Commands::Test { code } => {
            handle_test(code, &config).await?;
        }
        Commands::Submit { code } => {
            handle_submit(code, &config).await?;
        }
    }

    Ok(())
}
