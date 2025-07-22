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
                    text.includes('CMS Electronics 1 on 1 - Malayalam') &&
                    text.includes('₹299') &&
                    text.includes('Malayalam')
                );
            })
            .first()
            .as('CMS2');
        cy.get('@CMS2')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();
        cy.wait(5000);
        cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });
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
        cy.get('select.block').eq(0).select('Grade 8');
        cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai')
        cy.get('input[placeholder="Enter your City"]').type('Chennai')
        cy.wait(2000);
        cy.get('input[placeholder="Enter your Pincode"]').type('600117')
        cy.wait(4000);
        cy.contains('button', 'Register').click();
        cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
        });


    });