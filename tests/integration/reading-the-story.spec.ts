import {setPageHtml} from '../tools/setPageHtml';
import {expect, test} from '@playwright/test';
import {type BookContent, bookContent} from '../../src/content/bookContent';

const numberOfPages = bookContent.map(p => p.pageNumber || 0).filter(p => p !== undefined).length

const firstPage = bookContent.find(p => p.pageNumber === 1) as BookContent;
const secondPage = bookContent.find(p => p.pageNumber === 2) as BookContent;
const thirdPage = bookContent.find(p => p.pageNumber ===3) as BookContent;

test.describe('Integration Tests', () => {
    test.describe('Hebrew', () => {
    test('User can see the header in Hebrew', async ({page}) => {
        await page.goto('/')
        await setPageHtml(page, //language=HTML
            `<app-root></app-root>`);
        await page.goto('/#/page/1')
        await page.getByText('עב').filter({visible : true}).click();
        const header =  page.getByRole('heading' , { name : 'הצייר והדמות'  });
        await expect(header).toBeVisible();
        const pageNumberOutOf =    page.getByText( `1/${numberOfPages}`).filter({visible : true}) ;
        await expect(pageNumberOutOf).toBeVisible();
    })
    test('User can read the story in Hebrew', async ({page}) => {
        await page.goto('/')
        await setPageHtml(page, //language=HTML
            `
                <app-root></app-root>`);
        await page.goto('/#/page/1')
        await page.getByText('עב').filter({visible: true}).click();

        await expect(page.getByText(`1/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByText(firstPage.hebrewText[1], {exact: false})).toBeVisible();
        await expect(page.getByRole('img' )).toHaveAttribute('alt', 'image1');
        await page.getByRole('link', {name: 'עמוד הבא'}).click();


        await expect(page.getByText(`2/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByRole('img' )).toHaveAttribute('alt', 'image2');
        await expect(page.getByText(secondPage.hebrewText[0], {exact: false})).toBeVisible();
        await page.getByRole('link', {name: 'עמוד הבא'}).click();
        await expect(page.getByText(`3/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByRole('img' )).toHaveAttribute('alt', 'image3');
        await expect(page.getByText(thirdPage.hebrewText[0], {exact: false})).toBeVisible();

    })

    test('User can return to previous page', async ({page}) => {
        await page.goto('/')
        await setPageHtml(page, //language=HTML
            `
                <app-root></app-root>`);
        await page.goto('/#/page/3')
        await page.getByText('עב').filter({visible: true}).click();

        await expect(page.getByText(`3/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByText(thirdPage.hebrewText[0], {exact: false})).toBeVisible();
        await expect(page.getByRole('img')).toHaveAttribute('alt', 'image3');

        await page.getByRole('link', {name: 'עמוד קודם'}).click();

        await expect(page.getByText(`2/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByText(secondPage.hebrewText[0], {exact: false})).toBeVisible();
        await expect(page.getByRole('img')).toHaveAttribute('alt', 'image2');

        await page.getByRole('link', {name: 'עמוד קודם'}).click();

        await expect(page.getByText(`1/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByText(firstPage.hebrewText[1], {exact: false})).toBeVisible();
        await expect(page.getByRole('img')).toHaveAttribute('alt', 'image1');
    })

    test('User can return to first page by clicking header', async ({page}) => {
        await page.goto('/')
        await setPageHtml(page, //language=HTML
            `
                <app-root></app-root>`);
        await page.goto('/#/page/5')
        await page.getByText('עב').filter({visible: true}).click();

        await expect(page.getByText(`5/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByRole('img')).toHaveAttribute('alt', 'image5');

        const header = page.getByRole('heading', { name: 'הצייר והדמות' });
        await header.click();

        await expect(page.getByText(`1/${numberOfPages}`).filter({visible: true})).toBeVisible();
        await expect(page.getByText(firstPage.hebrewText[1], {exact: false})).toBeVisible();
        await expect(page.getByRole('img')).toHaveAttribute('alt', 'image1');
    })
    })
})
