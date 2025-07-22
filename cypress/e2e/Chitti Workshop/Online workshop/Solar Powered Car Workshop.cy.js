describe('Register Test', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('should log in with valid credentials', () => {
        cy.visit('https://chitti.app/workshops/');
        cy.document().its('readyState').should('eq', 'complete');

        cy.get('img[alt="Solar Powered Car Workshop"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/103c9430-501b-11f0-9323-1b92fee4c782_solar-car-poster.jpeg"]')
            .scrollIntoView({ duration: 1500 })
            .should('be.visible');

        cy.document().its('readyState').should('eq', 'complete');

        cy.contains('h1', 'Solar Powered Car Workshop')
            .should('exist')
            .then(($heading) => {
                cy.wrap($heading)
                    .parent()
                    .within(() => {
                        cy.contains('499')
                            .should('exist');
                    });
            });

        cy.contains('h1', 'Solar Powered Car Workshop')
            .should('exist')
            .click({ force: true });
        cy.wait(5000);    
        cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });

        cy.wait(5000);

        cy.get('input[placeholder="Enter the Name"]').type('Jacob samro', { delay: 20 });

        cy.get('input[placeholder="Enter the Email"]').type('dev@lmes.in', { delay: 20 });

        cy.get('.iti__flag-container').click();
        cy.get('.iti__country-list')
            .contains('li', 'United States')
            .click({ force: true });

        cy.get('.iti__flag-container').click();
        cy.get('.iti__flag-container')
            .contains('li', 'India')
            .click({ force: true });

        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });

        cy.get('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer')
            .select('Grade 8');

        cy.contains('button', 'Register').click();

        cy.document().its('readyState').should('eq', 'complete');

        cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
    });

});