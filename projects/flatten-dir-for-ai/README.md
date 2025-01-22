# Flatten Directory For AI Usage
> Flatten directory structures into LLM-friendly single files

This project helps you analyze entire codebases with LLMs by flattening directory structures into a single file with XML-style path tags. No more manual copy-pasting of files!

📺 [Watch the Tutorial](https://youtu.be/Q9-DpH0D4vg)

## Key Features

- Recursive directory traversal
- XML-style path context for each file
- Binary file detection and skipping
- Configurable directory/file ignore patterns
- Console or file output options
- Zero dependencies installation (using `uv`)

## Prerequisites

- Python (v3.12 or later)
- uv (recommended for zero-install usage)

## Usage

### Quick Start with uv

The script specifies its dependencies at the top of the file, so you can run it directly with uv without installing anything:

```bash
uv run flatten.py ./my_project
```

### Command Options

```bash
# Basic usage - prints to console
uv run flatten.py ./my_project

# Save to file
uv run flatten.py ./my_project --output=flattened.txt

# Ignore specific directories
uv run flatten.py ./my_project --ignore=node_modules,venv,.git
```

### Output Example

```xml
<file path=src/main.py>
def main():
    print("Hello World")
</file>

<file path=src/utils/helper.py>
def helper():
    return True
</file>
```

## Using with LLMs

1. Flatten your directory:
```bash
uv run flatten.py ./my_project --output=analysis.txt
```

2. Copy the content of `analysis.txt` into your favorite LLM

3. Ask questions like:
- "Analyze this codebase for security vulnerabilities"
- "Generate comprehensive documentation"
- "Review the architecture and suggest improvements"

## Project Structure

```
flatten-dir-for-ai/
├── README.md          # Project documentation
├── flatten.py         # Main script with embedded dependencies
└── examples/          # Example usage and outputs
```

## Implementation Details

The script uses:
- `typer` for CLI interface (auto-installed via uv)
- `os.walk` for recursive directory traversal
- UTF-8 encoding for text files
- XML-style tags for preserving file paths

## Common Issues and Solutions

1. **Binary Files**
   - Automatically detected and skipped
   - Warning message displayed

2. **Encoding Issues**
   - Files are read as UTF-8
   - Non-text files are gracefully skipped

3. **Large Directories**
   - Use ignore patterns for `node_modules`, `venv`, etc.
   - Output to file instead of console for better handling

## Contributing

Found a bug or want to improve the code? Feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Resources

- [UV Documentation](https://github.com/astral-sh/uv)
- [Typer Documentation](https://typer.tiangolo.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/text-generation)
- [Claude Documentation](https://docs.anthropic.com/claude/docs)