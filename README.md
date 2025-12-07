<div align="center">
  <h1>BadgeForge</h1>
  <p><strong>Modern badge generator powered by shields.io with AI-assisted design</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15.3.3-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker">
  </p>

  <p>
    <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?style=flat&logo=google&logoColor=white" alt="Gemini">
    <img src="https://img.shields.io/badge/Genkit-1.13.0-8E75B2?style=flat" alt="Genkit">
  </p>

  <p>Create beautiful shields.io badges with live customization, extensive icon library, and optional AI-powered design generation.</p>

  <h2>Features</h2>
  <table>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong>Live Customization</strong></td>
      <td>Modify labels, messages, and colors with instant visual feedback</td>
    </tr>
    <tr>
      <td><strong>Icon Library</strong></td>
      <td>Search and browse 3000+ icons from Simple Icons</td>
    </tr>
    <tr>
      <td><strong>Style Selection</strong></td>
      <td>Choose from multiple badge styles including flat, plastic, and more</td>
    </tr>
    <tr>
      <td><strong>Color Picker</strong></td>
      <td>Intuitive color selection with hex input support</td>
    </tr>
    <tr>
      <td><strong>Easy Export</strong></td>
      <td>Copy generated badge URLs or Markdown snippets instantly</td>
    </tr>
    <tr>
      <td><strong>AI Generation</strong></td>
      <td>Describe your badge concept and generate multiple variations</td>
    </tr>
    <tr>
      <td><strong>Design Persistence</strong></td>
      <td>Save and manage your favorite badge configurations</td>
    </tr>
  </table>

  <h2>Quick Start</h2>

  <h3>Local Development</h3>

  <table>
    <tr><td>1. Clone the repository</td></tr>
    <tr><td><code>git clone https://github.com/48hour-solutions/badge-forge.git</code></td></tr>
    <tr><td><code>cd badge-forge</code></td></tr>
    <tr><td>2. Install dependencies</td></tr>
    <tr><td><code>npm install</code></td></tr>
    <tr><td>3. Set up environment (optional - for AI features)</td></tr>
    <tr><td><code>echo "GEMINI_API_KEY=your_api_key_here" > .env</code></td></tr>
    <tr><td>4. Start development server</td></tr>
    <tr><td><code>npm run dev</code></td></tr>
    <tr><td>Application available at <code>http://localhost:9002</code></td></tr>
  </table>

  <h3>Docker Deployment</h3>

  <table>
    <tr><td>1. Build and run with Docker Compose</td></tr>
    <tr><td><code>docker-compose up -d</code></td></tr>
    <tr><td>2. Set your Gemini API key (optional)</td></tr>
    <tr><td><code>export GEMINI_API_KEY="your_api_key_here"</code></td></tr>
    <tr><td><code>docker-compose up -d</code></td></tr>
    <tr><td>Application available at <code>http://localhost:3102</code></td></tr>
  </table>

  <h3>Docker Configuration</h3>

  <p>Customize deployment by modifying <code>docker-compose.yml</code>:</p>

  <table>
    <tr>
      <th>Setting</th>
      <th>Configuration</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Port Mapping</td>
      <td><code>"3102:3000"</code></td>
      <td>Change left port for different host binding</td>
    </tr>
    <tr>
      <td>Environment</td>
      <td><code>GEMINI_API_KEY</code></td>
      <td>API key for AI features</td>
    </tr>
    <tr>
      <td>Volume</td>
      <td><code>./data:/app/data</code></td>
      <td>Persists saved badge configurations</td>
    </tr>
  </table>

  <h2>AI Integration (Optional)</h2>

  <p>BadgeForge includes optional AI-powered badge generation using Google Gemini.</p>

  <h3>Setup</h3>

  <table>
    <tr><td>1. Obtain an API key from <a href="https://aistudio.google.com/app/apikey">Google AI Studio</a></td></tr>
    <tr><td>2. Configure your environment:</td></tr>
    <tr><td><strong>Option 1: Environment file</strong></td></tr>
    <tr><td><code>echo "GEMINI_API_KEY=your_api_key_here" > .env</code></td></tr>
    <tr><td><strong>Option 2: Docker environment variable</strong></td></tr>
    <tr><td><code>export GEMINI_API_KEY="your_api_key_here"</code></td></tr>
  </table>

  <h3>Usage</h3>

  <table>
    <tr><td>Navigate to the AI generation tab in the application</td></tr>
    <tr><td>Describe your desired badge in natural language</td></tr>
    <tr><td>Receive multiple design variations tailored to your specifications</td></tr>
    <tr><td>Select and customize your favorite generated design</td></tr>
  </table>

  <h2>Technology Stack</h2>

  <table>
    <tr>
      <th>Component</th>
      <th>Technology</th>
    </tr>
    <tr>
      <td>Framework</td>
      <td>Next.js 15.3.3</td>
    </tr>
    <tr>
      <td>UI Library</td>
      <td>React 18.3.1</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>TypeScript 5</td>
    </tr>
    <tr>
      <td>Styling</td>
      <td>Tailwind CSS 3.4.1</td>
    </tr>
    <tr>
      <td>Components</td>
      <td>Radix UI</td>
    </tr>
    <tr>
      <td>AI</td>
      <td>Google Gemini (Genkit 1.13.0)</td>
    </tr>
    <tr>
      <td>Icons</td>
      <td>Simple Icons 13.1.0</td>
    </tr>
    <tr>
      <td>Deployment</td>
      <td>Docker</td>
    </tr>
  </table>

  <h2>Development</h2>

  <table>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>npm run dev</code></td>
      <td>Run development server with Turbopack</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>Build for production</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>Start production server</td>
    </tr>
    <tr>
      <td><code>npm run typecheck</code></td>
      <td>Type checking</td>
    </tr>
    <tr>
      <td><code>npm run lint</code></td>
      <td>Linting</td>
    </tr>
  </table>

  <h2>Showcase</h2>

  <p>
    <img src="https://github.com/user-attachments/assets/ab5bb4fd-6bdc-4ca5-98c2-45a2c9c84efd" alt="BadgeForge Screenshot 1">
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/a9f77746-268d-49e3-b043-04021ce7a2cf" alt="BadgeForge Screenshot 2">
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/35ae242a-2c1a-44d4-844b-57acc5e445db" alt="BadgeForge Screenshot 3">
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/c5432cfa-9abc-4ad0-bcf3-0dd977813bfe" alt="BadgeForge Screenshot 4">
  </p>

  <h2>Acknowledgments</h2>

  <p>Built with <a href="https://shields.io/">shields.io</a> for badge generation and <a href="https://simpleicons.org/">Simple Icons</a> for icon assets.</p>

</div>
