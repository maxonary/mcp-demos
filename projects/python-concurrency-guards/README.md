# Control Asyncio Concurrency with Locks & Semaphores

> Tame your async tasks with powerful concurrency primitives

This project demonstrates how to manage concurrency in Python’s `asyncio` using
`Locks` and `Semaphores`. Learn to control task execution, prevent API
overloads, and optimize your async applications through practical examples.

📺 [Watch the Tutorial](https://youtu.be/ZO74-pZLr1w)

## Key Features

- Compare uncontrolled concurrency, `Lock`, and `Semaphore` approaches
- Real-world example: scraping websites with concurrency limits
- Measure performance impact of different concurrency strategies
- Type-hinted, modern Python code (3.12+)

## Prerequisites

- Python (v3.12 or later)
- uv

## Usage

### Quick Start with uv

The script specifies its dependencies in `pyproject.toml`, so you can run it
directly with `uv`:

```bash
uv sync
uv run main.py
```

### Command Options

The script runs three demos sequentially:

- Uncontrolled concurrency
- Concurrency with a `Lock`
- Concurrency with a `Semaphore` (limit of 4)

Simply execute:

```bash
uv run main.py
```

## Using with Learning

1. Run the script to see concurrency in action:

```bash
uv run main.py
```

2. Study the output to understand how `Locks` and `Semaphores` affect task
   execution.

3. Modify the `Semaphore` limit or add more URLs to experiment with different
   concurrency levels.

## Project Structure

```
python-concurrency-guards/
├── README.md          # Project documentation
├── main.py            # Main script with concurrency demos
├── pyproject.toml     # Project metadata and dependencies
├── layout.zellij      # Zellij layout for development
└── uv.lock            # Dependency lock file
```

## Implementation Details

The script uses:

- `asyncio` for asynchronous programming
- `httpx` for async HTTP requests (auto-installed via `uv`)
- `Lock` for exclusive task execution
- `Semaphore` for limited concurrent task execution
- Timing measurements with `time.time()`

## Common Issues and Solutions

1. **Network Errors**
   - Ensure you have an active internet connection.
   - Check if URLs are accessible; some may block scraping.

2. **Concurrency Limits**
   - Adjust the `Semaphore` limit in `main_semaphore()` to experiment.
   - Be cautious with too many concurrent requests to avoid IP bans.

## Contributing

Found a bug or want to add more examples? Feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Additional Resources

- [UV Documentation](https://github.com/astral-sh/uv)
- [Python Asyncio Documentation](https://docs.python.org/3/library/asyncio.html)
- [Httpx Documentation](https://www.python-httpx.org/)
