const { baseUrl, username, password } = Cypress.env();
const {
    mailSelector,
    calendarSelector,
    contactsSelector,
    searchSelector,
    settingsSelector,
    inboxSelector,
    trashSelector,
    spamSelector,
    sentSelector,
    draftSelector
} = require('../../../fixtures/dexters/selectors');

describe('VMs test', () => {
    beforeEach(() => {
        cy.visit('/static/login').as('getLoginPage');
        cy.get('#input-0').type(username);
        cy.get('#password-0').type(password);
        cy.get('[role=button]').click();
    });

    describe('app view', () => {
        it('log in successfully', () => {
            cy.url().should('contain', '/carbonio');
            cy.url().should('eq', `${baseUrl}/carbonio/mails/folder/2`);
        })
        describe('it renders primary bar', () => {
            it('renders all the Dexter apps', () => {
                cy.get(mailSelector).should('be.visible')
                cy.get(calendarSelector).should('be.visible')
                cy.get(contactsSelector).should('be.visible')
                cy.get(searchSelector).should('be.visible')
                cy.get(settingsSelector).should('be.visible')
            })
            it('mail module is selected', () => {
                cy.get(mailSelector)
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer').should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')
                .should('have.css', 'display', 'block')
                .should('have.css', 'color', 'rgb(43, 115, 210)')
            })
            it('all other modules are not selected', () => {
                cy.get(calendarSelector).should('be.visible').should('have.css', 'color', 'rgb(51, 51, 51)')
                cy.get(contactsSelector).should('be.visible').should('have.css', 'color', 'rgb(51, 51, 51)')
                cy.get(searchSelector).should('be.visible').should('have.css', 'color', 'rgb(51, 51, 51)')
                cy.get(settingsSelector).should('be.visible').should('have.css', 'color', 'rgb(51, 51, 51)')
            })
        });

        describe('it renders secondary bar', () => {
            it('renders all the system folders', () => {
                expect(cy.get(inboxSelector)).to.exist;
                expect(cy.get(trashSelector)).to.exist;
                expect(cy.get(spamSelector)).to.exist;
                expect(cy.get(sentSelector)).to.exist;
                expect(cy.get(draftSelector)).to.exist;
                expect(cy.get('[data-testid="share-label"]')).to.exist;
                expect(cy.get('[data-testid="find-shares-button"]')).to.exist;
                cy.get('[data-testid="find-shares-button"]').should('not.be.visible')
            })
        });
    });


})