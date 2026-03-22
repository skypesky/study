import asyncio
from playwright.async_api import async_playwright


class PixivScraper:
    def __init__(self):
        self.urls = []
        self.images = []

    async def scrape(self):
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Navigate to the target url
            await page.goto("https://www.pixiv.net/tags/%E5%8A%A8%E6%BC%AB%E5%A5%B3%E7%94%9F")

            # Get all image elements' src attribute
            image_elements = await page.query_selector_all("._3AMPq")
            for el in image_elements:
                src = await el.get_attribute("src")
                if src:
                    self.urls.append(src)

            # Close the browser
            await browser.close()

    async def download_images(self):
        for url in self.urls:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    data = await resp.read()
                    self.images.append(data)

    async def save_images(self):
        for i, img in enumerate(self.images):
            with open(f"image_{i}.jpg", "wb") as f:
                f.write(img)

    async def run(self):
        await self.scrape()
        await self.download_images()
        await self.save_images()


if __name__ == "__main__":
    scraper = PixivScraper()
    asyncio.run(scraper.run())