use clap::{Parser, Subcommand};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
#[command(propagate_version = true)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    /// Generates a new challenge folder from a Tainix challenge URL name
    Generate {
        /// The name of the challenge as it appears in the URL (e.g., "Utilisation-d-une-fonction")
        #[arg(value_name = "CHALLENGE_NAME")]
        name: String,
    },
}
