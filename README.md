<div align="center">

# BadgeForge

**Modern badge generator powered by shields.io with AI-assisted design**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Gemini](https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

</div>

## Features

| Feature | Description |
|---------|-------------|
| **Live Customization** | Modify labels, messages, and colors with instant visual feedback |
| **Icon Library** | Search and browse 3000+ icons from Simple Icons |
| **Style Selection** | Choose from multiple badge styles including flat, plastic, and more |
| **Color Picker** | Intuitive color selection with hex input support |
| **Easy Export** | Copy generated badge URLs or Markdown snippets instantly |
| **AI Generation** | Describe your badge concept and generate multiple variations |
| **Design Persistence** | Save and manage your favorite badge configurations |

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/MCDxAI/badge-forge.git
cd badge-forge

# Install dependencies
npm install

# Set up environment (optional - for AI features)
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Visit `http://localhost:9002` to access the application.

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Set your Gemini API key (optional)
export GEMINI_API_KEY="your_api_key_here"
docker-compose up -d
```

The application will be available at `http://localhost:3102`.

#### Docker Configuration

Modify `docker-compose.yml` to customize the deployment:

```yaml
ports:
  - "3102:3000"  # Change left port for different host binding
environment:
  - GEMINI_API_KEY=${GEMINI_API_KEY}
volumes:
  - ./data:/app/data  # Persists saved badge configurations
```

## AI Integration (Optional)

BadgeForge includes optional AI-powered badge generation using Google Gemini.

### Setup

1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Configure your environment:

```bash
# Option 1: Environment file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Option 2: Docker environment variable
export GEMINI_API_KEY="your_api_key_here"
```

### Usage

Navigate to the AI generation tab, describe your desired badge in natural language, and receive multiple design variations tailored to your specifications.

## Technology Stack

- **Framework**: Next.js 15.3.3
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **Components**: Radix UI
- **AI**: Google Gemini (Genkit 1.13.0)
- **Icons**: Simple Icons 13.1.0
- **Deployment**: Docker

## Development

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Built with [shields.io](https://shields.io/) for badge generation and [Simple Icons](https://simpleicons.org/) for icon assets.
