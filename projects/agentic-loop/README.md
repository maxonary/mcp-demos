# Agentic Loop

This project demonstrates the implementation of an agentic loop using
Anthropic's Claude model and a set of custom tools for code development and
interaction. It showcases how an AI agent can be designed to analyze requests,
clarify ambiguities, write and test code, manage files, and run commands in a
development container.

📺 [Watch the Tutorial](https://youtu.be/EKIgnMGwLFw)

## Demos

### Demo 1
https://github.com/user-attachments/assets/04805762-09d7-425a-826c-10fee7190b67

### Demo 2
https://github.com/user-attachments/assets/7dd47778-595a-4e6b-9dca-51c6ed7f760e

### Demo 3
https://github.com/user-attachments/assets/d7e2bc51-93f5-41b8-9287-1123cfe40a5a


## Key Features

- Implements an agentic loop for automated code development.
- Integrates with Anthropic's Claude model for intelligent task execution.
- Includes tools for running commands in a Docker development container.
- Enables creating and updating files within the development environment.
- Allows the agent to interact with the user for clarification.
- Demonstrates a structured approach to handling user requests, including
  analysis, clarification, testing, implementation, and iteration.

## Tech Stack

- Python (v3.12+)
- Anthropic Python Library
- Docker
- Pydantic
- Python-dotenv
- Rich
- Tenacity

## Getting Started

### Prerequisites

- Python (v3.12 or later) installed on your local machine.
- Docker installed and running.
- An Anthropic API key configured in a `.env` file (see `.env.example` if
  provided).
- Basic understanding of Docker and containerization.

### Installation

1. Clone the repository (if you haven't already).
2. Install the project dependencies using uv: `uv sync`
3. Configure your Anthropic API key by creating a `.env` file in the project
   directory and adding:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```
4. Start the Python development container:
   ```bash
   uv run simple_ui.py  # This script includes the container startup
   ```

### Usage

Run the `simple_ui.py` script to start the interactive agentic loop:

```bash
uv run simple_ui.py
```

You will be prompted to enter your requests, and the agent will process them,
potentially using the available tools and interacting with you for more
information.

## Project Structure

```
agentic-loop/
├── agent.py         # Defines the Agent class and its core logic
├── clients.py       # Initializes Anthropic and Docker clients
├── pyproject.toml   # Project dependencies and metadata
├── README.md        # This file
├── simple_ui.py     # Simple command-line interface for interacting with the agent
├── tools.py         # Defines the available tools for the agent
```

## Implementation Details

The core of the project lies in the `agent.py` file, which defines the `Agent`
class. This class manages the interaction with the Anthropic model, the
available tools, and the message history. The `agentic_loop` method orchestrates
the process of sending messages to the model, handling tool calls, and
processing the responses.

The `tools.py` file defines the various tools that the agent can use, such as
`ToolRunCommandInDevContainer` for executing commands in a Docker container and
`ToolUpsertFile` for creating or updating files.

The `simple_ui.py` provides a basic command-line interface for interacting with
the agent. It handles user input and displays the agent's responses and tool
interactions.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

MIT License

## Additional Resources

- Anthropic API Documentation: [Link to Anthropic API docs]
- Docker Documentation: [Link to Docker docs]
- Pydantic Documentation: [Link to Pydantic docs]
