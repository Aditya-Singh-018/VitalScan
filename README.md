<div align="center">

# 🩺 VitalScan — AI Medical Report Analyzer

**Turn complex medical jargon into clear, compassionate, actionable insights — powered by LlamaParse & Groq AI.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Groq](https://img.shields.io/badge/Groq-AI-FF4500?style=flat-square&logo=lightning&logoColor=white)](https://groq.com/)
[![LlamaParse](https://img.shields.io/badge/LlamaParse-Cloud-8B5CF6?style=flat-square&logo=cloud&logoColor=white)](https://cloud.llamaindex.ai/)



</div>

---

## 🌟 What is VitalScan?

Most people receive medical reports filled with numbers, acronyms, and clinical terminology they can't understand. **VitalScan** solves this.

Simply upload your medical report (PDF or Image) and VitalScan will:
- 🔍 **Extract** all the data from your document using AI-powered OCR
- 🧠 **Analyze** the results against clinical reference ranges
- 💬 **Explain** everything in simple, patient-friendly language
- 📋 **Provide** personalized diet, exercise, and lifestyle recommendations

> *"Healthcare clarity should be a right, not a privilege."*

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Multi-format Upload** | Supports PDF, JPG, PNG medical reports |
| 🤖 **AI-Powered OCR** | LlamaParse extracts text from complex lab report layouts |
| ⚡ **Ultra-fast Analysis** | Groq's LPU hardware delivers analysis in seconds |
| 💡 **Plain Language** | Medical jargon translated into clear, compassionate language |
| 📊 **Parameter Breakdown** | Every test result explained with reference ranges |
| 🎯 **Actionable Advice** | Personalized diet, exercise & lifestyle recommendations |
| 📱 **Responsive UI** | Beautiful green-themed UI that works on all screen sizes |

---

## 🏗️ Architecture

VitalScan uses a clean **full-stack split architecture** — a React frontend communicates with a standalone Express.js backend that securely handles all AI processing.

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React + Vite Frontend (:5173)             │   │
│  │   Upload Card  →  Analysis Steps  →  Results Card   │   │
│  └────────────────────────┬────────────────────────────┘   │
└───────────────────────────│─────────────────────────────────┘
                            │  POST /api/upload (FormData)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Express.js Backend Server (:5000)              │
│                                                             │
│  1. multer receives the uploaded file                       │
│       │                                                     │
│       ▼                                                     │
│  2. LlamaParse REST API                                     │
│     → Uploads file, polls until SUCCESS                     │
│     → Returns clean Markdown text                           │
│       │                                                     │
│       ▼                                                     │
│  3. Groq API (openai/gpt-oss-120b)                         │
│     → Analyzes medical data                                 │
│     → Returns patient-friendly explanation                  │
│       │                                                     │
│       ▼                                                     │
│  4. JSON response sent back to frontend                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI component framework |
| **Vite 8** | Lightning-fast dev server & bundler |
| **shadcn/ui** | Accessible, reusable UI components |
| **Lucide React** | Icon library |
| **Node.js v24** | JavaScript runtime |
| **Express.js** | HTTP server & API routing |
| **Multer** | Multipart file upload handling |
| **LlamaParse** | AI-powered document parsing & OCR |
| **Groq SDK** | Ultra-fast LLM inference |
| **GPT-OSS 120B** | Large language model for medical analysis |

---

## 🚀 Quick Start

### Prerequisites
- Node.js **v18 or higher**
- A [Groq API Key](https://console.groq.com/keys) (free)
- A [LlamaCloud API Key](https://cloud.llamaindex.ai/) (free)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/VitalScan.git
cd VitalScan
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
LLAMA_CLOUD_API_KEY=llx-your_llama_cloud_api_key_here
PORT=5000
```

Start the backend server:
```bash
node server.js
# ✅ Backend server listening at http://localhost:5000
```

### 3. Set up the Frontend
Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
# ✅ Local: http://localhost:5173
```

### 4. Open and use the app
Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser, upload a medical report, and let VitalScan do the rest!

---

## 📁 Project Structure

```
VitalScan/
├── backend/
│   ├── server.js             # Express server & /api/upload route
│   ├── groq-service.js       # Groq AI prompt & API calls
│   ├── llama-parser.js       # LlamaParse OCR integration
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/       # MedicalReportAnalyzer, UploadCard, ResultsCard, AnalysisSteps
│   │   │   └── ui/           # shadcn/ui base components
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
│
└── README.md
```

---

## 🔄 How It Works — Step by Step

```
Step 1: Upload
  User drags & drops a medical report (PDF/Image)
  ↓
Step 2: Parse (LlamaParse)
  File is sent to the backend → securely uploaded to LlamaParse cloud
  LlamaParse uses AI-powered OCR to extract tables, values & text as Markdown
  ↓
Step 3: Analyze (Groq + GPT-OSS 120B)
  Extracted text is sent to Groq with a carefully crafted medical prompt
  The 120B model analyzes findings, checks reference ranges, identifies concerns
  ↓
Step 4: Display
  A structured, compassionate report is returned and beautifully displayed
  Including: Overview → Findings → Health Status → Recommendations
```

---

## ⚠️ Disclaimer

VitalScan is an **educational and informational tool only**. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with questions you may have regarding a medical condition.

---
