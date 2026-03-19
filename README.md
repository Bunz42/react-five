<div align="center">

# REACT-FIVE
### A Progressive Web Development Journey

<p>
I was bored so I decided to build 5 apps to practice my web dev skills 😈.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Stack-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Focus-Frontend_Mastery-red?style=for-the-badge" />
</p>

</div>

---

## The Objective

These five projects start easy and scale up in difficulty. For each project, I practice "thinking in React" by drafting a high-level sketch with labelled components before writing a single line of code.

**The Workflow:**
1.  **Concept:** High-level idea.
2.  **Sketch:** Component hierarchy and state flow.
3.  **Brain Dump:** A raw `.txt` file containing my thoughts.
4.  **Code:** Execution.

<div align="center">
  <br />
  <img src="./funny-imgs/cat-thumbs-up.gif" width="200" alt="Thumbs up">
  <p><em>Let's go.</em></p>
  <br />
</div>

---

## Project Status

| ID | Project Name | Core Complexity | Tech Stack | Status |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Todo List App** | State Management | **COMPLETE** |
| **02** | **Crypto Dashboard** | API | **COMPLETE** |
| **03** | **Github Random Repo** | API Integration | **IN PROGRESS** |
| **04** | **Weather Web App** | API | *Pending* |
| **05** | **Scalable E-Commerce Platform** | API | Next.js | *Pending* |

---

## Dev Log & Architecture Notes

### Phase 1: The Foundation (Projects 1-2)
Started with Vanilla React to solidify hooks and state management fundamentals.

> **Retrospective:** The Crypto Dashboard was significantly more complex than anticipated. Handling live market data required robust `useEffect` cleanup and error handling.

<div align="center">
  <img src="./funny-imgs/tired-dog.jpg" width="300" alt="Post-coding exhaustion">
  <p><em>Current mood after finishing the Dashboard</em></p>
</div>

### Phase 2: The Migration (Projects 3-5)
**Major Shift:** Moving from Vanilla React to **Next.js**.

I realized that for the E-Commerce store and future enterprise apps, I need better routing, server-side rendering, and structure. I am also considering deploying the final two projects to Vercel to simulate a production environment.

---

## Repository Structure

Each project folder contains a specific `implementation-notes.txt` file detailing the thought process behind the code.

```bash
/
├── 01-todo-list/
├── 02-crypto-dash/       # Live API integration
├── 03-ecommerce-store/   # <--- CURRENT FOCUS
├── 04-squad-chat/
├── 05-analytics-engine/
└── funny-imgs/
