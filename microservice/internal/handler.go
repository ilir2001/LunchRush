package internal

import (
	"encoding/json"
	"net/http"

	"github.com/dapr/go-sdk/client"
	"github.com/gorilla/mux"
)

// CreateLunchSessionHandler handles POST /api/lunchsession
func CreateLunchSessionHandler(daprClient client.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var session LunchSession
		if err := json.NewDecoder(r.Body).Decode(&session); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}
		if err := SaveLunchSession(r.Context(), daprClient, session); err != nil {
			http.Error(w, "Failed to save session", http.StatusInternalServerError)
			return
		}
		_ = PublishLunchSession(r.Context(), daprClient, session)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(session)
	}
}

// GetLunchSessionHandler handles GET /api/lunchsession/{id}
func GetLunchSessionHandler(daprClient client.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		session, err := GetLunchSession(r.Context(), daprClient, id)
		if err != nil {
			http.Error(w, "Failed to get session", http.StatusInternalServerError)
			return
		}
		if session == nil {
			http.Error(w, "Session not found", http.StatusNotFound)
			return
		}
		json.NewEncoder(w).Encode(session)
	}
}

// ListLunchSessionsHandler handles GET /api/lunchsession
func ListLunchSessionsHandler(daprClient client.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessions, err := ListLunchSessions(r.Context(), daprClient)
		if err != nil {
			http.Error(w, "Failed to list sessions", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(sessions)
	}
}
