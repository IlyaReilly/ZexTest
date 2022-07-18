import { expect, Page } from '@playwright/test';
import { test, pageManager } from '../../BaseTest';
import { getUserByUsername } from '../../../../ApplicationLogic/ApplicationAPILogic/Helpers/SocialMedia/Twitter/TwitterService';
import { socialMediaData } from '../../../../ApplicationLogic/ApplicationAPILogic/Helpers/SocialMedia/SocialMediaData';


let page: Page;
let mainMenu;
let twitterPage;
let checkableResultsPage;
const user = getUserByUsername(socialMediaData.twitter.users.AndreyArtTest.username);

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mainMenu = await pageManager.getMainMenuComponent(page);
    checkableResultsPage = await pageManager.getCheckableResultsPage(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.MyCheckableResults);
    await expect(checkableResultsPage.CheckableResultsWidgets.Compliance,
        'Compliance result should be visible').toBeVisible({ timeout: 30000 });

    twitterPage = await pageManager.getTwitterPage(page);

});

test.afterAll(async () => {
    await page.close()
});

test('verification twitter followers result', async ({ }) => {
    
});