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
                    text.includes('Aeromodelling Program') &&
                    text.includes('Free') &&
                    text.includes('English') &&
                    text.includes('Sunday, July 27, 2025') &&
                    text.includes('Grade 1 to 4') &&
                    text.includes('10:30 AM EST')
                );
            })
            .first()
            .as('US01');
        cy.get('@US01')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();
        cy.wait(5000);
        cy.contains('button', 'Register Now').scrollIntoView({ duration: 1500 })
            .click({ force: true, multiple: true });
        cy.wait(5000);
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
        cy.get('select.block').eq(0).select('Class 8');
        cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
        cy.contains('span', '12:30 PM').click({ force: true });
        cy.contains('p', 'Register').click();
        cy.contains('div', ' Registration Successful ').should('exist');
    });
});