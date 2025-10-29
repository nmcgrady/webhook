# Alert Webhook Server

A simple webhook server that receives and logs alert payloads from your monitoring tools.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The webhook will be available at `http://localhost:3000/webhook`

## Endpoints

- `POST /webhook` - Main webhook endpoint that logs incoming payloads
- `GET /health` - Health check endpoint
- `GET /` - Server info and available endpoints

## Usage

Configure your alert tool to send POST requests to:
```
http://your-server:3000/webhook
```

The server will:
- Log all incoming requests with timestamps
- Include request headers and payload data
- Return a 200 OK response with success confirmation

## Example Payload

The webhook accepts JSON payloads. Example logged output:

```
[2025-10-29T12:00:00.000Z] /webhook received:
Headers: {
  "content-type": "application/json",
  "user-agent": "AlertTool/1.0"
}
Payload: {
  "alert": "High CPU usage",
  "severity": "warning",
  "timestamp": "2025-10-29T12:00:00Z"
}
---
```

## Configuration

Set the `PORT` environment variable to change the default port (3000):
```bash
PORT=8000 npm start
```

## Testing

Test the webhook with curl:
```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"alert": "Test alert", "message": "This is a test"}'
```
