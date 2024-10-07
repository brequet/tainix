package cmd

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func testCommand() *cobra.Command {
	testCmd := &cobra.Command{
		Use:   "test <CHALLENGE_CODE> [PLAYER_RESPONSE]",
		Short: "Test the challenge",
		Run:   runTestCommand,
	}

	return testCmd
}

type APIResponse struct {
	Success     bool     `json:"success"`
	GameMessage string   `json:"game_message"`
	Errors      []string `json:"errors"`
}

func runTestCommand(cmd *cobra.Command, args []string) {
	challengeCode := args[0]
	playerResponse := args[1]
	if challengeCode == "" {
		fmt.Println("Challenge code is required")
		os.Exit(1)
	}
	if playerResponse == "" {
		fmt.Println("Player response is required")
		os.Exit(1)
	}

	_, err := fetchChallenge(challengeCode)
	if err != nil {
		fmt.Printf("Error fetching challenge: %v\n", err)
		os.Exit(1)
	}

	err = submitResponse(challengeCode, playerResponse)
	if err != nil {
		fmt.Printf("Error submitting response: %v\n", err)
		os.Exit(1)
	}
}

func submitResponse(gameToken, playerResponse string) error {
	token := os.Getenv("TAINIX_TOKEN")
	if token == "" {
		return fmt.Errorf("TAINIX_TOKEN environment variable is not set")
	}

	data := map[string]string{"data": playerResponse}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal player response: %w", err)
	}

	base64EncodedResponse := base64.StdEncoding.EncodeToString(jsonData)
	url := fmt.Sprintf("https://tainix.fr/api/games/response/%s/%s", gameToken, base64EncodedResponse)
	fmt.Printf("Url: %s\n", url)

	resp, err := http.Post(url, "application/json", strings.NewReader(""))
	if err != nil {
		return fmt.Errorf("failed to submit response: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response body: %w", err)
	}

	fmt.Printf("Response body: %s\n", body)

	var apiResponse APIResponse
	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		return fmt.Errorf("failed to unmarshal API response: %w", err)
	}

	if !apiResponse.Success {
		return fmt.Errorf("API response indicates failure: %s", strings.Join(apiResponse.Errors, ", "))
	}

	fmt.Printf("Response submitted successfully. Game message: %s\n", apiResponse.GameMessage)
	return nil
}
