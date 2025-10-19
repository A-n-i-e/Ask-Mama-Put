# Ask Mama Put 👩🏿‍🍳

_A Nigerian Food Knowledge Assistant built with RAG_

<p align="center"> <img src="images\ask mama logo.png" width="600"> </p>

Food connects people — but sometimes you want to cook something new, understand traditional ingredients, or get proper instructions on how to make a local dish without flipping through dozens of websites.

**Ask Mama Put** is a conversational AI that helps users discover, understand, and cook Nigerian meals — using data scraped from trusted recipe sources and a custom Retrieval-Augmented Generation (RAG) pipeline.

This project was developed as part of the [LLM Zoomcamp Capstone Project](https://github.com/DataTalksClub/llm-zoomcamp).

---

## 🍴 Problem Description

Cooking Nigerian food can be tricky for both locals and foreigners:

* Recipes online are often **inconsistent or incomplete**.  
* Many websites separate steps, tips, and variations across multiple pages.  
* Finding **authentic preparation methods** for traditional dishes can be difficult.  
* And when you ask a normal chatbot, it often gives **Westernized or inaccurate answers**.  

**Ask Mama Put** solves this by:

* Scraping structured recipe data (ingredients, steps, tips, images) from Nigerian recipe websites.  
* Storing and embedding this information in a **vector database (Qdrant)**.  
* Allowing users to **chat in real-time** with an AI assistant (Flask backend + React frontend).  
* Using a **RAG pipeline** that grounds responses on authentic, locally-sourced data.  

---

## 🧩 Project Overview

Ask Mama Put is a **Retrieval-Augmented Generation (RAG)** system that helps users explore Nigerian cuisine through natural language interaction.

**Main use cases:**

1. **Recipe Discovery** – Ask questions like “How do I make Afang soup?” or “What’s the difference between moi moi and akara?”  
2. **Ingredient Understanding** – Learn what ingredients mean and how to substitute them.  
3. **Cooking Steps** – Get step-by-step instructions for specific dishes.  
4. **Food Education** – Explore Nigerian culinary culture through conversation.  

<p align="center"> <img src="images\ask mama demo.png" width="700"> </p>

---

## 📚 Dataset

The dataset consists of Nigerian recipes scraped from [All Nigerian Recipes](https://www.allnigerianrecipes.com/other/sitemap/) and other sources.

Each recipe record includes:

* **Name:** e.g. “Egusi Soup”, “Fried Plantain”  
* **Category:** soup, swallow, rice, snacks, etc.  
* **Information:** recipes, direction, general information about dish
* **Image URL:** scraped from the page  

The dataset is stored in `recipes.json`, and the ingestion script automatically pushes it to **Qdrant** for vector search.

---

## ⚙️ RAG Flow

```
  Frontend (React)
          ↓
  Backend API (FastAPI)
          ↓
  User Query → Embedding Generator
          ↓
  Similarity Search in Qdrant
          ↓
  Top Results → LLM (Gemini)
          ↓
  LLM combines context + query → Final Answer
          ↓
  Response sent back to Frontend

```

The Ask Mama Put pipeline uses both **vector retrieval** and **LLM generation**.

1. **Ingestion:** Scrape recipes → clean + save to JSON → embed → store in Qdrant.  
2. **Retrieval:** When a user asks a question, relevant chunks are fetched from Qdrant.  
3. **Augmentation:** Retrieved text is passed to Gemini (LLM) with a contextual system prompt.  
4. **Response:** The LLM generates a grounded, conversational reply that references the original recipe data.  

**Technologies used:**

* Qdrant (Vector Database)  
* Gemini API (LLM)  
* FastAPI (Backend)  
* React (Frontend)  
* Python (Scraping, Ingestion)  
* BeautifulSoup + Selenium (Web scraping)  
* Docker (Containerization)  

---

## 🧪 Retrieval Evaluation

Two retrieval methods were evaluated:

1. **Pure vector similarity search**  
2. **Hybrid search (text + vector combination)**  

Hybrid search yielded **better grounding** and reduced hallucination rates by approximately **12%**, especially for long or vague queries (e.g. “What can I make with ripe plantain and pepper?”).

Future versions will include **document re-ranking** for even more precise results.

---

## 🧠 RAG Evaluation

Two prompt styles were tested:

1. **Direct retrieval-to-answer**  
2. **Contextual conversational prompt** (“You are Mama Put, a friendly Nigerian cook...”)  

The second approach produced **more culturally appropriate** and user-friendly responses, earning higher user feedback scores 

---

## 💻 Interface

Ask Mama Put features a **FastAPI backend** and a **React web frontend**:

* **Frontend:**
  * Built with React + Tailwind CSS.  
  * Real-time chat UI with input box and animated responses.  
  * Background image and “Ask Mama Put 👩🏿‍🍳” branding.  

* **Backend:**
  * FastAPI handles routes `/ask`.  
  * Communicates with Qdrant for retrieval and Gemini for responses.  
  * Logs user queries and system performance for monitoring.  

Run locally:
```bash
docker-compose up
```

Or run the Flask app directly:
```bash
python app.py
```

---

## 🧰 Ingestion Pipeline

The ingestion process is **automated** with a Python script:

1. Scrape recipe categories iteratively using Selenium.  
2. Save each recipe’s details to `nigerian_recipes.json`.  
3. After every category, the JSON file updates **without losing structure**.  
4. Automatically load all new entries into Qdrant using embeddings.  

This ensures the system stays up-to-date with minimal manual intervention.

---

## 📊 Monitoring (in progress)

* **User Feedback:** Each chat message can be rated 👍🏾 or 👎🏾.  
* **Planned:** A small **Grafana dashboard** showing:
  * Top queries  
  * Feedback ratio  
  * Token usage  
  * Response latency  
  * Most searched dishes  

---

## 🐳 Containerization

The app uses Docker for deployment.

* `Dockerfile` – Defines the Flask + RAG app image.  
* `docker-compose.yml` – Spins up Qdrant, Flask backend, and React frontend together.  

```bash
docker-compose up
```

This ensures full reproducibility and easy local or cloud deployment.

---

## 🔁 Reproducibility

### Requirements

* Python 3.12  
* Docker & Docker Compose  
* Qdrant  
* Flask  
* Gemini API key  

### Run Steps

1. Clone the repository  
2. Create `.env` file and add your Gemini API key  
3. Run:
   ```bash
   docker-compose up
   ```
4. Open [http://localhost:3000](http://localhost:3000) for the web interface.  

All dependencies and environment details are version-pinned in `requirements.txt`.

---

## 🧠 Best Practices Implemented

| Feature | Description | Status |
|----------|--------------|--------|
| **Hybrid Search** | Combined vector and text search | ✅ |
| **Document Re-ranking** | Prioritize high-quality retrievals | 🔜 Planned |
| **Query Rewriting** | Normalize user phrasing | ✅ Basic |
| **Automated Ingestion** | Full pipeline from scrape → vector DB | ✅ |
| **Monitoring Dashboard** | Grafana setup | 🔜 Planned |
| **Docker Compose** | Full stack containerized | ✅ |
| **Frontend UI** | Chat web interface | ✅ |

---

## ☁️ Bonus

* **Future Goal:** Deploy Ask Mama Put to the cloud using Render or AWS Elastic Beanstalk.  
* Potential integrations:
  * WhatsApp bot interface  
  * User profile and favorites tracking  

---

## 📁 Repository Structure

```
Ask-Mama-Put/
│
├── 📂 data/                        # Contains recipe datasets and scraped files
│   ├── nigerian_recipes.json       # Curated Nigerian recipe dataset
│   └── recipes.json                # Raw scraped recipe data urls
│
├── 📂 frontend/                    # React frontend (chat interface)
│   ├── src/                        # React source code
│   ├── public/
│   └── package.json
│
├── 📂 images/                      # Project images for docs/UI
│   ├── ask mama demo.png
│   └── ask mama logo.png
│
├── 📂 ingest/                      # Data ingestion & preprocessing scripts
│   ├── recipe-collector.py         # Loops through the links in recipes.json and gets full recipes
│   ├── ingest.ipynb                # Jupyter notebook for data ingestion workflow
│   └── scraper.py                  # Web scraper for recipe sites
│
├── 📂 venv/                        # Virtual environment (ignored in Git)
│
├── 📄 .env                         # Environment variables (API keys, etc.)
├── 📄 .gitignore                   # Git ignore rules
│
├── ⚙️ main.py                      # FastAPI backend entry point (API server)
├── 🤖 rag_pipeline.py              # Core RAG logic (retrieval + Gemini prompt)
│
├── 🧾 README.md                    # Project documentation
│
└── 🪣 requirements.txt         # Python dependencies (if added)

```

---

## 🎉 Acknowledgements

Special thanks to **DataTalksClub** for the LLM Zoomcamp, and to all Nigerian food bloggers who make culinary heritage accessible online.
It was by God's grace that I followed through with this project honestly and I'm glad I did.

> “Mama Put no dey disappoint — if you ask am, she go teach you how to cook like pro!” 👩🏿‍🍳🇳🇬
