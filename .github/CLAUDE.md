# CLAUDE.md

## 🤖 Claude Instructions for This Cypress Automation Project

Welcome, Claude! Here’s how to collaborate on this Cypress-based automation testing project using AI.

---

### 🛠️ Project Overview
This project uses Cypress to automate end-to-end testing of web applications.  
AI tools like Claude or ChatGPT assist in generating smart test cases, refactoring, and coverage analysis.

---

### ✅ What You Can Help With
- Generate Cypress test cases from plain English prompts.
- Refactor and clean existing test files.
- Add assertions and validations for better coverage.
- Suggest improvements in selectors, locators, or waiting strategies.
- Summarize large test files or test plans.

---

### 🗂️ Key Folder Structure
- **cypress/** - Test files and support files
- **cypress/e2e/** - Actual test specs
- **cypress/support/** - Custom commands and setup
- **cypress.config.js** - Cypress configuration
- **.github/CLAUDE.md** - You’re reading it!

---

### 💡 Best Practices
- Use `cy.get('[data-testid="..."]')` or accessible selectors.
- Avoid unnecessary `cy.wait()` — prefer `cy.intercept()` or DOM-based waits.
- Write reusable functions in `cypress/support/commands.js`.

---

### ✍️ Style Guide
- Tests should be clean, atomic, and independent.
- Follow existing naming conventions and indentation style.
- Use comments only when logic isn't immediately clear.

---

### ⚙️ Terminal Setup (`/terminal-setup`)

Claude can run terminal actions using this script:

```bash
bash .github/claude-terminal-setup.sh
