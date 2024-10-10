package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func RootCommand() *cobra.Command {
	rootCmd := &cobra.Command{
		Use:   "tainix",
		Short: "Tainix CLI",
	}

	rootCmd.AddCommand(startCommand())
	rootCmd.AddCommand(submitCommand())
	rootCmd.AddCommand(generateCommand())

	return rootCmd
}

func Execute() {
	if err := RootCommand().Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
