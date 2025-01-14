"""FastAPI application server."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel

security = HTTPBearer()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoDto(BaseModel):
    """Represent a to-do item."""

    id: int
    title: str
    completed: bool


class CreateTodoDto(BaseModel):
    """Data Transfer Object (DTO) for creating a new Todo item."""

    title: str


todos: list[TodoDto] = []


@app.get("/todos")
async def get_todos() -> list[TodoDto]:
    """Fetch the list of todo items.

    Returns:
        list[TodoItem]: A list of TodoItem objects.

    """
    return todos


@app.post("/todos")
async def create_todo(data: CreateTodoDto) -> TodoDto:
    """Asynchronously creates a new todo item and adds it to the list of todos.

    Args:
        data (CreateTodoDto): The data for the new todo item.

    Returns:
        TodoItem: The todo item that was added.

    """
    todos.append(TodoDto(id=len(todos) + 1, title=data.title, completed=False))
    return todos[-1]


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
