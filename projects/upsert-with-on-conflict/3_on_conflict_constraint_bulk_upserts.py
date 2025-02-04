import asyncio
import json

from sqlalchemy import select
from sqlalchemy.dialects.sqlite import insert as sqlite_upsert
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


async def display_users():
    async with AsyncSessionLocal() as session:
        result = await session.scalars(select(User))
        if result:
            for row in result:
                print(json.dumps(row.to_dict(), indent=2))


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def bulk_upsert(users_data: list[dict]):
    async with AsyncSessionLocal() as session:
        stmt = sqlite_upsert(User).values(users_data)

        stmt = stmt.on_conflict_do_update(
            index_elements=[User.email],
            set_={"name": stmt.excluded.name, "age": stmt.excluded.age},
        )

        await session.execute(stmt)
        await session.commit()


# Usage
async def main():
    await init_db()
    data = [
        {"email": "dave@example.com", "name": "Dave", "age": 25},
        {"email": "eva@example.com", "name": "Eva", "age": 30},
    ]
    await bulk_upsert(data)
    await display_users()
    data = [
        {"email": "dave@example.com", "name": "Dave", "age": 26},
        {"email": "eva@example.com", "name": "Eva", "age": 31},
    ]
    await bulk_upsert(data)
    await display_users()


asyncio.run(main())
