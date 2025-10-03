use crate::config::Config;
use crate::error::AppError;
use crate::tainix::models::{ChallengeInputData, SubmissionResponse};
use base64::Engine;
use base64::engine::general_purpose;
use reqwest::header;
use serde_json::json;

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

    pub async fn submit_challenge_response(
        &self,
        game_token: &str,
        player_response: &str,
    ) -> Result<SubmissionResponse, AppError> {
        let json_payload = json!({ "data": player_response });
        let json_string = serde_json::to_string(&json_payload)
            .map_err(|e| AppError::Api(format!("Failed to serialize response: {}", e)))?;

        // This payload must be Base64 encoded.
        let base64_encoded_response = general_purpose::STANDARD.encode(json_string);

        let url = format!(
            "{}/api/games/response/{}/{}",
            TAINIX_BASE_URL, game_token, base64_encoded_response
        );

        let response: SubmissionResponse = self
            .client
            .get(&url)
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?;

        if !response.success {
            return Err(AppError::Api(format!(
                "API indicated submission failure: {:?}",
                response.errors.unwrap_or_default()
            )));
        }

        Ok(response)
    }
}
