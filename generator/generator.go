package generator

import (
	"bytes"
	_ "embed"
	"fmt"
	"strings"
	"text/template"
)

//go:embed test-template.js
var jsTemplate string

type ChallengeData struct {
	ChallengeName  string
	ChallengeCode  string
	DemoParameters map[string]interface{}
	DemoExpected   interface{}
	DemoSteps      []string
	TestParameters map[string]interface{}
	TestToken      string
}

type ChallengeTemplateData struct {
	ChallengeVariables         string
	ChallengeTestVariables     string
	ChallengeParams            string
	ChallengeTestExpectedValue interface{}
	ChallengeToken             string
	ChallengeCode              string
	ChallengeDemoSteps         string
}

func GenerateChallengeFileContent(challengeData ChallengeData) (string, error) {
	challengeTemplateData := ChallengeTemplateData{
		ChallengeVariables:         GenerateVariablesDeclaration(challengeData.TestParameters),
		ChallengeTestVariables:     GenerateVariablesDeclaration(challengeData.DemoParameters),
		ChallengeParams:            GenerateParams(challengeData.TestParameters),
		ChallengeTestExpectedValue: GeneratedExpectedValue(challengeData.DemoExpected),
		ChallengeToken:             challengeData.TestToken,
		ChallengeCode:              challengeData.ChallengeCode,
		ChallengeDemoSteps:         GenerateDemoSteps(challengeData.DemoSteps),
	}

	// Parse the template
	tmpl, err := template.New("challenge").Parse(jsTemplate)
	if err != nil {
		return "", fmt.Errorf("error parsing template: %w", err)
	}

	// Execute the template
	var buf bytes.Buffer
	err = tmpl.Execute(&buf, challengeTemplateData)
	if err != nil {
		return "", fmt.Errorf("error executing template: %w", err)
	}

	return buf.String(), nil
}

func GenerateVariablesDeclaration(params map[string]interface{}) string {
	var inputVars strings.Builder

	for key, value := range params {
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

func GenerateParams(input map[string]interface{}) string {
	params := []string{}

	for key, _ := range input {
		params = append(params, key)
	}

	return strings.Join(params, ", ")
}

func GeneratedExpectedValue(expected interface{}) string {
	switch v := expected.(type) {
	case string:
		return fmt.Sprintf("'%v'", v)
	default:
		return fmt.Sprintf("%v", v)
	}
}

func GenerateDemoSteps(steps []string) string {
	var demoSteps strings.Builder
	demoSteps.WriteString("// STEPS\n")

	for i, step := range steps {
		demoSteps.WriteString(fmt.Sprintf("\t// [%d/%d] %s\n", i+1, len(steps), step))
	}

	return demoSteps.String()
}
