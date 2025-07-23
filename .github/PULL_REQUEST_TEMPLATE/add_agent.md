## Add New Agent to xpander.ai Directory

### Agent Information
- **Name**: 
- **Author**: 
- **Author Link**: 
- **Short Description** (max 100 chars): 
- **Slack Install URL**: 

### Agent Details
**Full Description**:
```
(Provide a detailed description of what your agent does)
```

**Skills** (check all that apply):
- [ ] Mintlify
- [ ] WebSearch
- [ ] Code Interpreter
- [ ] File Reader
- [ ] API Integration
- [ ] Database Query
- [ ] Image Processing
- [ ] PDF Generation
- [ ] Email Sender
- [ ] Webhook Handler
- [ ] Other: ___________

**Key Capabilities** (list 3-5):
1. 
2. 
3. 
4. 
5. 

### Integration Details
- **A2A URL** (optional): 
- **A2A Skills** (if applicable): 
- **Uses xpander.ai backend**: Yes / No

### Logo
- [ ] Logo file added to `/public/logos/` directory
- Logo filename: 

### Checklist
- [ ] Agent is fully functional and tested
- [ ] Slack OAuth URL is valid and working
- [ ] Logo is 200x200px PNG or SVG
- [ ] Description is clear and accurate
- [ ] No duplicate agent already exists
- [ ] Follows community guidelines

### JSON Entry
Please add the following entry to `/public/api/agents.json`:

```json
{
  "id": "your-agent-id",
  "name": "Your Agent Name",
  "slug": "your-agent-slug",
  "shortDescription": "Your short description here",
  "fullDescription": "Your full description here",
  "author": "Your Name/Company",
  "authorLink": "https://your-website.com",
  "logo": "/logos/your-logo.png",
  "skills": ["Skill1", "Skill2"],
  "capabilities": [
    "Capability 1",
    "Capability 2",
    "Capability 3"
  ],
  "slackInstallUrl": "https://slack.com/oauth/v2/authorize?client_id=...",
  "installCount": "0 installs",
  "createdAt": "2025-01-23T00:00:00Z"
}
```

---
**Note**: Submissions are reviewed within 3-5 business days. Ensure all information is accurate and complete to avoid delays.