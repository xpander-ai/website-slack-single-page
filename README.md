# xpander.ai - Bring Your AI Agents to Slack

The website for slack.xpander.ai, part of xpander.ai

## 🚀 Overview

This repository contains the source code for the slack.xpander.ai website, including:
- Landing page with product information
- Slack agents directory
- Agent submission system
- Documentation and resources

## 🤖 Make Your AI Agent Slack-Native

xpander.ai helps you transform any AI agent into a Slack-native application in under an hour. Here's how:

### Why Use xpander.ai?

- **Smart Engage**: Save 80%+ on LLM costs by pre-screening messages before invoking your agent
- **Built-in OAuth**: Handle user authentication for GitHub, Jira, Google Drive, and dozens more - no security code needed
- **Framework Agnostic**: Works with LangChain, CrewAI, AutoGen, or any custom Python code
- **Zero Infrastructure**: No servers, webhooks, or thread management to worry about

### Quick Start (3 Steps)

#### 1. Create Your Agent
Choose from two options:
- **Serverless Agents**: Use pre-configured Agno + OpenAI/Bedrock templates
- **Custom Code**: Deploy your existing LangChain, CrewAI, or custom agent

#### 2. Install to Slack
- Complete the OAuth flow
- Select channels for your agent
- Configure auto-engage rules (optional)

#### 3. Go Live
Your agent is instantly deployed and ready to use in Slack!

### Key Features

- **User-Authenticated Actions**: Let users connect their GitHub/Jira/Google accounts for personalized actions
- **Thread Management**: Automatic conversation context with full thread history
- **Multimodal Support**: Voice notes transcribed, images analyzed, documents parsed automatically
- **Cost Optimization**: Smart message routing only invokes your agent when needed
- **Enterprise Ready**: SOC 2 compliant with optional self-hosted deployment

### Learn More

- **Documentation**: [docs.xpander.ai](https://docs.xpander.ai)
- **Create Your Agent**: [xpander.ai/create](https://xpander.ai/create)
- **Examples**: Browse our [agent directory](https://slack.xpander.ai/agents)

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Fillout integration
- **Hosting**: AWS Amplify

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/xpander-ai/website-slack-single-page.git
cd website-slack-single-page

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
├── public/
│   ├── api/
│   │   └── agents.json      # Agents directory data
│   ├── logos/              # Agent and partner logos
│   └── ...
├── src/
│   ├── components/
│   │   ├── landing/        # Landing page sections
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── main.jsx          # App entry point
└── ...
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Submitting agents to the directory
- Reporting issues
- Proposing enhancements

### Adding Your Agent

You can add your agent to our directory in two ways:

1. **Via Website**: Visit [xpander.ai/agents/submit](https://xpander.ai/agents/submit)
2. **Via GitHub**: Submit a PR following the template in `.github/PULL_REQUEST_TEMPLATE/add_agent.md`

## 📄 License

Copyright © 2025 xpander.ai. All rights reserved.

## 🔗 Links

- **Website**: [xpander.ai](https://xpander.ai)
- **Documentation**: [docs.xpander.ai](https://docs.xpander.ai)
- **Support**: support@xpander.ai