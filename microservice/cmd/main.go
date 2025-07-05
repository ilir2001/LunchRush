package main

import (
	"log"
	"net/http"

	"github.com/dapr/go-sdk/client"
	"github.com/gorilla/mux"
	"github.com/ilir2001/lunchrush/microservice/internal"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()
	daprClient, err := client.NewClient()
	if err != nil {
		log.Fatalf("Failed to create Dapr client: %v", err)
	}
	defer daprClient.Close()

	router.HandleFunc("/api/lunchsession", internal.CreateLunchSessionHandler(daprClient)).Methods("POST")
	router.HandleFunc("/api/lunchsession/{id}", internal.GetLunchSessionHandler(daprClient)).Methods("GET")
	router.HandleFunc("/api/lunchsession", internal.ListLunchSessionsHandler(daprClient)).Methods("GET")
	router.HandleFunc("/api/lunchsession/{id}/nominate", internal.NominateHandler(daprClient)).Methods("POST")
	router.HandleFunc("/api/lunchsession/{id}/lock", internal.LockSessionHandler(daprClient)).Methods("POST")

	// Add CORS middleware
	handler := cors.AllowAll().Handler(router)

	log.Println("LunchRush backend running on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
