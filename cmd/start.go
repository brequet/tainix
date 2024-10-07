package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	_ "embed"

	"github.com/spf13/cobra"
)

const BASE_NAME = "challenge"

//go:embed template.js
var jsTemplate string

func startCommand() *cobra.Command {
	startCmd := &cobra.Command{
		Use:   "start <CHALLENGE_CODE>",
		Short: "Start a new challenge",
		Args:  cobra.ExactArgs(1),
		Run:   runStartCommand,
	}

	return startCmd
}

func runStartCommand(cmd *cobra.Command, args []string) {
	challengeCode := args[0]
	if challengeCode == "" {
		fmt.Println("Challenge code is required")
		os.Exit(1)
	}

	response, err := fetchChallenge(challengeCode)
	if err != nil {
		fmt.Printf("Error fetching challenge: %v\n", err)
		os.Exit(1)
	}

	err = generateJsFile(response, challengeCode)
	if err != nil {
		fmt.Printf("Error generating JS file: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Challenge fetched and JS file generated successfully!")
}

type ChallengeResponse struct {
	Input   map[string]interface{} `json:"input"`
	Token   string                 `json:"token"`
	Success bool                   `json:"success"`
}

func fetchChallenge(challengeCode string) (*ChallengeResponse, error) {
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

func generateJsFile(response *ChallengeResponse, challengeCode string) error {
	challengeToken := fmt.Sprintf("const CHALLENGE_TOKEN = '%s';\n", response.Token)

	var inputVars strings.Builder
	inputVars.WriteString("// Challenge variables\n")
	for key, value := range response.Input {
		inputVars.WriteString(fmt.Sprintf("const %s = '%v';\n", key, value))
	}

	jsContent := challengeToken + "\n" + inputVars.String() + "\n" + jsTemplate

	err := os.WriteFile(fmt.Sprintf("%s-%s.js", BASE_NAME, challengeCode), []byte(jsContent), 0644)
	if err != nil {
		return fmt.Errorf("failed to write JS file: %w", err)
	}

	return nil
}
