import {BasePage} from './BasePage';

const pageLocator: string = '.w-full >> text=Your website results';

export class CheckableResultsPage extends BasePage {
    readonly searchTextBox;

    Locators = {
        CheckableResultsCursorPointerLocator: ':nth-match(.cursor-pointer, 1)',

        // Validation status locators
        CheckableResultsWidgetsLocator: '.shadow-lg.bg-white.h-auto.w-full',
        SuccessVerificationStatusLocator: '.bg-success-default',
        ActionPrimaryVerificationStatusLocator: '.bg-action-primary-default',
        ErrorVerificationStatusLocator: '.bg-error-bg',
        SubvalidationSuccessStatusLocator: '.fill-success-default',
        SubvalidationWarningStatusLocator: '.fill-warning-default-2',
        SubvalidationFailedWarningStatusLocator: 'ellipse.fill-neutral-1',
        SubvalidationErrorStatusLocator: '.fill-error-default',
        SubvalidationFailedErrorStatusLocator: 'svg.fill-neutral-1',
        SubvalidationUnableToDetectStatusLocator: 'svg[width="18"][height="18"]',
        
        // Validations types locators
        ComplianceLocator: '"Compliance"',
        SSLCertificateLocator: '"SSL Certificate"',
        LegalNecessitiesLocator: '"Legal Necessities"',
        CustomerExperienceLocator: '"Customer Experience"',
        WebsiteLayoutLocator: '"Website layout"',
        ContactFormLocator: '"Contact form"',
        ContentDisplayOnSocialLocator: '"Content display on social"',
        ECommerceLocator: '"E-Commerce"',
        ConfirmationEmailsLocator: '"Confirmation emails"',
        MobileAccessibilityLocator: '"Mobile accessibility"',
        DesktopAccessibilityLocator: '"Desktop accessibility"',
        ShoppingCartLocator: '"Shopping cart"',
        AboutUsLocator: '"About us"',
        SiteSpeedLocator: '"Site Speed"',
        MobileSiteSpeedLocator: '"Mobile site speed"',
        DesktopSiteSpeedLocator: '"Desktop site speed"',
        VisibilityLocator: '"Visibility"',
        BrokenLinksLocator: '"Broken links"',
        SitemapLocator: '"Sitemap"',
        GoogleBusinessProfileLocator: '"Google Business Profile"',
        SearchRankingLocator: '"Search ranking"',
        SocialMediaLocator: '"Social Media"',
        InstagramLocator: '"Instagram"',
        TwitterLocator: '"Twitter"',
        FacebookLocator: '"Facebook"',
    }

    CheckableResultsWidgets = {
        Compliance: this.page.locator(`:nth-match(${this.Locators.CheckableResultsWidgetsLocator}, 1)`),
        CustomerExperience: this.page.locator(`:nth-match(${this.Locators.CheckableResultsWidgetsLocator}, 2)`),
        SiteSpeed: this.page.locator(`:nth-match(${this.Locators.CheckableResultsWidgetsLocator}, 3)`),
        Visibility: this.page.locator(`:nth-match(${this.Locators.CheckableResultsWidgetsLocator}, 4)`),
        SocialMedia: this.page.locator(`:nth-match(${this.Locators.CheckableResultsWidgetsLocator}, 5)`),
    };

    ComplianceWidgets = {
        SSLCertificate: this.CheckableResultsWidgets.Compliance.locator(':nth-match(li, 1)'),
        LegalNecessities: this.CheckableResultsWidgets.Compliance.locator(':nth-match(li, 2)'),
    }

    CustomerExperienceWidgets = {
        WebsiteLayout: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 1)'),
        ContactForm: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 2)'),
        ContentDisplayOnSocial: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 3)'),
        ECommerce: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 4)'),
        ConfirmationEmails: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 5)'),
        MobileAccessibility: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 6)'),
        DesktopAccessibility: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 7)'),
        ShoppingCart: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 8)'),
        AboutUs: this.CheckableResultsWidgets.CustomerExperience.locator(':nth-match(li, 9)'),
    }

    SiteSpeedWidgets = {
        MobileSiteSpeed: this.CheckableResultsWidgets.SiteSpeed.locator(':nth-match(li, 1)'),
        DesktopSiteSpeed: this.CheckableResultsWidgets.SiteSpeed.locator(':nth-match(li, 2)'),
    }

    VisibilityWidgets = {
        BrokenLinks: this.CheckableResultsWidgets.Visibility.locator(':nth-match(li, 1)'),
        Sitemap: this.CheckableResultsWidgets.Visibility.locator(':nth-match(li, 2)'),
        GoogleBusinessProfile: this.CheckableResultsWidgets.Visibility.locator(':nth-match(li, 3)'),
        SearchRanking: this.CheckableResultsWidgets.Visibility.locator(':nth-match(li, 4)'),
    }

    SocialMediaWidgets = {
        Instagram: this.CheckableResultsWidgets.SocialMedia.locator(':nth-match(li, 1)'),
        Twitter: this.CheckableResultsWidgets.SocialMedia.locator(':nth-match(li, 2)'),
        Facebook: this.CheckableResultsWidgets.SocialMedia.locator(':nth-match(li, 3)'),
    }

    constructor(page, locator = pageLocator){
        super(page, locator);
    }
}