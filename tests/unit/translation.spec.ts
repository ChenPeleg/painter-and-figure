import {expect, test} from '@playwright/test';
import {setPageHtml} from '../tools/setPageHtml';


test.describe('Translation Spec', () => {

    test('App language button switches between languages', async ({page}) => {
        await page.goto('/')

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <language-button>
                    </language-button>
                    <i-18 t="previousPage"></i-18>
                </div`);
        const button = page.getByTestId('language-button');
        await expect(button).toBeVisible()
        await page.getByText('en').first().click();
        await expect(page.getByText('Previous')).toBeVisible()
        await page.getByText('en').first().click();

    })

})
