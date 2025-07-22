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
          text.includes('One on One Organic') &&
          text.includes('Free') &&
          text.includes('Tamil') 
          
        );
      })
      .first()
      .as('Organic');

    
    cy.get('@Organic')
      .should('be.visible')
      .scrollIntoView({ duration: 1500 })
      .click();
      cy.wait(5000);
       cy.contains('button', 'Book free Demo').first().click({ force: true });
       cy.wait(5000);
    //  cy.contains('button', 'Book free Demo').each(($btn, index) => {
//   if (index === 2) {
//     cy.wrap($btn).click({ force: true ,multiple:true});
//   }
// });


    
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
    cy.get('select.block').eq(0).select('Grade 8');
    cy.contains('p', 'Register').click();
    
    cy.contains('h1', ' Registration Successful ').should('exist');
    });
  });