// describe('Login Test', () => {

//   beforeEach(() => {
//     Cypress.on('uncaught:exception', (err, runnable) => {
//       return false;
//     });
//   });

//   it('should log in with valid credentials', () => {
//     cy.visit('https://chitti.app/workshops/');

//     cy.get('img[alt="CA Road Map"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/26f5b1f0-25c0-11f0-90c4-0b2e1f25bbb0_ca-roadmap-thumbnail.jpeg"]')
//       .scrollIntoView({duration: 1500})
//       .should('be.visible');

//     cy.wait(2000);

//     cy.contains('h1', 'CA Road Map')
//       .should('exist')
//       .then(($heading) => {
//         cy.wrap($heading)
//           .parent()
//           .within(() => {
//             cy.contains('Free')
//               .should('exist');
//           });
//       });

//     cy.contains('div', 'Free').should('exist');

//     cy.contains('h1', 'CA Road Map')
//       .should('exist')
//       .click({ force: true });

//     cy.wait(2000);

//     cy.contains('span', ' Register Now for Free ')
//       .should('exist')
//       .click({ force: true });

//     cy.wait(2000);

//     cy.get('input[type="text"]').type('Jacob');
//     cy.wait(2000);

//     // Select United States
//     cy.get('.iti__flag-container').click();
//     cy.wait(2000);
//     cy.get('.iti__country-list')
//       .contains('li', 'United States')
//       .click({ force: true });

//     cy.wait(2000);

//     // Switch to India
//     cy.get('.iti__flag-container').click();
//     cy.wait(2000);
//     cy.get('.iti__flag-container')
//       .contains('li', 'India')
//       .click({ force: true });

//     cy.wait(2000);

//     cy.get('input[type="tel"]').type('9884226399');
//     cy.wait(2000);

//     cy.get('input[type="email"]').type('dev@lmes.in');

//     cy.get('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer')
//       .select('Repeater');

//     cy.get('.flex.font-normal').click({ force: true });
//     cy.get('.flex.justify-center.items-center.text-sm.font-bold.text-white')
//       .click({ force: true });

//     cy.contains('div', ' Registration Successful ')
//       .should('exist');
//   });

// });