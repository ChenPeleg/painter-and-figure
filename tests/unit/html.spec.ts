import {expect, test} from '@playwright/test';

test.describe('Store Reducer', () => {

    test('addOne increments count', async ({page}) => {
        const htmlPath = resolve(__dirname, '../html/index.html');
        const html =  readFileSync(htmlPath, 'utf-8');
        await page.setContent(html);
    })
})
