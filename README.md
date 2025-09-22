# 🚀 AutoThinker Tableau WDC

AI-powered Business Idea → Insights → Dashboards connector that brings AutoThinker intelligence directly into Tableau + Salesforce Data Cloud for smarter decisions.

Built for hackathons, this project merges AI idea generation, CRM context, and Tableau visual insights into one seamless workflow.


---

## 🌟 Why This Matters

Business leaders and innovators struggle to connect early-stage ideas with real, data-driven insights. AutoThinker solves this by:

🔮 Generating AI insights instantly from a raw idea.

📇 Enriching with CRM data (Salesforce Data Cloud).

📊 Feeding Tableau dashboards with structured insights.

🚀 Future-proof connectors for Data Cloud + embedded dashboards.


Result: Faster, smarter decisions with AI + Tableau side-by-side.


---

## 🛠 Tech Stack

Frontend: HTML5, JavaScript, Tableau WDC 2.3

Backend: Node.js, Express.js

AI Layer: AutoThinker API (mocked/local for hackathon)

CRM Layer: Salesforce Data Cloud (placeholder endpoints)

Analytics Layer: Tableau (WDC integration, embed simulation)



---

## ⚙️ Features

✨ AI Insights Generator → enter an idea, get structured insights.

🧪 Simulator Mode → run all APIs (AI + CRM + Tableau stub) without Tableau.

📊 Tableau Connector Mode → feeds AutoThinker insights directly into Tableau Desktop/Server.

📇 Salesforce Data Cloud Stub → sample CRM records to enrich context.

📌 Dashboard & Embed APIs → stubs for creating + embedding Tableau dashboards.

🔑 Credential-aware → works with placeholders now, upgrades seamlessly once Tableau PAT creds are provided.



---

## 🚀 Quickstart

1. Clone & Install

git clone https://github.com/<your-org>/autothinker-tableau-wdc.git
cd autothinker-tableau-wdc
npm install

2. Run Backend

npm run dev
# Express server runs at http://localhost:5000

3. Launch Frontend

Open index.html in browser OR serve it from the same server.


---

### 🎬 How to Use

1. Enter an Idea → e.g. “AI-powered Agri Marketplace”.


2. Choose Mode:

🧪 Simulator → preview insights + CRM + Tableau embed (demo safe).

📊 Get Data (Tableau) → register as Tableau WDC connector, feed insights into Tableau.



3. View Outputs:

AI insights JSON

Salesforce CRM enrichment

Tableau embed iframe (mock or live if creds configured)





---

### 🔐 Credentials

Add real Tableau credentials to .env to upgrade from placeholders:

TABLEAU_SERVER_URL=https://your-tableau-server.com
TABLEAU_PERSONAL_ACCESS_TOKEN_NAME=yourPATname
TABLEAU_PERSONAL_ACCESS_TOKEN_VALUE=yourPATsecret
TABLEAU_SITE_ID=yourSiteId

Without these, the project runs in mock/demo mode (safe for hackathon).


---

### 📁 Project Structure

/frontend
  index.html   # AutoThinker WDC UI
/backend
  server.js    # Express entry
  routes/
    tableau.js # Tableau API routes
  utils/
    tableauClient.js # Tableau client (sign-in, fetch views, etc.)


---

### 🌍 Demo Flow (Hackathon)

1. Enter idea → AI insights appear instantly.


2. Simulator → shows full flow with sample CRM + Tableau embed.


3. Tableau button → demonstrates connector into Tableau Desktop/Server.


4. Judges see end-to-end value chain (Idea → Insights → Dashboard).




---

## 📹 Submission Checklist

✅ Hosted Project URL: [Add Vercel/Render link here]

✅ Repo Link: [GitHub repo link]

✅ Demo Video: [YouTube/Drive link]

✅ Description: This README



---

### 🔮 Future Expansion

Real Salesforce Data Cloud sync

Real Tableau dashboard creation/embedding

AI idea clustering + scoring models

Multi-user collaboration + sharing



---

## 👥 Team

Prince Adewumi Adewale – Product & Engineering

Adewumi Oluwaseun – Strategy & Nonprofit Lead


---

## 🎥 Demo Script (for judges)
1. Enter a sample idea: *“AI-powered Agri Marketplace”*
2. Click **Simulator** → shows AI + Salesforce + Tableau outputs
3. Click **Get Data (Tableau)** → connector registers in Tableau
4. End screen: Tableau dashboard preview

---

## 📄 License
This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

🔥 With AutoThinker WDC, your idea doesn’t just stay an idea — it becomes an insight-driven, dashboard-ready business case in minutes.
