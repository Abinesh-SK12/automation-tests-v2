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
                    text.includes('TEP 1 on 1 - Telugu') &&
                    text.includes('₹49') &&
                    text.includes('Telugu')
                );
            })
            .first()
            .as('CMS5');
        cy.get('@CMS5')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();
        cy.wait(5000);
        cy.contains('div',' Book Now for ₹49 ').click({ force: true });
        cy.wait(5000);
        cy.get('input[placeholder="Enter the Name"]').type('Jacob Samro', { delay: 20 });
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
        cy.get('select.block').eq(0).select('Working Professional');
        
        cy.contains('button', 'Register').click();
        cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
        });


    });
