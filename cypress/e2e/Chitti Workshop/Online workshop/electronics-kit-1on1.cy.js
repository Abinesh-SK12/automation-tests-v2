describe('Online workshops', () => {
    it("Electronics 1 on 1", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://chitti.app/electronics-kit-1on1/?utm_source=wl')
        cy.viewport('macbook-16')
        cy.scrollTo(0, 500);
        cy.wait(500);
        cy.scrollTo(0, 1000);
        cy.wait(500);
        cy.scrollTo('bottom');
        cy.wait(4000);
        // cy.get('button.xl\\:py-3').then(($buttons) => {
        //     if ($buttons.length > 3) {
        //       cy.wrap($buttons.eq(3)).click();
        //     }
        //   });
        cy.wait(4000);
        cy.contains(" Book Now for ₹299 ").click({ force: true })
        cy.wait(6000);
        cy.get('[placeholder="Enter the Name"]').type('Jacob Samro')
        cy.wait(2000);
        cy.get('.iti__selected-flag').click();
        cy.get('.iti__country-list')
            .contains('+1')
            .click();
        cy.get('.iti__selected-flag').click();
        cy.get('.iti__country-list')
            .contains('+91')
            .click();
        cy.get('input[placeholder="Enter the Mobile Number"]').type('9884226399')
        cy.wait(2000);
        cy.get('input[placeholder="Enter the Email"]').type('dev@lmes.in')
        cy.get('select')
            .select('Grade 6')
            .should('have.value', '6')
        cy.wait(2000);
        cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai')
        cy.get('input[placeholder="Enter your City"]').type('Chennai')
        cy.wait(2000);
        cy.get('input[placeholder="Enter your Pincode"]').type('600117')
        // cy.get('select').select('Class 3');
        cy.wait(4000);
        cy.contains('button', 'Register').click();
        
        cy.wait(10000);
        cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
        cy.wait(10000);
    });
});