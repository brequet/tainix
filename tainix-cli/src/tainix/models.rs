use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeData {
    pub details: ChallengeDetails,
    pub input_data: ChallengeInputData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeDetails {
    pub challenge_name: String,
    pub challenge_code: String,
    pub example_input: Option<Value>,
    pub expected_output: Option<String>,
    pub steps: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChallengeInputData {
    pub input: HashMap<String, Value>,
    pub token: String,
    pub success: bool,
}
