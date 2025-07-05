package internal

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/dapr/go-sdk/client"
)

const (
	StateStoreName = "statestore"
	PubSubName     = "pubsub"
	SessionTopic   = "lunch-sessions"
)

// SaveLunchSession saves a LunchSession to Dapr state store
func SaveLunchSession(ctx context.Context, daprClient client.Client, session LunchSession) error {
	data, err := json.Marshal(session)
	if err != nil {
		return err
	}
	// Save the session itself
	if err := daprClient.SaveState(ctx, "statestore", session.ID, data, nil); err != nil {
		return err
	}

	// Update the session IDs list
	item, err := daprClient.GetState(ctx, "statestore", "lunchsessions", nil)
	if err != nil {
		return err
	}
	var ids []string
	if item.Value != nil {
		_ = json.Unmarshal(item.Value, &ids)
	}
	found := false
	for _, id := range ids {
		if id == session.ID {
			found = true
			break
		}
	}
	if !found {
		ids = append(ids, session.ID)
		data, _ := json.Marshal(ids)
		_ = daprClient.SaveState(ctx, "statestore", "lunchsessions", data, nil)
	}
	return nil
}

// GetLunchSession retrieves a LunchSession from Dapr state store
func GetLunchSession(ctx context.Context, daprClient client.Client, id string) (*LunchSession, error) {
	item, err := daprClient.GetState(ctx, StateStoreName, id, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to get session: %w", err)
	}
	if item.Value == nil {
		return nil, nil
	}
	var session LunchSession
	if err := json.Unmarshal(item.Value, &session); err != nil {
		return nil, fmt.Errorf("failed to unmarshal session: %w", err)
	}
	return &session, nil
}

// PublishLunchSession publishes a LunchSession to pubsub
func PublishLunchSession(ctx context.Context, daprClient client.Client, session LunchSession) error {
	data, err := json.Marshal(session)
	if err != nil {
		return fmt.Errorf("failed to marshal session: %w", err)
	}
	return daprClient.PublishEvent(ctx, PubSubName, SessionTopic, data)
}

// LogPubSubEvent logs received pubsub events (for demo)
func LogPubSubEvent(data []byte) {
	var session LunchSession
	if err := json.Unmarshal(data, &session); err != nil {
		log.Printf("PubSub: failed to unmarshal: %v", err)
		return
	}
	log.Printf("PubSub: received session: %+v", session)
}

func ListLunchSessions(ctx context.Context, daprClient client.Client) ([]LunchSession, error) {
	item, err := daprClient.GetState(ctx, "statestore", "lunchsessions", nil)
	if err != nil {
		return nil, err
	}
	var ids []string
	if item.Value != nil {
		if err := json.Unmarshal(item.Value, &ids); err != nil {
			return nil, err
		}
	}
	var sessions []LunchSession
	for _, id := range ids {
		s, err := GetLunchSession(ctx, daprClient, id)
		if err == nil && s != nil {
			sessions = append(sessions, *s)
		}
	}
	return sessions, nil
}
