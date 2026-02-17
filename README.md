# GitCheck 🛡️

**Verify the Code. Validate the Dev.**

GitCheck is a high-performance auditing tool built with **Next.js 15** that solves the "Developer Credibility Gap." It helps recruiters and developers quickly assess a GitHub profile's true impact by filtering out noise and analyzing core security hygiene.

---

## 🚀 Overview

In a world where standard GitHub profiles are often cluttered with forks and tutorial clones, **GitCheck** provides instant signal. It audits repository documentation, legal compliance, and security markers to deliver a definitive "Health Score" for any developer.

### Key Features

* **Noise Cancellation:** Automatically filters out forked repositories to surface only original work.
* **Health & Security Score:** A data-driven metric (0-100) based on documentation quality, professional licensing, and vulnerability reporting readiness.
* **Tech Stack Aggregator:** Analyzes primary language usage across all public repositories to build an accurate developer persona.
* **Security Snapshot:** Evaluates branch integrity and compliance markers essential for professional-grade software development.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16]() (App Router)
* **Logic:** Asynchronous TypeScript with [GitHub REST API]()
* **Styling:** [Tailwind CSS]() 
* **Security:** Server-side API handling to prevent token exposure in the browser.

---

## 🔧 Getting Started

### Prerequisites

* Node.js 18.x or later
* A GitHub Personal Access Token (Classic) with `public_repo` scope

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ath4rv04/GitCheck.git
cd GitCheck

```


2. **Install dependencies:**
```bash
npm install

```


3. **Setup Environment Variables:**
Create a `.env.local` file in the root directory and add your token:
```text
GITHUB_TOKEN=your_personal_access_token_here

```


4. **Run the development server:**
```bash
npm run dev

```


Open [http://localhost:3000]() with your browser to see the results.

---

## 🛡️ Security Audit Logic

As a project with a focus on **Cyber Security & Forensics**, GitCheck evaluates:

* **Documentation:** Presence of high-quality READMEs.
* **Legal Compliance:** Validation of open-source licenses.
* **Vulnerability Readiness:** Status of issue tracking as a public reporting channel.
* **Repository Hygiene:** Detection of legacy or archived risks.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.
