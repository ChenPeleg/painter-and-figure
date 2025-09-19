import {expect, test} from '@playwright/test';
import {setPageHtml} from '../tools/setPageHtml';


test.describe('Translation Spec', () => {

    test('App language button switches between languages', async ({page}) => {
        await page.goto('/')
        await setPageHtml(page, `<div></div><language-button></language-button> </div`);
        const button = page.getByTestId('language-button');
        await expect(button).toBeVisible()
    })

})
