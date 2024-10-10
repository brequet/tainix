package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/brequet/tainix/generator"
	"github.com/brequet/tainix/tainix"
	"github.com/spf13/cobra"
)

func generateCommand() *cobra.Command {
	startCmd := &cobra.Command{
		Use:   "g <CHALLENGE_NAME>",
		Short: "generate a new challenge",
		Args:  cobra.ExactArgs(1),
		Run:   runGenerateCommand,
	}

	return startCmd
}

func runGenerateCommand(cmd *cobra.Command, args []string) {
	challengeName := args[0]
	if challengeName == "" {
		fmt.Println("Challenge name is required")
		os.Exit(1)
	}

	challengeData, err := getChallengeData(challengeName)
	if err != nil {
		fmt.Printf("Error getting challenge data: %v\n", err)
		os.Exit(1)
	}

	generatedTestFile, err := generator.GenerateChallengeFileContent(*challengeData)
	if err != nil {
		fmt.Printf("Error generating test file content: %v\n", err)
		os.Exit(1)
	}

	err = generateTestJsFile(challengeData.ChallengeCode, generatedTestFile)
	if err != nil {
		fmt.Printf("Error generating test file: %v\n", err)
		os.Exit(1)
	}
}

func getChallengeData(challengeName string) (*generator.ChallengeData, error) {
	challengePage, err := tainix.FetchChallengePage(challengeName)
	if err != nil {
		fmt.Printf("Error fetching challenge: %v\n", err)
		os.Exit(1)
	}

	challengePageData, err := extractChallengeData(challengePage)
	if err != nil {
		fmt.Printf("Error extracting challenge data: %v\n", err)
		os.Exit(1)
	}

	challengeExtraData, err := tainix.FetchChallenge(challengePageData.ChallengeCode)
	if err != nil {
		fmt.Printf("Error fetching challenge: %v\n", err)
		os.Exit(1)
	}

	challengeData := &generator.ChallengeData{
		ChallengeName:  challengeName,
		ChallengeCode:  challengePageData.ChallengeCode,
		DemoParameters: challengePageData.FormatJSON,
		DemoExpected:   challengePageData.ExpectedAnswer,
		DemoSteps:      challengePageData.DemoSteps,
		TestParameters: challengeExtraData.Input,
		TestToken:      challengeExtraData.Token,
	}

	return challengeData, nil
}

type ChallengePageData struct {
	FormatJSON     map[string]interface{}
	ExpectedAnswer interface{}
	ChallengeCode  string
	DemoSteps      []string
}

func extractChallengeData(html string) (*ChallengePageData, error) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		return nil, fmt.Errorf("error parsing HTML: %w", err)
	}

	data := &ChallengePageData{}

	// Extract the content of the div with class="format format-json"
	jsonData := doc.Find("div.format.format-json").Text()
	var parsedJSON map[string]interface{}
	err = json.Unmarshal(json.RawMessage(jsonData), &parsedJSON)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling JSON: %w", err)
	}
	data.FormatJSON = parsedJSON

	// Extract the expected answer
	doc.Find("p.h3.mt-4").Each(func(i int, s *goquery.Selection) {
		if s.Text() == "Réponse attendue" {
			data.ExpectedAnswer = s.Next().Text()
		}
	})

	// extract the challenge code, just look for href="/sandbox/play/CHALLENGECODE" in the page
	challengeCodeRe := regexp.MustCompile(`href="/sandbox/play/(.+?)"`)
	matches := challengeCodeRe.FindStringSubmatch(html)
	if len(matches) != 2 {
		return nil, fmt.Errorf("could not find challenge code in HTML")
	}

	data.ChallengeCode = matches[1]

	demoSteps, err := extractDemoSteps(html)
	if err != nil {
		fmt.Printf("Error extracting demo steps: %v\n", err)
	}
	data.DemoSteps = demoSteps

	return data, nil
}

func extractDemoSteps(html string) ([]string, error) {
	targetPartRe := regexp.MustCompile(`Déroulé étape par étape<\/p>\s*<p><span\s+[\w\s=":;#-]+><\/span>(.*?)<\/p>`)
	matches := targetPartRe.FindStringSubmatch(html)
	if len(matches) != 2 {
		return nil, fmt.Errorf("could not find demo steps in HTML")
	}

	htmlTagRe := regexp.MustCompile(`<\/?\w+\s*(?:[\w\s=":;#-]+)?\/?>`)
	textFromHtml := htmlTagRe.ReplaceAllString(matches[1], "")

	nonEmptySteps := []string{}
	steps := strings.Split(textFromHtml, "&nbsp;")
	for i, step := range steps {
		steps[i] = strings.TrimSpace(step)
		if len(steps[i]) > 0 {
			nonEmptySteps = append(nonEmptySteps, steps[i])
		}
	}

	return nonEmptySteps, nil
}

func generateTestJsFile(challengeCode, fileContent string) error {
	folderPath := strings.Split(challengeCode, "_")[0]

	err := os.MkdirAll(folderPath, 0755)
	if err != nil {
		return fmt.Errorf("failed to create folder for challenge: %w", err)
	}

	filePath := fmt.Sprintf("./%s/%s.js", folderPath, challengeCode)
	err = os.WriteFile(filePath, []byte(fileContent), 0644)
	if err != nil {
		return fmt.Errorf("failed to write JS file: %w", err)
	}

	fmt.Printf("Generated file at: %s\n", filePath)

	return nil
}
