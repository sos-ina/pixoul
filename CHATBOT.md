# Pixoul Navigation Chatbot

This project includes a lightweight, rule-based navigation chatbot.

## Current scope

The chatbot is currently implemented as a frontend navigation helper:

- Routes users to existing pages (no booking/payment actions)
- Uses keyword matching (no AI/LLM)
- No required database integration for the current behavior

## File structure

- `components/chatbot/Chatbot.jsx`
  - The chatbot UI (floating button + panel)
  - Message list rendering
  - Keyword-based intent resolution
  - Navigation via Next.js App Router

- `lib/chatbotIntents.js`
  - Intent configuration (keywords -> route -> response)

- `app/layout.jsx`
  - Global mounting point (renders `<Chatbot />` once so it appears on all pages)

## How it is connected

1. The chatbot component is imported in the root layout:

   - `app/layout.jsx`

2. The chatbot is rendered inside the global layout so it appears site-wide.

3. The chatbot reads intent definitions from:

   - `lib/chatbotIntents.js`

4. When the user sends a message, the chatbot:

   - Converts the message to lowercase
   - Finds the first intent whose `keywords` are included in the message
   - Adds a bot confirmation response
   - Redirects using `router.push(intent.route)`

## UI behavior (required workflow)

1. User clicks the chatbot button
2. Chat window opens
3. Bot sends greeting:

   `Hi! I can help you navigate Pixoul. What are you looking for?`

4. User types a message and clicks Send (or presses Enter)
5. System resolves intent

   - If intent matches:
     - Bot sends confirmation message
     - User is redirected to the route

   - If no intent matches:
     - Bot sends fallback message
     - No redirect occurs

## Intent configuration

Intents are defined in `lib/chatbotIntents.js`.

Each intent has:

- `keywords`: array of strings
- `route`: the page to navigate to (must exist in `app/`)
- `response`: bot confirmation message shown before redirect

Example shape:

```js
{
  keywords: ["vr", "virtual reality"],
  route: "/experience/vr",
  response: "Sure! Taking you to our VR games 🎮",
}
```

### Priority / ordering

The chatbot selects the **first** matching intent.

- Put **more specific** intents earlier.
- Put **more general** intents later.

## Fallback behavior

If no intent matches, the chatbot responds:

`I can help you navigate the site. Try asking about VR games, events, or the community.`

No redirect happens.

## Performance notes (dev vs production)

If you see logs like:

`GET /experience/pc 200 in 14.6s (compile: 14.4s, ...)`

That is **development-mode compilation time**, not chatbot delay.

- In `npm run dev`, the first visit to a route may be slow because Next.js compiles it.
- Subsequent visits are typically much faster.
- For real performance testing, use a production build:

```bash
npm run build
npm run start
```

On Windows systems where PowerShell blocks `npm.ps1`, run via `cmd`:

```bat
cmd /c npm run build
cmd /c npm run start
```

## Testing checklist

Try these messages in the chatbot:

- `I want to play VR games` -> `/experience/vr`
- `Show me PC games` -> `/experience/pc`
- `Take me to retro games` -> `/experience/retro`
- `Console games` -> `/experience/console`
- `Arcade games` -> `/experience/arcade`
- `Sport games` -> `/experience/sport`
- `Show me all games` -> `/experience/all`
- `Show me events` -> `/events`
- `Go to community` -> `/community`
- `Take me home` -> `/`
- `I want to book` -> fallback message (no booking logic)
