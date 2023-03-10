import {Page} from '@playwright/test';
import {BaseAdminPage} from './BaseAdminPage';
import {AdminHeaderMenu} from '../Components/AdminHeaderMenu';
import {AdminSideMenu} from '../Components/AdminSideMenu';
import {Dashboard} from '../Components/Dashboard/Dashboard';
import {Notifications} from '../Components/Notifications/Notifications';
import {ServersList} from '../Components/Mailstores/ServersList';
import {DomainsSideMenu} from '../Components/Domains/DomainsSideMenu';
import {DomainsDetailsTheme} from '../Components/Domains/DomainsDetailsTheme';
import {DomainsGlobalTheme} from '../Components/Domains/DomainsGlobalTheme';
import {ResetModal} from '../Components/Modals/ResetModal';

export class AdminPageManager {
  page: Page;
  baseAdminPage;
  adminHeaderMenu;
  adminSideMenu;
  dashboard;
  notifications;
  serversList;
  domainsSideMenu;
  domainsDetailsTheme;
  domainsGlobalTheme;
  resetModal;

  constructor(page) {
    this.page = page;
    this.baseAdminPage = new BaseAdminPage(page);
    this.adminHeaderMenu = new AdminHeaderMenu(page);
    this.adminSideMenu = new AdminSideMenu(page);
    this.dashboard = new Dashboard(page);
    this.notifications = new Notifications(page);
    this.serversList = new ServersList(page);
    this.domainsSideMenu = new DomainsSideMenu(page);
    this.domainsDetailsTheme = new DomainsDetailsTheme(page);
    this.resetModal = new ResetModal(page);
    this.domainsGlobalTheme = new DomainsGlobalTheme(page);
  };
};
