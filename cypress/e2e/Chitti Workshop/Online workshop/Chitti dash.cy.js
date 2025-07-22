describe('Redirecting on same tab Test', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('Redirecting on same tab', () => {

        cy.visit('https://dash.internal.chitti.xyz/');
        cy.viewport('macbook-16');
        cy.get('input[type="text"]').type('dev@lmes.in', { delay: 50 });
        cy.get('input[type="password"]').type('dashboard@1234', { delay: 50 });
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
        cy.wait(5000);
        cy.contains('button', 'Workshops').click({ force: true });
        cy.get('a[data-sidebar="menu-sub-button"] span.text-sidebar-foreground\\/80').eq(1).click({ multiple: true, force: true });
        cy.get('.overflow-x-auto.w-full').scrollTo(500, 0);
        cy.get('button[aria-haspopup="menu"]').eq(2).should('exist').click({ multiple: true, force: true });

        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            });
        });
        cy.contains('View Registrations').click();
        cy.url().should('include', 'https://dash.internal.chitti.xyz/platform/workshops/workshop/1283/v3/registrations/0?type=workshop&paymentStatus=success');





    })
})