package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	openai "github.com/sashabaranov/go-openai"
	"github.com/sashabaranov/go-openai/jsonschema"
)

func testHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, `{"error": "Mehtod not allowed"}`)
		return
	}

	var data map[string]string
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"error": "Invalid JSON"}`)
		return
	}

	prompt := fmt.Sprintf(
		"I identify as %s with a(n) %s face shape and type %s hair. Do you have any hairstyles I can try out?",
		data["gender"],
		data["faceType"],
		data["hairType"],
	)

	content := getHairRecommendations(prompt)

	if content != "" {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, content)
		return
	}
	
	w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprintf(w, `{"error": "Server error"}`)
}

func getHairRecommendations(prompt string) string {
	key := os.Getenv("API_KEY")
	client := openai.NewClient(key)
	
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4o20240806,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleSystem,
					Content: `"You are a professional hair stylist. Based on the user's gender identity, face shape, and hair type, recommend them a long, medium, 
					and short hairstyle that will compliment these features as well as give them instructions on what to ask their barber/stylist
					on how to achieve this hairstyle and how to style it after getting the haircut."`,
				},
				{
					Role: openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
			ResponseFormat: &openai.ChatCompletionResponseFormat{
				Type: openai.ChatCompletionResponseFormatTypeJSONSchema,
				JSONSchema: &openai.ChatCompletionResponseFormatJSONSchema{
					Name: "haircutRecommendations",
					Strict: true,
					Schema: jsonschema.Definition{
						Type: jsonschema.Object,
						Properties: map[string]jsonschema.Definition{
							"longHairRecommendation": {
								Type: jsonschema.Object,
								Properties: map[string]jsonschema.Definition{
									"haircutName": { Type: jsonschema.String },
									"haircutInstructions": { Type: jsonschema.String },
									"haircutStyling": { Type: jsonschema.String },
								},
								Required: []string{"haircutName", "haircutInstructions", "haircutStyling"},
								AdditionalProperties: false,
							},
							"mediumHairRecommendation": {
								Type: jsonschema.Object,
								Properties: map[string]jsonschema.Definition{
									"haircutName": { Type: jsonschema.String },
									"haircutInstructions": { Type: jsonschema.String },
									"haircutStyling": { Type: jsonschema.String },
								},
								Required: []string{"haircutName", "haircutInstructions", "haircutStyling"},
								AdditionalProperties: false,
							},
							"shortHairRecommendation": {
								Type: jsonschema.Object,
								Properties: map[string]jsonschema.Definition{
									"haircutName": { Type: jsonschema.String },
									"haircutInstructions": { Type: jsonschema.String },
									"haircutStyling": { Type: jsonschema.String },
								},
								Required: []string{"haircutName", "haircutInstructions", "haircutStyling"},
								AdditionalProperties: false,
							},
						},
						AdditionalProperties: false,
						Required: []string{
							"longHairRecommendation", 
							"mediumHairRecommendation", 
							"shortHairRecommendation",
						},
					},
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}

	content := resp.Choices[0].Message.Content
	return content
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		return
	}

	http.HandleFunc("/api/test", testHandler);
	fmt.Println("Server is running on port 8080");

	http.ListenAndServe(":8080", nil);
}