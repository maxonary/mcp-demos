"""Client for the MCP server using Server-Sent Events (SSE)."""

import asyncio
from typing import Any

import anthropic
from dotenv import load_dotenv
from mcp import ClientSession, types
from mcp.client.sse import sse_client

load_dotenv()


anthropic_client = anthropic.AsyncAnthropic()


async def handle_sampling_message(
    context: Any,
    message: types.CreateMessageRequestParams,
) -> types.CreateMessageResult:
    if hasattr(
        message.messages[0].content,
        "text",
    ):
        prompt = message.messages[0].content.text
    else:
        raise ValueError("Invalid message content type")

    res = await anthropic_client.messages.create(
        model="claude-3-5-sonnet-latest",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": prompt},
        ],
    )

    return types.CreateMessageResult(
        role="assistant",
        content=types.TextContent(
            type="text",
            text=res.content[0].text,
        ),
        model="claude-3-5-sonnet-latest",
        stopReason="endTurn",
    )


async def main():
    """
    Main function to demonstrate MCP client functionality.

    Establishes an SSE connection to the server, initializes a session,
    and demonstrates basic operations like sending pings, listing tools,
    and calling a weather tool.
    """
    async with sse_client(url="http://localhost:8000/sse") as (read, write):
        async with ClientSession(
            read, write, sampling_callback=handle_sampling_message
        ) as session:
            await session.initialize()
            await session.send_ping()

            poem = await session.call_tool(
                name="generate_poem", arguments={"topic": "Tokyo"}
            )
            print(poem.content[0].text)


asyncio.run(main())
