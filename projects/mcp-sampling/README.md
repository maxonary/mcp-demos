# MCP Sampling

> Demonstrates MCP sampling, where the server requests the client to generate
> content using AI.

This project demonstrates MCP sampling, a feature where the server requests the
client to generate content using AI. This allows the server to use AI
functionality without relying on its own LLM infrastructure.

📺 [Watch the Tutorial](https://youtu.be/bXQnds5YSXQ)

## Key Features

- Demonstrates MCP sampling: server requests AI processing from the client.
- Reduces server-side costs by leveraging client-side AI.
- Simple example: generates a poem on the client side when requested by the
  server.

## Tech Stack

- FastMCP
- FastAPI
- Anthropic
- Loguru
- Python

## Getting Started

### Prerequisites

- Python 3.12+
- uv
- Anthropic API Key (set in `.env`)

### Installation

1. Clone the repository.
2. Navigate to the project directory: `cd projects/mcp-sampling`
3. Install dependencies using uv: `uv sync`
4. Create a `.env` file and set your Anthropic API key:
   ```bash
   ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY
   ```

### Usage

1. Run the server: `uv run server.py`
2. Run the client: `uv run client.py`

The server will request the client to generate a poem, showcasing the MCP
sampling functionality.

## Project Structure

```
mcp-sampling/
├── client.py   # MCP client script
├── pyproject.toml # Project dependencies
├── README.md   # Project documentation
├── server.py   # MCP server script
└── uv.lock     # Dependency lock file
```

## Implementation Details

- The server exposes a `generate_poem` tool that uses MCP sampling to request
  poem generation from the client.
- The client implements the sampling callback using the Anthropic API to fulfill
  the server's request.

## License

MIT License - See [LICENSE](LICENSE) file for details.
