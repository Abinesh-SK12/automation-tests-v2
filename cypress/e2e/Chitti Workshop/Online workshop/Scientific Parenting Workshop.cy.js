describe('Register Test', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('should register for the Scientific Parenting Workshop', () => {
        cy.visit('https://chitti.app/workshops/');
        cy.document().its('readyState').should('eq', 'complete');

        // cy.get('img[alt="Scientific Parenting Workshop"][src*="scientific-parenting_min.webp"]')
        //     .scrollIntoView({ duration: 1500 })
        //     .should('be.visible');

        cy.get('.group.rounded-xl').each(($el) => {
            const courseText = $el.text();
            if (
                courseText.includes('Scientific Parenting 1 on 1 - Tamil') &&
                courseText.includes('₹99') &&
                courseText.includes(' Tamil')
            ) {
                cy.wrap($el).as('matchingCourse');
            }
        }).then(() => {
            cy.get('.flex.flex-col.p-3.md\\:p-4.lg\\:p-6')
                .filter(':contains("Scientific Parenting 1 on 1 - Tamil")')
                .filter(':contains("₹99")').scrollIntoView({ duration: 1500 })
            .should('be.visible')
                .click();
        });

        // cy.document().its('readyState').should('eq', 'complete');
        cy.wait(5000);
        cy.contains('div' , ' Book Now for ').click({force: true });


        cy.wait(5000);

        cy.get('input[placeholder="Enter Name"]')
            .should('be.visible')
            .type('Jacob samro', { delay: 20 });

        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list')
            .contains('li', 'United States')
            .click({ force: true });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__flag-container')
            .contains('li', 'India')
            .click({ force: true });
        cy.get('input[type="tel"]')
            .should('be.visible')
            .type('9884226399', { delay: 20 });

        cy.get('input[type="email"]')
            .should('be.visible')
            .type('dev@lmes.in', { delay: 20 });

        cy.get('select.block.rounded-\\[14px\\]')
            .select('Class 8');

        cy.get('p.flex.justify-center.items-center.text-sm.font-bold.text-white').scrollIntoView({ duration: 1500 })
            .should('be.visible').click({ force: true });


        // cy.get('iframe[src*="api.razorpay.com"]', { timeout: 20000 })
        //     .should("be.visible");
    });
});