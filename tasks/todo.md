# ✅ TODO Plan – Cypress Test for Chitti Workshop Registration Flow

## 🧪 Goal:
Automate the end-to-end registration workflow for a Chitti online workshop.

---

## 🗂️ Test File
Path: `cypress/e2e/Chitti Workshop/Online workshop/register.cy.js`

---

## ✅ Workflow Steps to Cover
- [ ] Visit the target Chitti workshop page
- [ ] Verify that the course/workshop is available
- [ ] Click on "Register" or "Book Now" button
- [ ] Fill out the registration form (name, email, phone, etc.)
- [ ] Submit the form by clicking "Register"
- [ ] Verify that the payment page or confirmation is shown

---

## 🧪 Test Implementation Tasks
- [ ] Create or update test file in the path above
- [ ] Use `cy.get()` or `cy.contains()` to locate course availability
- [ ] Use proper selectors (`data-testid`, `id`, `class`) for form elements
- [ ] Use `cy.intercept()` if needed to mock or verify backend API
- [ ] Add assertions to ensure:
  - Form loads
  - Inputs accept values
  - Navigation to payment/confirmation page is successful

---

## 🔁 Reusability & Cleanup
- [ ] Refactor form-filling steps into a Cypress command (optional)
- [ ] Add retry or wait conditions if required

---

## 🧠 Optional Enhancements
- [ ] Capture screenshot on success
- [ ] Log steps using `cy.log()` for better debugging
- [ ] Run test across viewports (desktop/mobile)

---

## 📌 Notes
- Ensure you test the correct workshop URL
- Use real input patterns where validation is enforced
- Prefer stable selectors to avoid test flakiness

---

## ✍️ Status Tracker
- [ ] Test written
- [ ] Test passes locally
- [ ] Test runs in CI/CD (if GitHub Actions integrated)
