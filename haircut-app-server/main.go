package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello from Go!");
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)

	 response := Response{
		Message: "Hello from Go!",
	 }

	 json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler);
	http.HandleFunc("/api/test", testHandler);
	fmt.Println("Server is running on port 8080");

	http.ListenAndServe(":8080", nil);
}