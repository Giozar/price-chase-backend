import * as pw from 'playwright';

export async function getHtmlContent(url: string): Promise<string> {
    const browser = await pw.chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const content = await page.content();
    await browser.close();
    return content;
}
