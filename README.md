# LunchRush – How to Run

## Prerequisites

- [Go](https://golang.org/dl/) 1.18+
- [Node.js](https://nodejs.org/) 18+
- [Dapr CLI](https://docs.dapr.io/get-dapr/cli/)
- [Docker](https://www.docker.com/) (required for Dapr default components)

---

## 1. Start Dapr Infrastructure

LunchRush uses Dapr for state management and pub/sub.  
Dapr's default `dapr init` command already sets up a Redis container for you.

Initialize Dapr components (if not already):

```sh
dapr init
```

---

## 2. Run the Go Microservice

```sh
cd microservice
go mod tidy
dapr run --app-id lunchrush-backend --app-port 8080 -- go run ./cmd/main.go
```

- The backend will be available at [http://localhost:8080](http://localhost:8080)
- Make sure your Dapr components (for Redis state store and pubsub) are configured in `microservice/components/` (create this folder if needed).

---

## 3. Run the React Frontend

```sh
cd plugin
npm install
npm run dev
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## 4. Usage

- Open the frontend in your browser.
- Propose a new lunch session, join orders, and see live updates.

---

## Troubleshooting

- If you see connection errors, ensure both backend and Dapr are running.
- Dapr sidecar logs can help debug state/pubsub issues.

---

## Project Structure

- `microservice/` – Go+Dapr backend
- `plugin/` – React+Vite frontend

---

For more details, see the [README.md](README.md) files in each folder.