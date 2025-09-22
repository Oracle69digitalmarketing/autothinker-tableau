Here’s a minimal but clear README.md ready for your project. You can push it along with all code and the .env.example so your GitHub repo is complete:

# Autothinker Tableau

Autothinker Tableau is an AI-powered business blueprint generator that integrates **OpenAI** or **Vertex AI** with Salesforce and Tableau Next to provide actionable insights, recommendations, and growth strategies for businesses.

---

## Features

- Generate business blueprints from user ideas.
- Supports **OpenAI** and **Vertex AI (Gemini)** models.
- Pulls unified data and insights from Salesforce.
- Displays interactive analytics via Tableau Next.
- API-first and modular architecture for easy extension.

---

## Folder Structure

/autothinker-tableau │ ├─ /routes       # Express API routes ├─ /utils        # AI clients (OpenAI, Vertex AI) ├─ /public       # Static frontend (WDC) ├─ server.js     # Express server entry ├─ .env.example  # Environment variable template └─ README.md

---

## Setup

1. Copy `.env.example` to `.env` and fill in credentials.
2. Install dependencies:

```bash
npm install

3. Run locally:



npm start

4. Access frontend at http://localhost:8000.




---

Environment Variables

USE_VERTEX=false
OPENAI_API_KEY=your-openai-api-key
GCP_PROJECT_ID=your-gcp-project-id
GCP_LOCATION=us-central1
VERTEX_AI_ENDPOINT_ID=your-endpoint-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/gcp-key.json


---

API Endpoints

POST /api/ai/generate – Generate business blueprint from idea.

GET /api/ai/test – Test Vertex AI integration.



---

Deployment

Deploy on Render, Heroku, or any Node.js hosting provider.

Use Render dashboard to set environment variables from .env.



---

Contributing

Fork repo and submit pull requests.

Keep secrets out of commits.



---

License

MIT

