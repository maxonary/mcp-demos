I'll update the README to use uv for installation and add the tutorial link.

# SQLAlchemy Async Upsert Examples

> Practical examples of implementing upsert operations with SQLAlchemy async and
> SQLite

This repository demonstrates different approaches to implementing upsert
(insert-or-update) operations using SQLAlchemy's async features with SQLite.
From manual implementations to optimized bulk operations, learn how to handle
data persistence efficiently.

📺 [Watch the Tutorial](https://youtu.be/d0Dv7r3JuWA)

## Key Features

- Async SQLAlchemy with SQLite
- Multiple upsert implementation approaches
- Type-annotated modern Python code
- Practical, runnable examples
- Zero dependencies besides SQLAlchemy and aiosqlite

## Prerequisites

- Python 3.12 or later
- uv

## Running the Examples

```bash
# Install dependencies using uv
uv sync

# Run individual examples
uv run 1_manual-upsert.py
uv run 2_on_conflict_constraint_upsert.py
uv run 3_on_conflict_constraint_bulk_upserts.py
```

## Examples Overview

### 1. Manual Upsert

Basic implementation using explicit SELECT and conditional INSERT/UPDATE, with
potential race conditions and performance issues:

```python
async def manual_upsert(email: str, name: str, age: int):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user:
            user.name = name
            user.age = age
        else:
            session.add(User(email=email, name=name, age=age))
        await session.commit()
```

### 2. Single Row Upsert with Constraints

Efficient single-row upsert using SQLite's ON CONFLICT clause:

```python
async def upsert_unique_email(email: str, name: str, age: int):
    stmt = sqlite_upsert(User).values(email=email, name=name, age=age)
    stmt = stmt.on_conflict_do_update(
        index_elements=[User.email],
        set_={"name": stmt.excluded.name, "age": stmt.excluded.age},
    )
```

### 3. Bulk Upsert Operations

Optimized multi-row upsert for batch processing:

```python
async def bulk_upsert(users_data: list[dict]):
    stmt = sqlite_upsert(User).values(users_data)
    stmt = stmt.on_conflict_do_update(
        index_elements=[User.email],
        set_={"name": stmt.excluded.name, "age": stmt.excluded.age},
    )
```

## Project Structure

```
├── pyproject.toml           # Project dependencies and metadata
├── README.md               # Project documentation
├── .python-version         # Python version specification
├── 1_manual-upsert.py     # Manual upsert implementation
├── 2_on_conflict_constraint_upsert.py    # Single row constraint-based upsert
└── 3_on_conflict_constraint_bulk_upserts.py    # Bulk upsert operations
```

## Implementation Details

The examples demonstrate:

- Modern SQLAlchemy 2.0+ async patterns
- Type hints with SQLAlchemy's Mapped types
- In-memory SQLite for easy testing
- JSON serialization for result display
- Context manager usage for proper resource cleanup

## Common Patterns

1. **Session Management**
   - Async context managers for proper cleanup
   - expire_on_commit=False for better async behavior

2. **Model Definition**
   - Type-annotated fields with Mapped
   - Unique constraints for conflict handling
   - JSON serialization methods

3. **Error Handling**
   - Graceful handling of existing records
   - Proper transaction management

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Additional Resources

- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [SQLAlchemy Async Documentation](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
- [SQLite ON CONFLICT Documentation](https://www.sqlite.org/lang_conflict.html)
- [aiosqlite Documentation](https://aiosqlite.omnilib.dev/en/stable/)
- [uv Documentation](https://github.com/astral-sh/uv)
