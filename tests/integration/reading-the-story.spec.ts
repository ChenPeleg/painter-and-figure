import {setPageHtml} from '../tools/setPageHtml';
import {expect, test} from '@playwright/test';


test.describe('Integration Tests', () => {

    test('User can read the story in Hebrew', async ({page}) => {
        await page.goto('/')

        await setPageHtml(page, //language=HTML
            `<app-root></app-root>`);
        await page.getByText('עב').filter({visible : true}).click();
        const header =  page.getByRole('heading' , { name : 'הצייר והדמות'  });
        await expect(header).toBeVisible();

    })
})
