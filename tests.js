const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.type('[autocomplete]', 'Nant');
    await page.screenshot({ path: 'screenshots/1.png' });
    await page.keyboard.press('Tab')
    await page.screenshot({ path: 'screenshots/2.png' });
    await page.keyboard.press('Tab')
    await page.screenshot({ path: 'screenshots/3.png' });
    await browser.close();
})();