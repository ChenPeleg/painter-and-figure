import * as setPageHtmlModule from '../tools/setPageHtml';
import {expect, test} from '@playwright/test';

const { setPageHtml } = setPageHtmlModule;


test.describe('Snapshot', () => {
        test('Hebrew page full snapshot', async ({page}) => {
            await page.goto('/')
            await setPageHtml(page, //language=HTML
                `
                    <app-root></app-root>`);
            await page.goto('/#/page/1')
            await page.getByText('עב').filter({visible: true}).click();

            await page.getByRole('heading', {name: 'הצייר והדמות'}).waitFor();


            await expect(page).toHaveScreenshot('screenshot.png', {
                threshold: 0.2,
                maxDiffPixelRatio: 0.05,
            });
        })
})
