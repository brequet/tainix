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
    #[command(alias = "g")]
    Generate {
        /// The name of the challenge as it appears in the URL (e.g., "Utilisation-d-une-fonction")
        #[arg(value_name = "CHALLENGE_NAME")]
        name: String,
    },
    /// Tests a local challenge solution by running its TypeScript file
    #[command(alias = "t")]
    Test {
        /// The code of the challenge to test (e.g., "BANK_1")
        #[arg(value_name = "CHALLENGE_CODE")]
        code: String,
    },
    /// Submits a challenge solution to the Tainix API
    #[command(alias = "s")]
    Submit {
        /// The code of the challenge to submit (e.g., "BANK_1")
        #[arg(value_name = "CHALLENGE_CODE")]
        code: String,
    },
    /// Transpiles a challenge's TypeScript file into an executable JavaScript file
    #[command()]
    Js {
        /// The code of the challenge to transpile (e.g., "BANK1")
        #[arg(value_name = "CHALLENGE_CODE")]
        code: String,
    },
}
