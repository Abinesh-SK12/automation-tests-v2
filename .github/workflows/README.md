# 🎯 GitHub Actions Workflows

This directory contains automated workflows for the Cypress E2E testing suite.

## 📋 Workflows

### 🚀 Cypress E2E Tests (`cypress-test.yml`)

[![Cypress Tests](https://github.com/LMES-Developers/Automation-Tests/actions/workflows/cypress-test.yml/badge.svg)](https://github.com/LMES-Developers/Automation-Tests/actions/workflows/cypress-test.yml)

The main testing workflow with enhanced features:

#### ✨ Features

- **🎨 Colorful Output**: Enhanced terminal colors and emojis for better readability
- **🌐 Multi-Browser Testing**: Supports Chrome, Firefox, Edge, and Electron
- **⏱️ Scheduled Runs**: Automated testing at 8:30 AM and 4:00 PM IST daily
- **📊 Visual Reports**: Beautiful test summaries with statistics
- **💬 Slack Notifications**: Real-time test results in your Slack channel
- **🎯 Manual Triggers**: Run tests on-demand with custom parameters
- **📸 Artifact Management**: Automatic screenshot and video capture
- **🧹 Auto-Cleanup**: Removes old artifacts after 30 days

#### 🔧 Configuration

```yaml
# Manual trigger with options
workflow_dispatch:
  inputs:
    test_environment:
      - production
      - staging
      - development
    browser:
      - chrome
      - firefox
      - edge
      - electron
```

#### 📈 Test Matrix

| Browser | OS | Node Version |
|---------|-----|--------------|
| Chrome | Ubuntu 22.04 | 20.x |
| Firefox | Ubuntu 22.04 | 20.x |
| Edge | Ubuntu 22.04 | 20.x |

### 📊 Cypress Visual Report (`cypress-visual-report.yml`)

Generates beautiful HTML reports after test completion:

- **📄 HTML Reports**: Interactive test summaries
- **💬 PR Comments**: Automatic test results on pull requests
- **📊 Statistics**: Visual representation of test metrics

## 🔑 Required Secrets

Configure these in your repository settings:

| Secret | Description |
|--------|-------------|
| `CYPRESS_RECORD_KEY` | Cypress Dashboard record key |
| `CYPRESS_PROJECT_ID` | Cypress project identifier |
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications |
| `CYPRESS_DASHBOARD_URL` | Custom dashboard URL (optional) |

## 🚀 Usage

### Run Tests Manually

1. Go to Actions tab
2. Select "🚀 Cypress E2E Tests"
3. Click "Run workflow"
4. Choose your options:
   - Environment (production/staging/development)
   - Browser (chrome/firefox/edge/electron)
5. Click "Run workflow"

### View Results

- **📊 Summary**: Check the workflow summary for quick results
- **📹 Videos**: Download test execution videos
- **📸 Screenshots**: View failure screenshots
- **📄 Reports**: Access detailed HTML reports

## 🎨 Workflow Features

### Color-Coded Output

```bash
✅ Success - Green (#00ff00)
❌ Failure - Red (#ff0000)
⚠️ Warning - Orange (#ffaa00)
```

### Enhanced Notifications

Slack notifications include:
- Test status with emojis
- Direct links to results
- Execution time in IST
- Interactive buttons

### Job Summary

GitHub's job summary includes:
- Overall test statistics
- Quick links to important resources
- Next steps based on results
- Formatted markdown output

## 🛠️ Maintenance

### Update Dependencies

```bash
# Update workflow actions
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
- uses: cypress-io/github-action@v6
```

### Customize Notifications

Edit the Slack webhook payload in `cypress-test.yml`:

```javascript
{
  "text": "Custom message",
  "blocks": [...],
  "attachments": [...]
}
```

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)

---

> 🤖 Maintained by the Automation Team