import {expect, test} from '@playwright/test';
import {setPageHtml} from '../tools/setPageHtml';

test.describe('App Image', () => {

    test('Image component renders with default page number', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image></app-image>
                </div>
            `);
        const img = page.locator('app-image img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image1.jpeg');
        await expect(img).toHaveAttribute('alt', 'image1');
    })

    test('Image component renders with custom page number', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="5"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image5.jpeg');
        await expect(img).toHaveAttribute('alt', 'image5');
    })

    test('Image has correct CSS classes for responsive layout', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="3"></app-image>
                </div>
            `);

        const container = page.locator('app-image div');
        await expect(container).toHaveClass(/flex flex-row justify-center w-full/);

        const img = page.locator('app-image img');
        await expect(img).toHaveClass(/max-w-screen max-h-dvh/);
    })

    test('Image updates when page-number attribute changes', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image id="test-image" page-number="2"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toHaveAttribute('src', '/sketch/image2.jpeg');
        await expect(img).toHaveAttribute('alt', 'image2');

        await page.evaluate(() => {
            const imageEl = document.getElementById('test-image');
            imageEl?.setAttribute('page-number', '8');
        });

        await expect(img).toHaveAttribute('src', '/sketch/image8.jpeg');
        await expect(img).toHaveAttribute('alt', 'image8');
    })

    test('Image handles string page numbers correctly', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="12"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image12.jpeg');
        await expect(img).toHaveAttribute('alt', 'image12');
    })

    test('Image handles edge case page numbers', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="1"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image1.jpeg');
        await expect(img).toHaveAttribute('alt', 'image1');
    })

    test('Image handles high page numbers', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="14"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image14.jpeg');
        await expect(img).toHaveAttribute('alt', 'image14');
    })

    test('Multiple image components work independently', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image id="img1" page-number="3"></app-image>
                    <app-image id="img2" page-number="7"></app-image>
                </div>
            `);

        const img1 = page.locator('#img1 img');
        const img2 = page.locator('#img2 img');

        await expect(img1).toHaveAttribute('src', '/sketch/image3.jpeg');
        await expect(img1).toHaveAttribute('alt', 'image3');

        await expect(img2).toHaveAttribute('src', '/sketch/image7.jpeg');
        await expect(img2).toHaveAttribute('alt', 'image7');
    })

    test('Image component has proper container structure', async ({page}) => {
        await page.goto('/');
        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image page-number="6"></app-image>
                </div>
            `);

        const container = page.locator('app-image div');
        await expect(container).toBeVisible();

        const img = container.locator('img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', '/sketch/image6.jpeg');
    })

    test('Image attribute changes update both src and alt', async ({page}) => {
        await page.goto('/');

        await setPageHtml(page, //language=HTML
            `
                <div>
                    <app-image id="dynamic-image" page-number="4"></app-image>
                </div>
            `);

        const img = page.locator('app-image img');
        await expect(img).toHaveAttribute('src', '/sketch/image4.jpeg');
        await expect(img).toHaveAttribute('alt', 'image4');

        await page.evaluate(() => {
            const imageEl = document.getElementById('dynamic-image');
            imageEl?.setAttribute('page-number', '11');
        });

        await expect(img).toHaveAttribute('src', '/sketch/image11.jpeg');
        await expect(img).toHaveAttribute('alt', 'image11');

        await page.evaluate(() => {
            const imageEl = document.getElementById('dynamic-image');
            imageEl?.setAttribute('page-number', '9');
        });

        await expect(img).toHaveAttribute('src', '/sketch/image9.jpeg');
        await expect(img).toHaveAttribute('alt', 'image9');
    })

})
