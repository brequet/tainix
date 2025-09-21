package tainix

import (
	"compress/gzip"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

func FetchChallengePage(challengeName string) (string, error) {
	phpSessionID := os.Getenv("TAINIX_PHPSESSID")
	fmt.Printf("PHP session ID: %s\n", phpSessionID)
	if phpSessionID == "" {
		return "", fmt.Errorf("TAINIX_PHPSESSID environment variable is not set")
	}

	url := fmt.Sprintf("https://tainix.fr/challenge/%s", challengeName)

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	req.Header.Set("Accept-Language", "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3")
	req.Header.Set("Accept-Encoding", "gzip, deflate, br")
	req.Header.Set("Referer", "https://tainix.fr/users/challenges")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Cookie", fmt.Sprintf("PHPSESSID=%s", phpSessionID))
	req.Header.Set("Upgrade-Insecure-Requests", "1")
	req.Header.Set("Sec-Fetch-Dest", "document")
	req.Header.Set("Sec-Fetch-Mode", "navigate")
	req.Header.Set("Sec-Fetch-Site", "same-origin")
	req.Header.Set("Priority", "u=0, i")

	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error sending request: %w", err)
	}
	defer resp.Body.Close()

	var reader io.Reader
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, err = gzip.NewReader(resp.Body)
		if err != nil {
			return "", fmt.Errorf("error creating gzip reader: %w", err)
		}
	default:
		reader = resp.Body
	}

	body, err := io.ReadAll(reader)
	if err != nil {
		return "", fmt.Errorf("error reading response body: %w", err)
	}

	if !isPageOk(string(body)) {
		return "", fmt.Errorf("error fetching challenge page '%s'. Maybe update the TAINIX_PHPSESSID env var", url)
	}

	return string(body), nil
}

func isPageOk(html string) bool {
	return !strings.Contains(html, "Il semblerait que tu aies rencontré un problème")
}

type ChallengeResponse struct {
	Input   map[string]interface{} `json:"input"`
	Token   string                 `json:"token"`
	Success bool                   `json:"success"`
}

func FetchChallenge(challengeCode string) (*ChallengeResponse, error) {
	token := os.Getenv("TAINIX_TOKEN")
	if token == "" {
		return nil, fmt.Errorf("TAINIX_TOKEN environment variable is not set")
	}

	url := fmt.Sprintf("https://tainix.fr/api/games/start/%s/%s", token, challengeCode)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch challenge: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var challenge ChallengeResponse
	err = json.Unmarshal(body, &challenge)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if !challenge.Success {
		return nil, fmt.Errorf("challenge fetch was not successful")
	}

	return &challenge, nil
}

type APIResponse struct {
	GameMessage string `json:"game_message"`
	GameSuccess bool   `json:"game_success"`
	Success     bool   `json:"success"`
}

func SubmitResponse(gameToken, playerResponse string) (*APIResponse, error) {
	token := os.Getenv("TAINIX_TOKEN")
	if token == "" {
		return nil, fmt.Errorf("TAINIX_TOKEN environment variable is not set")
	}

	data := map[string]string{"data": playerResponse}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal player response: %w", err)
	}

	fmt.Printf("Sending: %s\n", jsonData)

	base64EncodedResponse := base64.StdEncoding.EncodeToString(jsonData)
	url := fmt.Sprintf("https://tainix.fr/api/games/response/%s/%s", gameToken, base64EncodedResponse)
	fmt.Printf("Url: %s\n", url)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to submit response: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	fmt.Printf("Response body: %s\n", body)

	var apiResponse APIResponse
	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal API response: %w", err)
	}

	return &apiResponse, nil
}
