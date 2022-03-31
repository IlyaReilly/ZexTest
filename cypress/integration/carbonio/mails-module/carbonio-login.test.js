const { baseUrl } = Cypress.env();
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

describe('Carbonio tests', () => {
    before(() => {
        cy.dexterLogin();
        cy.visit('/carbonio/');
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ZM_AUTH_TOKEN')
    });

    describe('it renders app correctly', () => {
        it('it renders default route', () => {
            cy.url().should('contain', '/carbonio');
            cy.url().should('eq', `${baseUrl}/carbonio/mails/folder/2`);
        });

        it('it renders apps in primary bar', () => {
            cy.get(mailSelector)
                .should('have.attr', 'data-isselected', 'true')
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer')
                .should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')

            cy.get(calendarSelector)
                .should('have.attr', 'data-isselected', 'false')
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer')
                .should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')

            cy.get(contactsSelector)
                .should('have.attr', 'data-isselected', 'false')
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer')
                .should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')

            cy.get(searchSelector).should('be.visible')
                .should('have.attr', 'data-isselected', 'false')
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer')
                .should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')

            cy.get(settingsSelector)
                .should('have.attr', 'data-isselected', 'false')
                .should('be.visible')
                .should('exist')
                .should('have.css', 'cursor', 'pointer')
                .should('have.css', 'width', '24px')
                .should('have.css', 'height', '24px')
        });

        it('it renders secondary bar with standard folders', () => {
            cy.get(inboxSelector).should('be.visible').should('exist');
            cy.get(trashSelector).should('be.visible').should('exist');
            cy.get(spamSelector).should('be.visible').should('exist');
            cy.get(sentSelector).should('be.visible').should('exist');
            cy.get(draftSelector).should('be.visible').should('exist');
            cy.get('[data-testid="share-label"]').should('exist');
            cy.get('[data-testid="find-shares-button"]').should('exist');
            cy.get('[data-testid="find-shares-button"]').should('not.be.visible');
        });

        it('it renders the inbox conversation or message list', () => {
            cy.get('[data-testid="list-wrapper"]').then((res) => {
                if (res.find('[data-testid="conversation-list-2"]').length > 0) {
                    cy.get('[data-testid="conversation-list-2"]')
                        .should('be.visible')
                        .should('exist')
                }
                else {
                    cy.get('[data-testid="message-list-2"]')
                        .should('be.visible')
                        .should('exist')
                }
            })
        });

        it('it renders the third panel with selection interactive', () => {
            cy.get('[data-testid="third-panel"]')
                .should('be.visible')
                .should('exist')
            cy.get('[data-testid="selection-interactive')
                .should('be.visible')
                .should('exist')
        });
    });
});