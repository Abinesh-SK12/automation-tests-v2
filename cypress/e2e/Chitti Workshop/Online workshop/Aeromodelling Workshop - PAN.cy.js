describe('Login Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
    });
    it('should find the correct workshop card and click it', () => {
        cy.visit('https://chitti.app/workshops/');
        cy.get('img[alt="Aeromodelling Workshop - PAN"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/92e44090-2b7e-11ee-b400-23bd75814d96_aeromodelling-workshop-thumbnail-03.jpg"]')
            .first()
            .scrollIntoView({ duration: 1000 })
            .should('be.visible').click({ force: true });

        cy.wait(5000);
        cy.contains('button', ' Register Now for ').scrollIntoView({ duration: 1500 })
            .click({ force: true, multiple: true });
        cy.wait(5000);
        cy.get('input[type="text"]').type('Jacob Samro', { delay: 20 });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
        cy.wait(1000);
        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
        cy.wait(2000);
        cy.get('select.block').eq(0).select('Class 8');
        cy.contains('span', '10:00 AM').click({ force: true });
        cy.contains('p', 'Register').click();
        cy.contains('div', ' Registration Successful ').should('exist');
    });
});