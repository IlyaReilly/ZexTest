import {BasePage} from './BasePage';
import { pageManager } from '../../../TestsLogic/UITests/BaseTest';

const pageLocator: string = '.border-success-default';

export class DAPPage extends BasePage {

    readonly searchTextBox;

    Locators = {

        WidgetsCursorPointerLocator: '.cursor-pointer >> nth=1',

        // Widgets locators
        CompletedWidgetsLocator: '.border-success-default',
        EasyBusinessWinszWidgetsLocator: '.border-error-default',
        BusinessEssentialsWidgetsLocator: '.border-info-default',
        LongTermGoalsWidgetsLocator: '.border-purple-200',
        LoadMoreDropdown: '"Load more" >> nth=1',
        SeeLessDropdown: '"See less"',

        //Statuses = SubValidations AND Status descriprion
        StatusSuccessLocator: '.fill-success-default',
        StatusSuccessDescriptionLocator: '.text-success-default',
        StatusWarningLocator: '.fill-warning-default',
        StatusWarningDescriptionLocator: '.text-warning-default',
        StatusErrorLocator: '.border-error-default',
        StatusErrorDescriptionLocator: '.text-error-default',
        StatusNeutralLocator: '.border-neutral-black',
        StatusNeutralDescriptionLocator: '.text-neutral-black',

        // Validations types locators
        CompletedLocator: '"Completed"',
        SSLCertificateLocator: '"SSL Certificate"',
        ContactFormLocator: '"Contact form"',
        LegalNecessitiesLocator: '"Legal Necessities"',
        MobileAccessibilityLocator: '"Mobile accessibility"',
        DesktopAccessibilityLocator: '"Desktop accessibility"',
        AboutUsLocator: '"About us"',
        SitemapLocator: '"Sitemap"',
        MobileSiteSpeedLocator: '"Mobile site speed"',
        WebsiteLayoutLocator: '"Website layout"',
        BrokenLinksLocator: '"Broken links"',
        EasyBusinessWinszLocator: '"Easy business winsz"',
        GoogleBusinessProfileLocator: '"Google Business Profile"',
        ConfirmationEmailsLocator: '"Confirmation emails"',
        BusinessEssentialsLocator: '"Business essentials"',
        FacebookLocator: '"Facebook"',
        TwitterLocator: '"Twitter"',
        LongTermGoalsLocator: '"Long-term goals"',
        DesktopSiteSpeedLocator: '"Desktop site speed"',
        SearchRankingLocator: '"Search ranking"',
    }

    Widgets = {
        Completed: this.page.locator(this.Locators.CompletedWidgetsLocator),
        EasyBusinessWinsz: this.page.locator(this.Locators.EasyBusinessWinszWidgetsLocator),
        BusinessEssentials: this.page.locator(this.Locators.BusinessEssentialsWidgetsLocator),
        LongTermGoals: this.page.locator(this.Locators.LongTermGoalsWidgetsLocator),
    };

    CompletedWidget = {
        SSLCertificate: this.Widgets.Completed.locator('tr >> nth=5'),
        ContactForm: this.Widgets.Completed.locator('tr >> nth=6'),
        LegalNecessities: this.Widgets.Completed.locator('tr >> nth=7'),
        MobileAccessibility: this.Widgets.Completed.locator('tr >> nth=8'),
        DesktopAccessibility: this.Widgets.Completed.locator('tr >> nth=9'),
        AboutUs: this.Widgets.Completed.locator('tr >> nth=10'),
        Sitemap: this.Widgets.Completed.locator('tr >> nth=11'),
        MobileSiteSpeed: this.Widgets.Completed.locator('tr >> nth=12'),
        WebsiteLayout: this.Widgets.Completed.locator('tr >> nth=13'),
        BrokenLinks: this.Widgets.Completed.locator('tr >> nth=14'),
        DownloadCompletedReport: this.Widgets.Completed.locator('"Download completed report"'),
    }

    EasyBusinessWinszWidget = {
        GoogleBusinessProfile: this.Widgets.EasyBusinessWinsz.locator('tr >> nth=4'),
        ConfirmationEmails: this.Widgets.EasyBusinessWinsz.locator('tr >> nth=5'),
    }

    BusinessEssentialsWidget = {
        Facebook: this.Widgets.BusinessEssentials.locator('tr >> nth=4'),
        Twitter: this.Widgets.BusinessEssentials.locator('tr >> nth=5'),
    }

    LongTermGoalsWidget = {
        DesktopSiteSpeed: this.Widgets.LongTermGoals.locator('tr >> nth=4'),
        SearchRanking: this.Widgets.LongTermGoals.locator('tr >> nth=5'),
    }

    constructor(page, locator = pageLocator){
        super(page, locator);
    }
}