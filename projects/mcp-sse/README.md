# Remote MCP with SSE

> Create a remote MCP server using Server-Sent Events (SSE) with FastAPI.

This project demonstrates how to create a remote MCP server using Server-Sent
Events (SSE) with FastAPI, enabling clients to access tools over HTTP.

📺 [Watch the Tutorial](https://youtu.be/kJ6EbcWvgYU)

## Key Features

- Create an MCP server with FastAPI.
- Expose tools over Server-Sent Events (SSE).
- Demonstrate client interaction with the remote server.
- Combine REST endpoints with MCP tools in a single server.

## Tech Stack

- FastAPI
- FastMCP
- Loguru
- MCP
- Uvicorn
- httpx

## Getting Started

### Prerequisites

- Python 3.12+
- uv

### Installation

1. Clone the repository.
2. Navigate to the project directory: `cd projects/mcp-sse`
3. Install dependencies using uv: `uv sync`

### Usage

1. Run the server: `uv run server.py`
2. Run the client: `uv run client.py`

## Project Structure

```
mcp-sse/ ├── README.md # Project documentation ├── client.py # MCP client script
├── pyproject.toml # Project dependencies ├── server.py # MCP server script └──
uv.lock # Dependency lock file
```

## Implementation Details

- The `server.py` file defines an MCP server with a `get_weather` tool.
- The `client.py` file demonstrates how to connect to the remote server and
  invoke the `get_weather` tool.
- FastAPI is used to create the server and expose the SSE endpoint.

## Contributing

1. Fork the repository.
2. Create your feature branch.
3. Submit a pull request.

## License

MIT License - See [LICENSE](LICENSE) file for details.
