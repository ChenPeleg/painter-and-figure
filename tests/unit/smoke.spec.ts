import {expect, test} from '@playwright/test';
import  {readFileSync} from 'fs';
import {resolve} from 'path';
import {HtmlSnippetsMock} from '../mock/HtmlSnippets.mock';
import {sleep} from '../tools/sleep';

test.describe('Html smoke test', () => {

    test('Loading Html and getting title', async ({page}) => {
        const __dirname =  resolve();
        const htmlPath = resolve(__dirname, 'tests/html/index.html');
        const html =  readFileSync(htmlPath, 'utf-8');
        await page.setContent(html);
        const title = await page.title();
        expect(title).toBe('Test Application');
    })
    test('Loading Html and setting inner html', async ({page}) => {
        const __dirname =  resolve();
        const htmlPath = resolve(__dirname, 'tests/html/index.html');
        const html =  readFileSync(htmlPath, 'utf-8');
        await page.setContent(html);

        await page.getByTestId('harness-root-div').evaluate((el, html) => {
            el.innerHTML = html;
        }, HtmlSnippetsMock.homePage);

        await sleep(5000);

        const title = await page.title();
        expect(title).toBe('Test Application');
    })
})
