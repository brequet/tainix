package cmd

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"strings"

	"github.com/brequet/tainix/tainix"
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

	res, err := tainix.SubmitResponse(challengeToken, playerResponse)
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

func handleRes(response *tainix.APIResponse) {
	if response.GameSuccess {
		fmt.Println("Success !")
	} else {
		fmt.Println("Wrong answer..")
	}
}
