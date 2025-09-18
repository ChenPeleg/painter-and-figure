import {expect, test} from '@playwright/test';
import  {readFileSync} from 'fs';
import {resolve} from 'path';


test.describe('Translation Spec', () => {

    test('App language button switches between languages', async ({page}) => {
        const __dirname =  resolve();
        const htmlPath = resolve(__dirname, 'tests/html/index.html');
        const html =  readFileSync(htmlPath, 'utf-8');
        await page.setContent(html);
        const title = await page.title();
        expect(title).toBe('Test Application');
    })

})
