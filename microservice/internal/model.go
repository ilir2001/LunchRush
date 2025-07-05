package internal

type LunchSession struct {
	ID           string        `json:"id"`
	Participants []Participant `json:"participants"`
	Restaurant   string        `json:"restaurant"`
	Dishes       []string      `json:"dishes"`
	Locked       bool          `json:"locked"`
	Nominated    *Participant  `json:"nominated,omitempty"` // NEW
	LockTime     string        `json:"lockTime,omitempty"`  // NEW, ISO8601 string
}

type Participant struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Meal string `json:"meal"`
}
