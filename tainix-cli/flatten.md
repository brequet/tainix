# Flattened Codebase

Total files: 17

## Table of Contents

1. [.\Cargo.toml](#file-1)
2. [.\challenges\DETECTIVE\DETECTIVE.ts](#file-2)
3. [.\src\cli.rs](#file-3)
4. [.\src\commands\generate.rs](#file-4)
5. [.\src\commands\mod.rs](#file-5)
6. [.\src\config.rs](#file-6)
7. [.\src\error.rs](#file-7)
8. [.\src\main.rs](#file-8)
9. [.\src\scaffolding.rs](#file-9)
10. [.\src\tainix\client.rs](#file-10)
11. [.\src\tainix\mod.rs](#file-11)
12. [.\src\tainix\models.rs](#file-12)
13. [.\src\tainix\parser.rs](#file-13)
14. [.\src\templates\challenge.ts](#file-14)
15. [.\src\templating.rs](#file-15)
16. [.\tainix-api-analysis\game.js](#file-16)
17. [.\tainix-api-analysis\notes.md](#file-17)

## File 1: .\Cargo.toml

```toml
[package]
name = "tainix-cli"
version = "0.1.0"
edition = "2024"

[dependencies]
anyhow = "1.0.100"
clap = { version = "4.5.48", features = ["derive"] }
dotenvy = "0.15.7"
lazy_static = "1.5.0"
regex = "1.11.2"
reqwest = { version = "0.12.23", features = ["json"] }
scraper = "0.24.0"
serde = { version = "1.0.225", features = ["derive"] }
serde_json = "1.0.145"
tera = "1.20.0"
thiserror = "2.0.16"
tokio = { version = "1.47.1", features = ["full"] }
```

## File 2: .\challenges\DETECTIVE\DETECTIVE.ts

```ts
/**
 * Tainix Challenge: meurtre-syntheria (DETECTIVE)
 *
 * Problem:
 * You can find the problem description on the Tainix website.
 *
 * No steps found for this challenge.
 */

// Example of the data you will receive:
const exampleData = {"indices":["taille_is_petit","poids_is_enrobe","poids_not_mince","cheveux_is_chatain","yeux_is_vairons"],"suspects":["nom:Sylvie,yeux:vairons,cheveux:chatain,taille:petit,poids:enrobe","nom:Rachida,yeux:vairons,cheveux:blanc,taille:moyen,poids:enrobe","nom:Alix,yeux:noir,cheveux:bleu,taille:petit,poids:moyen","nom:Mohamed,yeux:bleus,cheveux:roux,taille:petit,poids:enrobe","nom:Fatou,yeux:noir,cheveux:vert,taille:grand,poids:enrobe"]};

// --- Your implementation below ---

function solve(data: typeof exampleData): string | number {
  console.log('Received data:', data);
  
  // TODO: Implement your solution here
  const result = 0;
  
  return result;
}

// --- Tests ---

const result = solve(exampleData);
console.log(`Your result is: ${result}`);

const expectedOutput = `Sylvie_4`;
console.log(`Expected output is: ${expectedOutput}`);

if (String(result) === String(expectedOutput)) {
    console.log("✅ Success!");
} else {
    console.log("❌ Failed!");
}
```

## File 3: .\src\cli.rs

```rs
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
```

## File 4: .\src\commands\generate.rs

```rs
use crate::config::Config;
use crate::scaffolding::write_challenge_file;
use crate::tainix::models::ChallengeData;
use crate::tainix::{client::TainixClient, parser::parse_challenge_page};
use crate::templating::render_ts_template;
use anyhow::{Context, Result};

/// Main handler for the 'generate' command.
/// Orchestrates fetching, parsing, rendering, and file writing.
pub async fn handle_generate(challenge_name: String, config: &Config) -> Result<()> {
    println!("Generating challenge: {}...", challenge_name);

    let client = TainixClient::new(config);
    let html = client
        .fetch_challenge_data_page(&challenge_name)
        .await
        .context("Failed to fetch challenge page")?;
    println!("Successfully fetched challenge page.");

    let details = parse_challenge_page(&challenge_name, &html)
        .context("Failed to parse challenge details from HTML")?;
    println!("Successfully parsed challenge details.");

    let input_data = client
        .fetch_challenge_input_data(&details.challenge_code)
        .await
        .context("Failed to fetch challenge input data")?;

    let data = ChallengeData {
        details,
        input_data,
    };

    let ts_content = render_ts_template(&data).context("Failed to render TypeScript template")?;

    write_challenge_file(
        &config.output_dir,
        &data.details.challenge_code,
        &ts_content,
    )
    .context("Failed to write project files")?;

    Ok(())
}
```

## File 5: .\src\commands\mod.rs

```rs
pub mod generate;
```

## File 6: .\src\config.rs

```rs
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
```

## File 7: .\src\error.rs

```rs
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
```

## File 8: .\src\main.rs

```rs
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
```

## File 9: .\src\scaffolding.rs

```rs
use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

/// Creates the challenge directory and writes the TypeScript file.
pub fn write_challenge_file(output_dir: &str, challenge_code: &str, content: &str) -> Result<()> {
    let folder_path = Path::new(output_dir).join(challenge_code);
    fs::create_dir_all(&folder_path)
        .with_context(|| format!("Failed to create directory: {}", folder_path.display()))?;

    let file_path = folder_path.join(format!("{}.ts", challenge_code));
    fs::write(&file_path, content).with_context(|| {
        format!(
            "Failed to write TypeScript file to: {}",
            file_path.display()
        )
    })?;

    println!(
        "✅ Successfully generated project in '{}'",
        folder_path.display()
    );
    Ok(())
}
```

## File 10: .\src\tainix\client.rs

```rs
use crate::config::Config;
use crate::error::AppError;
use crate::tainix::models::ChallengeInputData;
use reqwest::header;

const TAINIX_BASE_URL: &str = "https://tainix.fr";

pub struct TainixClient<'a> {
    client: reqwest::Client,
    config: &'a Config,
}

impl<'a> TainixClient<'a> {
    pub fn new(config: &'a Config) -> Self {
        Self {
            client: reqwest::Client::new(),
            config,
        }
    }

    pub async fn fetch_challenge_data_page(
        &self,
        challenge_name: &str,
    ) -> Result<String, AppError> {
        let url = format!("{}/challenge/{}", TAINIX_BASE_URL, challenge_name);
        let cookie_value = format!("PHPSESSID={}", self.config.phpsessid);

        let response = self
            .client
            .get(&url)
            .header(header::COOKIE, cookie_value)
            .send()
            .await?
            .error_for_status()?;

        let html = response.text().await?;

        if html.contains("Il semblerait que tu aies rencontré un problème") {
            return Err(AppError::Parsing(
                "Failed to get challenge page. Your PHPSESSID may be invalid or expired."
                    .to_string(),
            ));
        }

        Ok(html)
    }

    pub async fn fetch_challenge_input_data(
        &self,
        challenge_code: &str,
    ) -> Result<ChallengeInputData, AppError> {
        let url = format!(
            "{}/api/games/start/{}/{}",
            TAINIX_BASE_URL, self.config.user_token, challenge_code
        );

        println!("Fetching challenge input data from URL: {}", url);
        let input_data: ChallengeInputData = self
            .client
            .get(&url)
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?;

        if !input_data.success {
            return Err(AppError::Api(
                "Failed to fetch challenge input data. Your TAINIX_USER_TOKEN may be invalid or expired.".to_string(),
            ));
        }

        Ok(input_data)
    }
}
```

## File 11: .\src\tainix\mod.rs

```rs
pub mod client;
pub mod models;
pub mod parser;
```

## File 12: .\src\tainix\models.rs

```rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeData {
    pub details: ChallengeDetails,
    pub input_data: ChallengeInputData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeDetails {
    pub challenge_name: String,
    pub challenge_code: String,
    pub example_input: Option<String>,
    pub expected_output: Option<String>,
    pub steps: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeInputData {
    pub input: ChallengeInput,
    pub token: String,
    pub success: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeInput {
    pub values: Vec<i32>,
}
```

## File 13: .\src\tainix\parser.rs

```rs
use crate::error::AppError;
use crate::tainix::models::ChallengeDetails;
use regex::Regex;
use scraper::{Element, Html, Selector};

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

fn extract_example_input(document: &Html) -> Option<String> {
    let selector = Selector::parse("div.format.format-json").ok()?;
    document
        .select(&selector)
        .next()
        .map(|el| el.text().collect::<String>().trim().to_string())
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
```

## File 14: .\src\templates\challenge.ts

```ts
/**
 * Tainix Challenge: {{ data.details.challenge_name }} [{{ data.details.challenge_code }}]
 *
 * Problem:
 * You can find the problem description on the Tainix website.
 *
{%- if data.details.steps %}
 * Steps:
{%- for step in data.details.steps %}
 * - {{ step }}
{%- endfor %}
{%- else %}
 * No steps found for this challenge.
{%- endif %}
 */

// Example of the data you will receive:
const exampleData = {{ example_input | safe }};

// --- Your implementation below ---

function solve(data: typeof exampleData): string | number {
  console.log('Received data:', data);
  
  // TODO: Implement your solution here
  const result = 0;
  
  return result;
}

// --- Tests ---

const result = solve(exampleData);
console.log(`Your result is: ${result}`);

const expectedOutput = `{{ data.details.expected_output | default(value="") }}`;
console.log(`Expected output is: ${expectedOutput}`);

if (String(result) === String(expectedOutput)) {
    console.log("✅ Success!");
} else {
    console.log("❌ Failed!");
}
```

## File 15: .\src\templating.rs

```rs
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
```

## File 16: .\tainix-api-analysis\game.js

```js
class Game {
  /**
   * URL de l'API
   *
   * @type {string}
   */
  apiBaseUrl = "https://tainix.fr/";

  /**
   * Code du challenge
   *
   * @type {string}
   */
  engineCode;

  /**
   * Key d'identification du joueur
   *
   * @type {string}
   */
  playerKey;

  /**
   * Token du jeu
   *
   * @type {string}
   */
  gameToken;

  /**
   * Data du jeu
   *
   * @type {object}
   */
  gameData;

  /**
   * Constructeur
   *
   * @param {string} key
   * @param {string} engineCode
   */
  constructor(playerKey, engineCode) {
    this.playerKey = playerKey;
    this.engineCode = engineCode;

    document.getElementById("engine-code").innerHTML = this.engineCode;
  }

  /**
   * Lance le jeu
   */
  async start() {
    try {
      const response = await fetch(
        this.apiBaseUrl +
          "api/games/start/" +
          this.playerKey +
          "/" +
          this.engineCode
      );
      const data = await response.json();

      if (!data.success) {
        console.log(data.errors);
        this.showMessage(data.errors.join(", "));

        return;
      }

      this.gameToken = data.token;
      this.gameData = data.input;

      document.getElementById("game-data").innerHTML = JSON.stringify(
        this.gameData,
        null,
        4
      );
    } catch (error) {
      console.log(error);
      this.showErrorMessage();
    }
  }

  /**
   * Envoi des data du joueur
   *
   * @param {*} playerResponse
   */
  async output(playerResponse) {
    try {
      const base64EncodedPlayerResponse = btoa(JSON.stringify(playerResponse));

      const response = await fetch(
        this.apiBaseUrl +
          "api/games/response/" +
          this.gameToken +
          "/" +
          base64EncodedPlayerResponse
      );
      const data = await response.json();

      if (!data.success) {
        console.log(data.errors);
        this.showMessage(data.errors.join(", "));

        return;
      }

      console.log(data);
      this.showMessage(data.game_message);
    } catch (error) {
      console.log(error);
      this.showErrorMessage();
    }
  }

  /**
   * Affichage d'un message
   *
   * @param {string} message
   */
  showMessage(message) {
    document.getElementById("message").innerHTML = `${message}`;
  }

  /**
   * Affichage d'un message d'erreur
   */
  showErrorMessage() {
    this.showMessage("Une erreur est survenue.");
  }
}
```

## File 17: .\tainix-api-analysis\notes.md

```md
# Tainix API analysis

## Dedicated game's API

Getting a challenge with dedicated game's API gives problem input, and token to submit result:

```bash
curl https://tainix.fr/api/games/start/$PLAYER_KEY/STARTER_6     
```

Response:

```json
{"input":{"values":[33,45,64,40,77,25,33,57,37,80,27,93,58,75,77,34,10,14,72,95,90,55,82,35,64,79,63,43,47,67]},"token":"41664e4e2453d519927b91b45d77fee50355d76a98b2d1f125ae1a5fb1835468c57e383e57fe8e2c","success":true}
```

## Website API

Challenge page data :

```bash
curl 'https://tainix.fr/challenge/Utilisation-d-une-fonction' `
  -H 'Cookie: PHPSESSID=$PHPSESSID;' `
  --compressed 
```

Response: Challenge page.

- Contains the challenge code, eg: `code du challenge pour résolution via l'API : CHALLENGECODE` or look for `href="/sandbox/play/CHALLENGECODE"
- Example data for resolution with steps:
  - JSON input example in div `div.format.format-json`: `{"values":[48,57,90,34,55,72,83,27,27,33,80,40,16,18,23,45,94,93,73,43,70,50,40,69,12,95,58,91]}`
  - Expected response could located in the `p` element right after the `p.h3.mt-4` element:
    ```html
    <p class="h3 mt-4">Réponse attendue</p>
    <p>90-42-54-63-69-72-51-54-30-36</p>
    ```
  - Explicative steps for the challenge can be found too:
    - First locate the block that could holds the steps if present: `Déroulé étape par étape<\/p>\s*<p><span\s+[\w\s=":;#-]+><\/span>(.*?)<\/p>`
    ```html
    `Déroulé étape par étape</p>
       <p><span style="display: inline-block; background: #8e44ad; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; Indice n°: 1<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Anne car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Issa car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Claude car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Ethan car sa caractéristique de type yeux n'est pas vairons<br></p>`
    ``` 
  - 


WARNING: PHPSESSID probably outdated if page contains "Il semblerait que tu aies rencontré un problème".
```

