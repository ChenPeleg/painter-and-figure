import {expect, test} from '@playwright/test';
import  {readFileSync} from 'fs';
import {resolve} from 'path';
import {HtmlSnippetsMock} from '../mock/HtmlSnippets.mock';
import {setPageHtml} from '../tools/setPageHtml';

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
        await page.goto('/')
        await setPageHtml (page, HtmlSnippetsMock.homePage);
        const header = await page.getByRole('heading').innerText();
        expect(header).toBe('Painter & Figure');
    })
})
