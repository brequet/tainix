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
use commands::generate::handle_generate;
use config::Config;

#[tokio::main]
async fn main() -> Result<()> {
    let config = Config::load()?;
    let cli = Cli::parse();

    match cli.command {
        Commands::Generate { name } => {
            handle_generate(name, &config).await?;
        }
    }

    Ok(())
}
