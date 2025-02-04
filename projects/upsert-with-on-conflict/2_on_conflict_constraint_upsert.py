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


async def display_user(email: str):
    async with AsyncSessionLocal() as session:
        result = await session.scalar(select(User).where(User.email == email))
        if result:
            print(json.dumps(result.to_dict(), indent=2))


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def upsert_unique_email(email: str, name: str, age: int):
    async with AsyncSessionLocal() as session:
        stmt = sqlite_upsert(User).values(email=email, name=name, age=age)
        stmt = stmt.on_conflict_do_update(
            index_elements=[User.email],  # Conflict on unique email
            set_={"name": stmt.excluded.name, "age": stmt.excluded.age},
        )
        print(stmt)

        await session.execute(stmt)
        await session.commit()


# Usage
async def main():
    await init_db()
    await upsert_unique_email("charlie@example.com", "Charlie", 40)
    await display_user("charlie@example.com")
    await upsert_unique_email("charlie@example.com", "Charles", 41)
    await display_user("charlie@example.com")


asyncio.run(main())
