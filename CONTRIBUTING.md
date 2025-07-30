# Contributing to xpander.ai Agents Directory

Thank you for your interest in adding your Slack agent to the xpander.ai directory!

## How to Submit Your Agent

### Option 1: Use the Submission Form (Recommended)
Visit [xpander.ai/agents/submit](https://xpander.ai/agents/submit) to submit your agent through our Fillout form.

### Option 2: Submit via GitHub Pull Request
For developers comfortable with Git:

1. **Fork this repository**

2. **Add your logo**
   - Add your agent's logo to `/public/logos/`
   - Logo should be 200x200px PNG or SVG
   - Name it consistently with your agent ID (e.g., `your-agent.png`)

3. **Update agents.json**
   - Edit `/public/api/agents.json`
   - Add your agent entry following the existing format
   - Ensure proper JSON formatting (validate with a JSON linter)

4. **Create a Pull Request**
   - Use the "Add Agent" PR template
   - Fill out all required information
   - Ensure all checklist items are completed

## Agent JSON Schema

```json
{
  "id": "unique-agent-id",
  "name": "Agent Display Name",
  "slug": "url-friendly-slug",
  "shortDescription": "Brief description (max 100 characters)",
  "fullDescription": "Detailed description of your agent's capabilities",
  "author": "Your Name or Company",
  "authorLink": "https://your-website.com",
  "logo": "/logos/your-logo.png",
  "skills": ["Mintlify", "Tavily", "etc"],
  "capabilities": [
    "Key capability 1",
    "Key capability 2",
    "Key capability 3"
  ],
  "slackInstallUrl": "https://slack.com/oauth/v2/authorize?client_id=YOUR_CLIENT_ID",
  "installCount": "0 installs",
  "createdAt": "2025-01-23T00:00:00Z",
  "a2aUrl": "https://your-domain.com/agent", // Optional
  "a2aSkills": ["skill1", "skill2"] // Optional
}
```

## Guidelines

1. **Quality Standards**
   - Agent must be fully functional
   - Clear, accurate descriptions
   - Professional logo/branding
   - Valid Slack OAuth URL

2. **Content Guidelines**
   - No misleading claims
   - Appropriate for professional use
   - Respects user privacy
   - Follows Slack's terms of service

3. **Technical Requirements**
   - Valid JSON syntax
   - Unique agent ID
   - All required fields populated
   - Logo in correct directory

## Review Process

- PRs are reviewed within 3-5 business days
- We may request changes or clarifications
- Once approved, your agent will be live on xpander.ai

## Questions?

Contact us at support@xpander.ai or open an issue in this repository.

---

By contributing, you agree that your submission complies with our guidelines and that you have the right to distribute the agent information provided.