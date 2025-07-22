describe('Register Test', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('should log in with valid credentials', () => {
    cy.visit('https://chitti.app/workshops/');

    cy.get('img[alt="Solar 1 on 1 - Tamil"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/a75cd850-2f34-11f0-a14c-439ad8380d08_1000097400.jpg"]')
      .scrollIntoView({duration: 1500})
      .should('be.visible');

    cy.wait(2000);

    cy.contains('h1', 'Solar 1 on 1 - Tamil')
      .should('exist')
      .then(($heading) => {
        cy.wrap($heading)
          .parent()
          .within(() => {
            cy.contains('499')
              .should('exist');
          });
      });

    cy.contains('div', ' ₹499').should('exist');

    cy.contains('h1', 'Solar 1 on 1 - Tamil')
      .should('exist')
      .click({ force: true });

    cy.wait(2000);

    cy.contains('div', ' Book Now for ₹499 ')
      .should('exist')
      .click({ force: true });

    cy.wait(2000);

    cy.get('input[placeholder="Enter the Name"]').type('Jacob samro',{ delay: 20 });
    cy.wait(2000);

    
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

    cy.wait(1000);

    cy.get('input[type="tel"]').type('9884226399',{ delay: 20 });
    cy.wait(1000);

    cy.get('input[type="email"]').type('dev@lmes.in',{ delay: 20 });

    cy.get('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer')
      .select('Grade 8');

    cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai',{ delay: 10 });
      cy.wait(1000);
    cy.get('input[placeholder="Enter your City"]').type('Chennai',{ delay: 20 });
    cy.wait(1000);
    cy.get('input[placeholder="Enter your Pincode"]').type('600117',{ delay: 20 });
    cy.wait(1000);
    cy.contains('button', 'Register').click();  
    cy.wait(10000);
    cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
    cy.wait(10000);
    
    

    

    
  });

});