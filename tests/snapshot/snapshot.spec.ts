import * as setPageHtmlModule from '../tools/setPageHtml';
import {expect, test} from '@playwright/test';

const { setPageHtml } = setPageHtmlModule;


test.describe('Snapshot', () => {
    test.describe('Hebrew', () => {
        test('Hebrew snapshot', async ({page}) => {
            await page.goto('/')
            await setPageHtml(page, //language=HTML
                `
                    <app-root></app-root>`);
            await page.goto('/#/page/1')
            await page.getByText('עב').filter({visible: true}).click();
            const header = page.getByRole('heading', {name: 'הצייר והדמות'});
            await expect(header).toBeVisible();

            // Take a visual snapshot of the page
            await expect(page).toHaveScreenshot('hebrew-page.png');
        })

        test('Hebrew page full snapshot', async ({page}) => {
            await page.goto('/')
            await setPageHtml(page, //language=HTML
                `
                    <app-root></app-root>`);
            await page.goto('/#/page/1')
            await page.getByText('עב').filter({visible: true}).click();

            // Wait for content to load
            await page.getByRole('heading', {name: 'הצייר והדמות'}).waitFor();

            // Take a full page snapshot
            await expect(page).toHaveScreenshot('hebrew-full-page.png', { fullPage: true });
        })

        test('Hebrew header component snapshot', async ({page}) => {
            await page.goto('/')
            await setPageHtml(page, //language=HTML
                `
                    <app-root></app-root>`);
            await page.goto('/#/page/1')
            await page.getByText('עב').filter({visible: true}).click();

            const header = page.getByRole('heading', {name: 'הצייר והדמות'});
            await expect(header).toBeVisible();

            // Take a snapshot of just the header component
            await expect(header).toHaveScreenshot('hebrew-header.png');
        })
    })
})
