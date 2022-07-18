import { expect, Page } from '@playwright/test';
import { test, pageManager } from './BaseTest';

test.describe('Digital Action Plan checking stauses tests', async () => {

  let page: Page;
  let mainMenu;
  let checkableResultsPage;
  let dapPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mainMenu = await pageManager.getMainMenuComponent(page);
    checkableResultsPage = await pageManager.getCheckableResultsPage(page);
    dapPage = await pageManager.getDAPPage(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.DigitalActionPlan);
    await expect(dapPage.CompletedWidget.DownloadCompletedReport, 
      '"Download completed report" button should be visible').toBeVisible({timeout: 40000});
  });

  test.beforeEach(async () => {
    await page.reload();
  });
  
  test.afterAll(async () => {
    await page.close();
  });
  
  test('Completed result verification. "SSL Certificate" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.SSLCertificate
    .locator(dapPage.Locators.SSLCertificateLocator).waitFor();

    await expect(dapPage.CompletedWidget.SSLCertificate
      .locator(dapPage.Locators.SSLCertificateLocator),
      'SSL Certificate should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.SSLCertificate
      .locator(dapPage.Locators.StatusSuccessLocator),
      'SSL Certificate should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.SSLCertificate
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Completed result verification. "Contact form" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.ContactForm
    .locator(dapPage.Locators.ContactFormLocator).waitFor();

    await expect(dapPage.CompletedWidget.ContactForm
      .locator(dapPage.Locators.ContactFormLocator),
      'Contact form should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.ContactForm
      .locator(dapPage.Locators.StatusSuccessLocator),
      'Contact form should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.ContactForm
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Completed result verification. "Legal Necessities" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.LegalNecessities
    .locator(dapPage.Locators.LegalNecessitiesLocator).waitFor();

    await expect(dapPage.CompletedWidget.LegalNecessities
      .locator(dapPage.Locators.LegalNecessitiesLocator),
      'Legal Necessities should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.LegalNecessities
      .locator(dapPage.Locators.StatusSuccessLocator),
      'Legal Necessities should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.LegalNecessities
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Completed result verification. "Mobile accessibility" has WARNING status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.MobileAccessibility
    .locator(dapPage.Locators.MobileAccessibilityLocator).waitFor();

    await expect(dapPage.CompletedWidget.MobileAccessibility
      .locator(dapPage.Locators.MobileAccessibilityLocator),
      'Mobile accessibility should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.MobileAccessibility
      .locator(dapPage.Locators.StatusWarningLocator),
      'Mobile accessibility should have WARNING status').toBeVisible();

      console.log('Status Warning Description is = ' + await dapPage.CompletedWidget.MobileAccessibility
      .locator(dapPage.Locators.StatusWarningDescriptionLocator).textContent());
  });

  test('Completed result verification. "Desktop accessibility" has WARNING status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.DesktopAccessibility
    .locator(dapPage.Locators.DesktopAccessibilityLocator).waitFor();

    await expect(dapPage.CompletedWidget.DesktopAccessibility
      .locator(dapPage.Locators.DesktopAccessibilityLocator),
      'Desktop accessibility should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.DesktopAccessibility
      .locator(dapPage.Locators.DesktopAccessibilityLocator),
      'Desktop accessibility should have WARNING status').toBeVisible();

      console.log('Status Warning Description is = ' + await dapPage.CompletedWidget.DesktopAccessibility
      .locator(dapPage.Locators.StatusWarningDescriptionLocator).textContent());
  });

  test('Completed result verification. "About us" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.AboutUs
    .locator(dapPage.Locators.AboutUsLocator).waitFor();

    await expect(dapPage.CompletedWidget.AboutUs
      .locator(dapPage.Locators.AboutUsLocator),
      'About us should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.AboutUs
      .locator(dapPage.Locators.StatusSuccessLocator),
      'About us should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.AboutUs
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Completed result verification. "Sitemap" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.Sitemap
    .locator(dapPage.Locators.SitemapLocator).waitFor();

    await expect(dapPage.CompletedWidget.Sitemap
      .locator(dapPage.Locators.SitemapLocator),
      'Sitemap should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.Sitemap
      .locator(dapPage.Locators.StatusSuccessLocator),
      'Sitemap should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.Sitemap
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Completed result verification. "Mobile site speed" has WARNING status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.MobileSiteSpeed
    .locator(dapPage.Locators.MobileSiteSpeedLocator).waitFor();

    await expect(dapPage.CompletedWidget.MobileSiteSpeed
    .locator(dapPage.Locators.MobileSiteSpeedLocator),
      'Mobile site spee should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.MobileSiteSpeed
    .locator(dapPage.Locators.StatusWarningLocator),
      'Mobile site spee should have WARNING status').toBeVisible();

    console.log('Status Warning Description is = ' + await dapPage.CompletedWidget.MobileSiteSpeed
    .locator(dapPage.Locators.StatusWarningDescriptionLocator).textContent());
  });
  
  test('Completed result verification. "Website layout" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.WebsiteLayout
    .locator(dapPage.Locators.WebsiteLayoutLocator).waitFor();

    await expect(dapPage.CompletedWidget.WebsiteLayout
      .locator(dapPage.Locators.WebsiteLayoutLocator),
      'Website layout should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.WebsiteLayout
      .locator(dapPage.Locators.StatusSuccessLocator),
      'Website layout should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.WebsiteLayout
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });
  
  test('Completed result verification. "Broken links" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).waitFor();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.LoadMoreDropdown).click();
    await dapPage.Widgets.Completed
    .locator(dapPage.Locators.SeeLessDropdown).waitFor();
    await dapPage.CompletedWidget.BrokenLinks
    .locator(dapPage.Locators.BrokenLinksLocator).waitFor();

    await expect(dapPage.CompletedWidget.BrokenLinks
      .locator(dapPage.Locators.BrokenLinksLocator),
      'Broken links should be include in the scope of verification').toBeVisible();
    await expect(dapPage.CompletedWidget.BrokenLinks
      .locator(dapPage.Locators.StatusSuccessLocator),
      'Broken links should have SUCCESS status').toBeVisible();

      console.log('Status Success Description is = ' + await dapPage.CompletedWidget.BrokenLinks
      .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Easy business wins result verification. "Google Business Profile" has ERROR status.', async ({}) => {
    await dapPage.Widgets.EasyBusinessWinsz
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.EasyBusinessWinsz
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.EasyBusinessWinszWidget.GoogleBusinessProfile
    .locator(dapPage.Locators.GoogleBusinessProfileLocator).waitFor();

    await expect(dapPage.EasyBusinessWinszWidget.GoogleBusinessProfile
    .locator(dapPage.Locators.GoogleBusinessProfileLocator),
      'Google Business Profile should be include in the scope of verification').toBeVisible();
    await expect(dapPage.EasyBusinessWinszWidget.GoogleBusinessProfile
    .locator(dapPage.Locators.StatusErrorLocator),
      'Google Business Profile should have ERROR status').toBeVisible();

    console.log('Status Error Description is = ' + await dapPage.EasyBusinessWinszWidget.GoogleBusinessProfile
    .locator(dapPage.Locators.StatusErrorDescriptionLocator).textContent());
  });

  test('Easy business wins result verification. "Confirmation emails" has NEUTRAL status.', async ({}) => {
    await dapPage.Widgets.EasyBusinessWinsz
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.EasyBusinessWinsz
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.EasyBusinessWinszWidget.ConfirmationEmails
    .locator(dapPage.Locators.ConfirmationEmailsLocator).waitFor();

    await expect(dapPage.EasyBusinessWinszWidget.ConfirmationEmails
    .locator(dapPage.Locators.ConfirmationEmailsLocator),
      'Confirmation emails should be include in the scope of verification').toBeVisible();
    await expect(dapPage.EasyBusinessWinszWidget.ConfirmationEmails
    .locator(dapPage.Locators.StatusNeutralLocator),
      'Confirmation emails should have NEUTRAL status').toBeVisible();

    console.log('Status Neutral Description is = ' + await dapPage.EasyBusinessWinszWidget.ConfirmationEmails
    .locator(dapPage.Locators.StatusNeutralDescriptionLocator).textContent());
  });

  test('Business essentials result verification. "Facebook" has NEUTRAL status.', async ({}) => {
    await dapPage.Widgets.BusinessEssentials
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.BusinessEssentials
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.BusinessEssentialsWidget.Facebook
    .locator(dapPage.Locators.FacebookLocator).waitFor();

    await expect(dapPage.BusinessEssentialsWidget.Facebook
    .locator(dapPage.Locators.FacebookLocator),
      'Facebook should be include in the scope of verification').toBeVisible();
    await expect(dapPage.BusinessEssentialsWidget.Facebook
    .locator(dapPage.Locators.StatusNeutralLocator),
      'Facebook should have NEUTRAL status').toBeVisible();

    console.log('Status Neutral Description is = ' + await dapPage.BusinessEssentialsWidget.Facebook
    .locator(dapPage.Locators.StatusNeutralDescriptionLocator).textContent());
  });

  test('Business essentials result verification. "Twitter" has SUCCESS status.', async ({}) => {
    await dapPage.Widgets.BusinessEssentials
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.BusinessEssentials
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.BusinessEssentialsWidget.Twitter
    .locator(dapPage.Locators.TwitterLocator).waitFor();

    await expect(dapPage.BusinessEssentialsWidget.Twitter
    .locator(dapPage.Locators.TwitterLocator),
      'Twitter should be include in the scope of verification').toBeVisible();
    await expect(dapPage.BusinessEssentialsWidget.Twitter
    .locator(dapPage.Locators.StatusSuccessLocator),
      'Twitter should have SUCCESS status').toBeVisible();

    console.log('Status Success Description is = ' + await dapPage.BusinessEssentialsWidget.Twitter
    .locator(dapPage.Locators.StatusSuccessDescriptionLocator).textContent());
  });

  test('Long-term goals result verification. "Desktop site speed" has WARNING status.', async ({}) => {
    await dapPage.Widgets.LongTermGoals
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.LongTermGoals
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.LongTermGoalsWidget.DesktopSiteSpeed
    .locator(dapPage.Locators.DesktopSiteSpeedLocator).waitFor();

    await expect(dapPage.LongTermGoalsWidget.DesktopSiteSpeed
    .locator(dapPage.Locators.DesktopSiteSpeedLocator),
      'Desktop site speed should be include in the scope of verification').toBeVisible();
    await expect(dapPage.LongTermGoalsWidget.DesktopSiteSpeed
    .locator(dapPage.Locators.StatusWarningLocator),
      'Desktop site speed should have WARNING status').toBeVisible();

    console.log('Status Warning Description is = ' + await dapPage.LongTermGoalsWidget.DesktopSiteSpeed
    .locator(dapPage.Locators.StatusWarningDescriptionLocator).textContent());
  });

  test('Long-term goals result verification. "Search ranking" has ERROR status.', async ({}) => {
    await dapPage.Widgets.LongTermGoals
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).waitFor();
    await dapPage.Widgets.LongTermGoals
    .locator(dapPage.Locators.WidgetsCursorPointerLocator).click();
    await dapPage.LongTermGoalsWidget.SearchRanking
    .locator(dapPage.Locators.SearchRankingLocator).waitFor();

    await expect(dapPage.LongTermGoalsWidget.SearchRanking
    .locator(dapPage.Locators.SearchRankingLocator),
      'Search ranking should be include in the scope of verification').toBeVisible();
    await expect(dapPage.LongTermGoalsWidget.SearchRanking
    .locator(dapPage.Locators.StatusErrorLocator),
      'Search ranking should have ERROR status').toBeVisible();

    console.log('Status Error Description is = ' + await dapPage.LongTermGoalsWidget.SearchRanking
    .locator(dapPage.Locators.StatusErrorDescriptionLocator).textContent());
  });
});