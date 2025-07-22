describe('Login Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
    });

    it('should find the correct workshop card and click it', () => {
        cy.visit('https://chitti.app/workshops/');
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
            .filter((index, el) => {
                const text = el.innerText;
                return (
                    text.includes('NEET JEE One on One') &&
                    text.includes('₹99') &&
                    text.includes('Tamil')

                );
            })
            .first()
            .as('NEET JEE');

        // Step 2: Scroll to and click it
        cy.get('@NEET JEE')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();


        // Alternatively click on the image directly (only if needed)
        // cy.get('img[alt="Solar Powered Car Workshop, Future School"][src*="solar-car-poster.jpeg"]').click({force:true});
        cy.get('span.text-base.font-bold.leading-6.text-white')
            .click({ force: true, multiple: true });

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
        cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
        cy.get('select.block').eq(0).select('Grade 10');

        cy.contains('p', 'Register').click();
        cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
    });
});
