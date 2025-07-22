describe('Login Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('should find the correct workshop card and click it', () => {
    cy.visit('https://chitti.app/workshops/');

    // Step 1: Filter and store the workshop card
    cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
      .filter((index, el) => {
        const text = el.innerText;
        return (
          text.includes('Solar Powered Car Workshop, Future School') &&
          text.includes('$9') &&
          text.includes('English') &&
          text.includes('Sunday, July 27, 2025') &&
          text.includes('09:00 AM CST')
        );
      })
      .first()
      .as('solarCard');

    // Step 2: Scroll to and click it
    cy.get('@solarCard')
      .should('be.visible')
      .scrollIntoView({ duration: 1500 })
      .click();
      cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });

    // Alternatively click on the image directly (only if needed)
    // cy.get('img[alt="Solar Powered Car Workshop, Future School"][src*="solar-car-poster.jpeg"]').click({force:true});

    
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
    cy.get('select.block').eq(0).select('Class 10');
    cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
    cy.contains('span', '03:00 PM').click({ force: true });
    cy.contains('p', 'Register').click();
    // cy.origin('https://checkout.dodopayments.com', () => {
    //   cy.contains('span', 'Pay $9.00').click({ force: true });
    });
  });