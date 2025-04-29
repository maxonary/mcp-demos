"""MCP SSE Server Example with FastAPI"""

from fastapi import FastAPI
from fastmcp import Context, FastMCP

mcp: FastMCP = FastMCP("App")


@mcp.tool()
async def generate_poem(topic: str, context: Context) -> str:
    response = await context.sample(
        f"Write a short poem about {topic}",
        system_prompt="You are a talented poet who writes concise, evocative verses.",
    )
    print(response)

    if hasattr(response, "text"):
        return response.text

    return "No response"


# Create FastAPI app and mount the SSE  MCP server
app = FastAPI()


@app.get("/test")
async def test():
    """
    Test endpoint to verify the server is running.

    Returns:
        dict: A simple hello world message.
    """
    return {"message": "Hello, world!"}


app.mount("/", mcp.sse_app())
