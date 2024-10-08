package cmd

import (
	"bufio"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

func submitCommand() *cobra.Command {
	submitCmd := &cobra.Command{
		Use:   "submit <CHALLENGE_CODE>",
		Short: "Submit the challenge",
		Args:  cobra.ExactArgs(1),
		Run:   runSubmitCommand,
	}

	return submitCmd
}

type APIResponse struct {
	GameMessage string `json:"game_message"`
	GameSuccess bool   `json:"game_success"`
	Success     bool   `json:"success"`
}

func runSubmitCommand(cmd *cobra.Command, args []string) {
	challengeCode := args[0]

	if challengeCode == "" {
		fmt.Println("Challenge code is required")
		os.Exit(1)
	}

	playerResponse, challengeToken, err := computePlayerResponse(challengeCode)
	if err != nil {
		fmt.Printf("Error computing player response: %v\n", err)
		os.Exit(1)
	}

	// response, err := fetchChallenge(challengeCode)
	// if err != nil {
	// 	fmt.Printf("Error fetching challenge: %v\n", err)
	// 	os.Exit(1)
	// }

	res, err := submitResponse(challengeToken, playerResponse)
	if err != nil {
		fmt.Printf("Error submitting response: %v\n", err)
		os.Exit(1)
	}

	handleRes(res)
}

func computePlayerResponse(challengeCode string) (string, string, error) {
	parts := strings.Split(challengeCode, "_")
	if len(parts) < 2 {
		return "", "", fmt.Errorf("invalid challenge code format, or challenge file does not exist: %s", challengeCode)
	}

	folderPath := parts[0]
	challengeJsFilePath := fmt.Sprintf("./%s/%s.js", folderPath, challengeCode)

	cmd := exec.Command("node", challengeJsFilePath)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", "", fmt.Errorf("error creating stdout pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return "", "", fmt.Errorf("error starting node process: %w", err)
	}

	scanner := bufio.NewScanner(stdout)
	challengeTokenRegex := regexp.MustCompile(`CHALLENGE_TOKEN:\s*'([^']*)'`)
	answerRegex := regexp.MustCompile(`Answer:\s*'([^']*)'`)

	var challengeToken, answer string
	for scanner.Scan() {
		line := scanner.Text()
		if matches := answerRegex.FindStringSubmatch(line); len(matches) > 1 {
			answer = matches[1]
		}
		if matches := challengeTokenRegex.FindStringSubmatch(line); len(matches) > 1 {
			challengeToken = matches[1]
		}
	}

	if err := cmd.Wait(); err != nil {
		return "", "", fmt.Errorf("error waiting for node process to finish: %w", err)
	}

	if answer == "" {
		return "", "", fmt.Errorf("no answer found in the output")
	}

	return answer, challengeToken, nil
}

func submitResponse(gameToken, playerResponse string) (*APIResponse, error) {
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

func handleRes(response *APIResponse) {
	if response.GameSuccess {
		fmt.Println("Success !")
	} else {
		fmt.Println("Wrong answer..")
	}
}
