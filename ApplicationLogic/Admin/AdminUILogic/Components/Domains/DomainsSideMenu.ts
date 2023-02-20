import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class DomainsSideMenu extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[key="domains"]'),
    DropdownContainer: this.page.locator(this.InheritedFields.DropdownContainerLocator),
  };

  Elements = {
    Sections: {
      Global: this.Containers.MainContainer.locator('_react=[title="Global"] >> nth=0'),
      Domains: this.Containers.MainContainer.locator('_react=[label="Type here a domain"]'),
      Details: this.Containers.MainContainer.locator('_react=[title="Details"] >> nth=0'),
      Manage: this.Containers.MainContainer.locator('_react=[title="Manage"] >> nth=0'),
    },
    Global: {
      Theme: this.Containers.MainContainer.locator('_react=[key="global/theme"]'),
    },
    Domains: {
      Textboxes: {
        TypeHereADomain: this.Containers.MainContainer.locator('[name="Type here a domain"]'),
      },
      Buttons: {
        ShowDomains: this.Containers.MainContainer.locator('[data-testid$="GlobeOutline"]'),
      },
      DomainInDropdown: this.Containers.DropdownContainer.locator('[class*="domain-list-panel"]'),
    },
    Details: {
      GeneralSettings: this.Containers.MainContainer.locator('"General Settings"'),
      GAL: this.Containers.MainContainer.locator('"GAL"'),
      Authentication: this.Containers.MainContainer.locator('"Authentication"'),
      VirtualHostsAndCertificate: this.Containers.MainContainer.locator('"Virtual Hosts & Certificate"'),
      MailboxQuota: this.Containers.MainContainer.locator('"Mailbox Quota"'),
      Theme: this.Containers.MainContainer.locator('_react=[key="theme"]'),
    },
    Manage: {
      Accounts: this.Containers.MainContainer.locator('"Accounts"'),
      MailingList: this.Containers.MainContainer.locator('"Mailing List"'),
      Resources: this.Containers.MainContainer.locator('"Resources"'),
      ActiveSync: this.Containers.MainContainer.locator('"ActiveSync"'),
      RestoreAccount: this.Containers.MainContainer.locator('"Restore Account"'),
    },
  };

  async SelectDomain(domain) {
    await this.Elements.Domains.Buttons.ShowDomains.click();
    await this.Elements.Domains.DomainInDropdown.locator(`"${domain}"`).click();
  };
};
