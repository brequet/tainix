package cmd

import (
	"fmt"
	"os"
	"strings"

	_ "embed"

	"github.com/brequet/tainix/tainix"
	"github.com/spf13/cobra"
)

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

	response, err := tainix.FetchChallenge(challengeCode)
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

func generateJsFile(response *tainix.ChallengeResponse, challengeCode string) error {
	challengeToken := fmt.Sprintf("console.log(\"CHALLENGE_TOKEN: '%s'\");\n", response.Token)

	jsContent := challengeToken + "\n" + generateInputVars(response) + "\n" + jsTemplate

	folderPath := strings.Split(challengeCode, "_")[0]

	err := os.MkdirAll(folderPath, 0755)
	if err != nil {
		return fmt.Errorf("failed to create folder for challenge: %w", err)
	}

	err = os.WriteFile(fmt.Sprintf("./%s/%s.js", folderPath, challengeCode), []byte(jsContent), 0644)
	if err != nil {
		return fmt.Errorf("failed to write JS file: %w", err)
	}

	return nil
}

func generateInputVars(response *tainix.ChallengeResponse) string {
	var inputVars strings.Builder
	inputVars.WriteString("// Challenge variables\n")
	inputVars.WriteString(fmt.Sprintf("// INPUT = %v;\n", response.Input))

	for key, value := range response.Input {
		switch v := value.(type) {
		case string:
			inputVars.WriteString(fmt.Sprintf("const %s = '%v';\n", key, v))
		case []interface{}:
			// Handle array type
			inputVars.WriteString(fmt.Sprintf("const %s = [", key))
			for i, elem := range v {
				if i > 0 {
					inputVars.WriteString(", ")
				}
				switch e := elem.(type) {
				case string:
					inputVars.WriteString(fmt.Sprintf("'%v'", e))
				default:
					inputVars.WriteString(fmt.Sprintf("%v", e))
				}
			}
			inputVars.WriteString("];\n")
		default:
			inputVars.WriteString(fmt.Sprintf("const %s = %v;\n", key, v))
		}
	}

	return inputVars.String()
}
