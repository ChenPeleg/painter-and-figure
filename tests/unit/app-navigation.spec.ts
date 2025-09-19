import {expect, test} from '@playwright/test';
import {setPageHtml} from '../tools/setPageHtml';


test.describe('Navigation bar', () => {

    test('Navigation bar component renders and has a header', async ({page}) => {
        await page.goto('/')

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation>
                    </app-navigation> 
                </div`);
        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible()
        await page.getByText('en').filter({visible : true}).click();
        await expect(page.getByText('Previous')).toBeVisible()
        await page.getByText('עב').filter({visible : true}).click();
        await expect(page.getByText('עמוד קודם')).toBeVisible()
    })

})
