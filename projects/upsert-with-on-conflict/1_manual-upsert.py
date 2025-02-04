import asyncio
import json

from sqlalchemy import select
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
)

engine = create_async_engine("sqlite+aiosqlite:///:memory:")
AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)


class Base(AsyncAttrs, DeclarativeBase): ...


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    name: Mapped[str] = mapped_column()
    age: Mapped[int] = mapped_column()

    def to_dict(self):
        return {"id": self.id, "email": self.email, "name": self.name, "age": self.age}


async def display_user(email: str):
    async with AsyncSessionLocal() as session:
        result = await session.scalar(select(User).where(User.email == email))
        if result:
            print(json.dumps(result.to_dict(), indent=2))


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def manual_upsert(email: str, name: str, age: int):
    async with AsyncSessionLocal() as session:
        # Check for existing user
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        if user:
            # Update existing
            user.name = name
            user.age = age
            print("Updating existing user")
        else:
            # Create new
            new_user = User(email=email, name=name, age=age)
            session.add(new_user)
            print("Creating new user")

        await session.commit()


# Usage
async def main():
    await init_db()
    await manual_upsert("alice@example.com", "Alice Smith", 30)
    await display_user("alice@example.com")
    await manual_upsert("alice@example.com", "Alice Johnson", 31)
    await display_user("alice@example.com")


asyncio.run(main())
