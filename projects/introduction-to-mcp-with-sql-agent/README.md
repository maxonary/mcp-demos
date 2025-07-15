# Introduction to MCP with SQL Agent

> Build an AI SQL agent using MCP to interact with a SQLite database through
> natural language.

📺 [Watch the Tutorial](https://youtu.be/cxl3tPWLOQ8)

## Key Features

- Create an AI SQL agent using MCP.
- Interact with a SQLite database using natural language.
- Use Claude 3 Sonnet to generate SQL queries.
- Execute SQL queries safely.
- Learn how to use MCP to build AI tools.

## Tech Stack

- Anthropic
- Loguru
- MCP
- Python-dotenv
- Rich
- SQLite

## Getting Started

### Prerequisites

- Python 3.12+
- uv
- An Anthropic API key (set in `.env` file)

### Installation

1. Clone the repository.
2. Navigate to the project directory:
   `cd projects/introduction-to-mcp-with-sql-agent`
3. (If you are behind a corporate proxy or need a custom CA certificate, e.g. `/Users/WD0W7OW/PAG-Interception-CA-ROOT-01.crt`, set these environment variables before installing dependencies:)

   ```sh
   export REQUESTS_CA_BUNDLE=/path/to/your/CA.crt
   export SSL_CERT_FILE=/path/to/your/CA.crt
   ```
   Replace `/path/to/your/CA.crt` with your actual certificate path.

4. Create and activate a virtual environment:
   ```sh
   python3 -m venv .venv
   source .venv/bin/activate
   ```
5. Install dependencies using pip:
   ```sh
   pip install anthropic docker "instructor[claude]" loguru "mcp[cli]" pydantic python-dotenv rich
   ```
   (If you use `uv`, you can try `uv sync`, but pip is more reliable in restricted environments.)
6. Create a `.env` file with your Anthropic API key:

   ```
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR_API_KEY
   ```

### Usage

1. Activate your virtual environment if not already active:
   ```sh
   source .venv/bin/activate
   ```
2. Run the MCP client:
   ```sh
   python mcp_client.py
   ```
3. Enter your SQL queries in natural language.

Note that you don't need to explicitly run the server, as the client automatically runs it.

---

## Troubleshooting

- **SSL or certificate errors when installing dependencies:**
  - Make sure to set `REQUESTS_CA_BUNDLE` and `SSL_CERT_FILE` to your custom CA certificate path before running pip or uv.
  - Example:
    ```sh
    export REQUESTS_CA_BUNDLE=/Users/WD0W7OW/PAG-Interception-CA-ROOT-01.crt
    export SSL_CERT_FILE=/Users/WD0W7OW/PAG-Interception-CA-ROOT-01.crt
    ```
- **Anthropic API key errors:**
  - Ensure your `.env` file exists and contains a valid `ANTHROPIC_API_KEY`.
  - Or, set it in your shell before running the client:
    ```sh
    export ANTHROPIC_API_KEY=sk-ant-api03-YOUR_API_KEY
    ```

## Project Structure

```
introduction-to-mcp-with-sql-agent/
├── README.md         # Project documentation
├── mcp_client.py     # MCP client script
├── mcp_server.py     # MCP server script
├── database.db       # SQLite database
├── pyproject.toml    # Project dependencies
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── .python-version   # Python version
├── layout.zellij     # Zellij layout for development
├── code.zellij       # Zellij layout for code editing
└── demo.zellij       # Zellij layout for demo
```

## Implementation Details

- The `mcp_server.py` file defines an MCP server with a `query_data` tool to
  execute SQL queries.
- The `mcp_client.py` file uses the Anthropic Claude 3 Sonnet model to generate
  SQL queries from natural language input.
- The `database.db` file is a SQLite database used for the demo.
- Zellij layouts are provided for development and demo purposes.

## Contributing

1. Fork the repository.
2. Create your feature branch.
3. Submit a pull request.

## License

MIT License - See [LICENSE](LICENSE) file for details.
