import asyncio
import time

import httpx

urls = [
    "https://docs.astral.sh/uv/",
    "https://docs.astral.sh/ruff/",
    "https://pyo3.rs/v0.23.5/https://fastapi.tiangolo.com/tutorial/cors/",
    "https://fastapi.tiangolo.com/tutorial/cors/",
    "https://docs.litellm.ai/docs/"
    "https://docs.sqlalchemy.org/en/20/"
    "https://arq-docs.helpmanual.io/"
    "https://www.sqlite.org/docs.html",
]


async def scrape_url(url: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        await asyncio.sleep(1)
        print(f"Scraped {url}")
        return response.text


async def lock_demo(lock: asyncio.Lock, url: str) -> str:
    async with lock:
        print("Lock acquired")
        res = await scrape_url(url)
        return res


async def semaphore_demo(semaphore: asyncio.Semaphore, url: str) -> str:
    async with semaphore:
        print("Semaphore acquired")
        res = await scrape_url(url)
        return res


async def main():
    start = time.time()
    await asyncio.gather(*[scrape_url(url) for url in urls])
    end = time.time()
    print(f"Time taken with no concurrency guards: {end - start} seconds")
    print()
    print()


async def main_lock() -> None:
    start = time.time()
    lock = asyncio.Lock()
    await asyncio.gather(*[lock_demo(lock, url) for url in urls])
    end = time.time()
    print(f"Time taken with Lock: {end - start} seconds")
    print()
    print()


async def main_semaphore() -> None:
    start = time.time()
    semaphore = asyncio.Semaphore(4)
    await asyncio.gather(*[semaphore_demo(semaphore, url) for url in urls])
    end = time.time()
    print(f"Time taken with Semaphore(4): {end - start} seconds")
    print()
    print()


asyncio.run(main())
asyncio.run(main_lock())
asyncio.run(main_semaphore())
