describe('learn Testing', () => {
  it('Learning', () => {
    cy.visit('https://example.cypress.io/');
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('.dropdown-toggle').click();
    cy.get('li:nth-child(1) > a[href="/commands/querying"]').first().click();
    cy.document().its('readyState').should('eq', 'complete');
    cy.go('back');
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('.dropdown-toggle').click();
    cy.get('li:nth-child(1) > a[href="/commands/querying"]').first().click();
    cy.get('#contains').scrollIntoView().should('be.visible');
    cy.get('button.btn.btn-default').click();
    cy.get('.query-list').contains('bananas').should('have.class', 'third');
    cy.get('#querying').contains('ul', 'oranges').should('have.class', 'query-list');
    cy.get('.query-form').within(() => {
    cy.get('input:first').should('have.attr', 'placeholder', 'Email');
    cy.get('input:last').should('have.attr', 'placeholder', 'Password');
    cy.get('.form-control').eq(0).type('Abinesh');
    cy.get('#inputEmail').type('siva1213abinesh@gmail.com');
    cy.get('#inputPassword').type('Abin@1221');
    });
  });
});