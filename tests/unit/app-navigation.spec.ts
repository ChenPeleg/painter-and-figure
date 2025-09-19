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

    test('Navigation shows correct page counter with default values', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Should show 1/14 by default
        await expect(page.getByText('1/14')).toBeVisible();
    })

    test('Navigation shows correct page counter with custom attributes', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="5" first-page="1" last-page="20"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Should show 5/20 with custom attributes
        await expect(page.getByText('5/20')).toBeVisible();
    })

    test('Previous button is disabled on first page', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="1" first-page="1" last-page="10"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Previous button should be disabled on first page
        const prevButton = page.locator('#previous-page');
        await expect(prevButton).toHaveClass(/pointer-events-none opacity-50/);
        await expect(prevButton.locator('app-button')).toHaveAttribute('disabled');
    })

    test('Next button is disabled on last page', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="10" first-page="1" last-page="10"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Next button should be disabled on last page
        const nextButton = page.locator('#next-page');
        await expect(nextButton).toHaveClass(/pointer-events-none opacity-50/);
        await expect(nextButton.locator('app-button')).toHaveAttribute('disabled');
    })

    test('Both navigation buttons are enabled on middle pages', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="5" first-page="1" last-page="10"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Both buttons should be enabled on middle pages
        const prevButton = page.locator('#previous-page');
        const nextButton = page.locator('#next-page');

        await expect(prevButton).not.toHaveClass(/pointer-events-none opacity-50/);
        await expect(nextButton).not.toHaveClass(/pointer-events-none opacity-50/);
        await expect(prevButton.locator('app-button')).not.toHaveAttribute('disabled');
        await expect(nextButton.locator('app-button')).not.toHaveAttribute('disabled');
    })

    test('Navigation links have correct hrefs', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="5" first-page="1" last-page="10"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Check href attributes
        const prevButton = page.locator('#previous-page');
        const nextButton = page.locator('#next-page');

        await expect(prevButton).toHaveAttribute('href', '#/page/4');
        await expect(nextButton).toHaveAttribute('href', '#/page/6');
    })

    test('Navigation updates when attributes change', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation id="nav" current-page="3" first-page="1" last-page="10"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Initial state
        await expect(page.getByText('3/10')).toBeVisible();

        // Change current page attribute
        await page.evaluate(() => {
            const nav = document.getElementById('nav');
            nav?.setAttribute('current-page', '7');
        });

        // Should update to show new page
        await expect(page.getByText('7/10')).toBeVisible();
    })

    test('Language button switches between English and Hebrew', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="2" first-page="1" last-page="5"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Start with English (should show "Previous" and "Next")
        await page.getByText('en').filter({visible: true}).click();
        await expect(page.getByText('Previous')).toBeVisible();
        await expect(page.getByText('Next')).toBeVisible();

        // Switch to Hebrew
        await page.getByText('עב').filter({visible: true}).click();
        await expect(page.getByText('עמוד קודם')).toBeVisible();
        await expect(page.getByText('עמוד הבא')).toBeVisible();
    })

    test('Navigation handles edge case: single page', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation current-page="1" first-page="1" last-page="1"></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Both buttons should be disabled for single page
        const prevButton = page.locator('#previous-page');
        const nextButton = page.locator('#next-page');

        await expect(prevButton).toHaveClass(/pointer-events-none opacity-50/);
        await expect(nextButton).toHaveClass(/pointer-events-none opacity-50/);
        await expect(page.getByText('1/1')).toBeVisible();
    })

    test('Navigation contains required components', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-navigation></app-navigation>
                </div>
            `);

        const component = page.getByTestId('app-navigation');
        await expect(component).toBeVisible();

        // Check that all required sub-components are present
        await expect(component.locator('app-banner')).toBeVisible();
        await expect(component.locator('language-button')).toBeVisible();
        await expect(component.locator('#previous-page')).toBeVisible();
        await expect(component.locator('#next-page')).toBeVisible();
        await expect(component.locator('#count-text')).toBeVisible();
    })

})
