describe('Register Test', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('should log in with valid credentials', () => {
    cy.visit('https://chitti.app/workshops/');
     cy.get('img[alt="Teacher Empowerment Workshop"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/da075b90-f906-11ef-9d71-37b1e4cedfc6_WhatsApp-Image-2025-03-04-at-6.56.32-PM.jpeg"]')
      .scrollIntoView({duration: 1500})
      .should('be.visible');
    cy.wait(2000);
    cy.contains('h1', 'Teacher Empowerment Workshop')
      .should('exist')
      .then(($heading) => {
        cy.wrap($heading)
          .parent()
          .within(() => {
            cy.contains('₹9')
              .should('exist');
          });
      });

    cy.contains('div', '₹9').should('exist');

    cy.contains('h1', 'Teacher Empowerment Workshop')
      .should('exist')
      .click({ force: true });

    cy.wait(2000);

    cy.contains('div', 'Book Now for ₹9')
      .should('exist')
      .click({ force: true });

    cy.wait(2000);

    cy.get('input[placeholder="Enter Name"]').type('Jacob samro',{ delay: 20 });
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
      .select('College Student');
    
    cy.contains('span','11:00 AM').click({ force: true });
    cy.contains('button', 'Register').click();  
    cy.wait(10000);
    cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
    cy.wait(10000);
    

    
  });

});