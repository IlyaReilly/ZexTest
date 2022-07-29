import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';

test.describe('Contacts tests', async () => {
  let page: Page;
  let firstName;
  let lastName;
  let email;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryContactsMenu;
  let newContact;
  let contacts;


  
  let randomName = function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newContact = await pageManager.getNewContactComponent(page);
    sideSecondaryContactsMenu = await pageManager.getSideSecondaryContactsMenuComponent(page);
    contacts = await pageManager.getContactsComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    firstName = randomName() + 'First Name';
    lastName = randomName() + 'Last Name';
    email = randomName() + '@test.com';
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Open contacts tab. Contacts folder options should be visible', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await expect(sideSecondaryContactsMenu.Options.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(sideSecondaryContactsMenu.Options.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(sideSecondaryContactsMenu.Options.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('Add new contact. New contact appears in contacts chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await headerMenu.Buttons.NewItem.click();
    await newContact.CreateNewContact(firstName, lastName, email);
    await expect(contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
  });

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({}) => {
    await 
  })

  test.only('Delete contact. Contact appears in trash chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await headerMenu.Buttons.NewItem.click();
    await newContact.CreateNewContact(firstName, lastName, email);
    await page.click(contacts.Containers.ContactsContainer.locator(`"${email}"`));
  })

});