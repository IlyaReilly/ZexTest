import { expect, Page } from '@playwright/test';
import { test, pageManager } from '../BaseTest';

test.describe('Checkable results tests', async () => {

  let page: Page;
  let mainMenu;
  let checkableResultsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mainMenu = await pageManager.getMainMenuComponent(page);
    checkableResultsPage = await pageManager.getCheckableResultsPage(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.MyCheckableResults);
    await expect(checkableResultsPage.CheckableResultsWidgets.Compliance, 
      'Compliance result should be visible').toBeVisible({timeout: 30000});
  });

  test.beforeEach(async () => {
    await page.reload();
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('Compliance result verification. Should have success status.', async ({}) => {
    await expect(checkableResultsPage.CheckableResultsWidgets.Compliance
      .locator(checkableResultsPage.Locators.ComplianceLocator), 
      'Compliance result should be visible').toBeVisible();
    await expect(checkableResultsPage.CheckableResultsWidgets.Compliance
      .locator(checkableResultsPage.Locators.SuccessVerificationStatusLocator), 
      'Compliance result should have sucess status').toBeVisible();
  });

  test('Compliance result verification. SSL Certificate has warning status.', async ({}) => {
    test.fail();
    await checkableResultsPage.CheckableResultsWidgets.Compliance
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.ComplianceWidgets.SSLCertificate
      .locator(checkableResultsPage.Locators.SSLCertificateLocator),
      'SSL Certificate should be include in the scope of compliance verification').toBeVisible();
    await expect(checkableResultsPage.ComplianceWidgets.SSLCertificate
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'SSL Certificate should have warning status').toBeVisible();
  });

  test('Compliance result verification. Legal Necessities has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.Compliance
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.ComplianceWidgets.LegalNecessities
      .locator(checkableResultsPage.Locators.LegalNecessitiesLocator),
      'Legal Necessities should be include in the scope of compliance verification').toBeVisible();
    await expect(checkableResultsPage.ComplianceWidgets.LegalNecessities
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Legal Necessities should have success status').toBeVisible();
  });

  test('Customer Experience result verification. Should have success status.', async ({}) => {
    await expect(checkableResultsPage.CheckableResultsWidgets.CustomerExperience
      .locator(checkableResultsPage.Locators.CustomerExperienceLocator), 
      'Customer Experience result should be visible').toBeVisible();
    await expect(checkableResultsPage.CheckableResultsWidgets.CustomerExperience
      .locator(checkableResultsPage.Locators.SuccessVerificationStatusLocator),
      'Customer Experience result should have sucess status').toBeVisible();
  });

  test('Customer Experience result verification. Website layout has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.WebsiteLayout
      .locator(checkableResultsPage.Locators.WebsiteLayoutLocator),
      'Website layout should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.WebsiteLayout
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Website layout should have success status').toBeVisible();
  });

  test('Customer Experience result verification. Contact form has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ContactForm
      .locator(checkableResultsPage.Locators.ContactFormLocator),
      'Contact form should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ContactForm
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Contact form should have success status').toBeVisible();
  });

  test('Customer Experience result verification. Content display on social has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ContentDisplayOnSocial
      .locator(checkableResultsPage.Locators.ContentDisplayOnSocialLocator),
      'Content display on social should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ContentDisplayOnSocial
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Content display on social should have success status').toBeVisible();
  });

  test('Customer Experience result verification. E-Commerce has warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ECommerce
      .locator(checkableResultsPage.Locators.ECommerceLocator),
      'E-Commerce should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ECommerce
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'E-Commerce should have warning status').toBeVisible();
  });

  test('Customer Experience result verification. Confirmation emails has failed error status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ConfirmationEmails
      .locator(checkableResultsPage.Locators.ConfirmationEmailsLocator),
      'Confirmation emails should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ConfirmationEmails
      .locator(checkableResultsPage.Locators.SubvalidationFailedErrorStatusLocator),
      'Confirmation emails should have failed warning status').toBeVisible();
  });

  test('Customer Experience result verification. Mobile accessibility has warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.MobileAccessibility
      .locator(checkableResultsPage.Locators.MobileAccessibilityLocator),
      'Mobile accessibility should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.MobileAccessibility
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'Mobile accessibility should have warning status').toBeVisible();
  });

  test('Customer Experience result verification. Desktop accessibility has warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.DesktopAccessibility
      .locator(checkableResultsPage.Locators.DesktopAccessibilityLocator),
      'Desktop accessibility should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.DesktopAccessibility
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'Desktop accessibility should have warning status').toBeVisible();
  });

  test('Customer Experience result verification. Shopping cart has failed warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ShoppingCart
      .locator(checkableResultsPage.Locators.ShoppingCartLocator),
      'Shopping cart should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.ShoppingCart
      .locator(checkableResultsPage.Locators.SubvalidationFailedWarningStatusLocator),
      'Shopping cart should have failed warning status').toBeVisible();
  });

  test('Customer Experience result verification. About us has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.CustomerExperience
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.CustomerExperienceWidgets.AboutUs
      .locator(checkableResultsPage.Locators.AboutUsLocator),
      'About us should be include in the scope of Customer Experience verification').toBeVisible();
    await expect(checkableResultsPage.CustomerExperienceWidgets.AboutUs
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'About us should have success status').toBeVisible();
  });
  
  test('Site Speed result verification. Should have error status.', async ({}) => {
    test.fail();
    await expect(checkableResultsPage.CheckableResultsWidgets.SiteSpeed
      .locator(checkableResultsPage.Locators.SiteSpeedLocator), 
      'Site Speed result should be visible').toBeVisible();
    await expect(checkableResultsPage.CheckableResultsWidgets.SiteSpeed
      .locator(checkableResultsPage.Locators.ErrorVerificationStatusLocator),
      'Site Speed result should have error status').toBeVisible();
  });

  test('Site Speed result verification. Mobile site speed has warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.SiteSpeed
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.SiteSpeedWidgets.MobileSiteSpeed
      .locator(checkableResultsPage.Locators.MobileSiteSpeedLocator),
      'Mobile site speed should be include in the scope of Site Speed verification').toBeVisible();
    await expect(checkableResultsPage.SiteSpeedWidgets.MobileSiteSpeed
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'Mobile site speed should have warning status').toBeVisible();
  });

  test('Site Speed result verification. Desktop site speed has warning status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.SiteSpeed
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.SiteSpeedWidgets.DesktopSiteSpeed
      .locator(checkableResultsPage.Locators.DesktopSiteSpeedLocator),
      'Desktop site speed should be include in the scope of Site Speed verification').toBeVisible();
    await expect(checkableResultsPage.SiteSpeedWidgets.DesktopSiteSpeed
      .locator(checkableResultsPage.Locators.SubvalidationWarningStatusLocator),
      'Desktop site speed should have warning status').toBeVisible();
  });

  test('Visibility result verification. Should have action primary status.', async ({}) => {
    await expect(checkableResultsPage.CheckableResultsWidgets.Visibility
      .locator(checkableResultsPage.Locators.VisibilityLocator), 
      'Visibility result should be visible').toBeVisible();
    await expect(checkableResultsPage.CheckableResultsWidgets.Visibility
      .locator(checkableResultsPage.Locators.ActionPrimaryVerificationStatusLocator),
      'Visibility result should have action primary status').toBeVisible();
  });

  test('Visibility result verification. Broken links has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.Visibility
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.VisibilityWidgets.BrokenLinks
      .locator(checkableResultsPage.Locators.BrokenLinksLocator),
      'Broken links should be include in the scope of Visibility verification').toBeVisible();
    await expect(checkableResultsPage.VisibilityWidgets.BrokenLinks
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Broken links should have warning status').toBeVisible();
  });

  test('Visibility result verification. Sitemap has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.Visibility
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.VisibilityWidgets.Sitemap
      .locator(checkableResultsPage.Locators.SitemapLocator),
      'Sitemap should be include in the scope of Visibility verification').toBeVisible();
    await expect(checkableResultsPage.VisibilityWidgets.Sitemap
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Sitemap should have warning status').toBeVisible();
  });

  test('Visibility result verification. Google Business Profile has error status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.Visibility
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.VisibilityWidgets.GoogleBusinessProfile
      .locator(checkableResultsPage.Locators.GoogleBusinessProfileLocator),
      'Google Business Profile should be include in the scope of Visibility verification').toBeVisible();
    await expect(checkableResultsPage.VisibilityWidgets.GoogleBusinessProfile
      .locator(checkableResultsPage.Locators.SubvalidationErrorStatusLocator),
      'Google Business Profile has error status').toBeVisible();
  });

  test('Visibility result verification. Search ranking has error status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.Visibility
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.VisibilityWidgets.SearchRanking
      .locator(checkableResultsPage.Locators.SearchRankingLocator),
      'Search ranking should be include in the scope of Visibility verification').toBeVisible();
    await expect(checkableResultsPage.VisibilityWidgets.SearchRanking
      .locator(checkableResultsPage.Locators.SubvalidationErrorStatusLocator),
      'Search ranking has error status').toBeVisible();
  });

  test('Social Media result verification. Should have error status.', async ({}) => {
    await expect(checkableResultsPage.CheckableResultsWidgets.SocialMedia
      .locator(checkableResultsPage.Locators.SocialMediaLocator), 
      'Social Media result should be visible').toBeVisible();
    await expect(checkableResultsPage.CheckableResultsWidgets.SocialMedia
      .locator(checkableResultsPage.Locators.ErrorVerificationStatusLocator),
      'Social Media result should have error status').toBeVisible();
  });

  test('Social Media result verification. Instagram has absence of link status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.SocialMedia
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.SocialMediaWidgets.Instagram
      .locator(checkableResultsPage.Locators.InstagramLocator),
      'Instagram should be include in the scope of Social Media verification').toBeVisible();
    await expect(checkableResultsPage.SocialMediaWidgets.Instagram
      .locator(checkableResultsPage.Locators.SubvalidationUnableToDetectStatusLocator),
      'Instagram has absence of link status').toBeVisible();
  });

  test('Social Media result verification. Twitter has success status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.SocialMedia
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.SocialMediaWidgets.Twitter
      .locator(checkableResultsPage.Locators.TwitterLocator),
      'Twitter should be include in the scope of Social Media verification').toBeVisible();
    await expect(checkableResultsPage.SocialMediaWidgets.Twitter
      .locator(checkableResultsPage.Locators.SubvalidationSuccessStatusLocator),
      'Twitter has success status').toBeVisible();
  });

  test('Social Media result verification. Facebook has absence of link status', async ({}) => {
    await checkableResultsPage.CheckableResultsWidgets.SocialMedia
    .locator(checkableResultsPage.Locators.CheckableResultsCursorPointerLocator).click();
    await expect(checkableResultsPage.SocialMediaWidgets.Facebook
      .locator(checkableResultsPage.Locators.FacebookLocator),
      'Facebook should be include in the scope of Social Media verification').toBeVisible();
    await expect(checkableResultsPage.SocialMediaWidgets.Facebook
      .locator(checkableResultsPage.Locators.SubvalidationUnableToDetectStatusLocator),
      'Facebook has absence of link status').toBeVisible();
  });

});
