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
