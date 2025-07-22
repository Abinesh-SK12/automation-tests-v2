describe('Register Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('should log in with valid credentials and check hover effect', () => {
        cy.visit('https://chitti.app/workshops/');
        cy.document().its('readyState').should('eq', 'complete'); 

        cy.get('button.flex.items-center.justify-center.w-full').eq(1).click({ force: true });
        cy.document().its('readyState').should('eq', 'complete');

        cy.get('button.flex.items-center.justify-center.w-full').eq(0).click({ force: true });
        cy.contains('div', '© 2024 LMES Academy Pvt. Ltd. All rights reserved.')
            .scrollIntoView({ duration: 5000 })
            .should('exist');
        cy.scrollTo('top', { duration: 5000 });

        cy.get('a.group').each(($el) => {
            cy.wrap($el).scrollIntoView().realHover();
            cy.wait(500);
            cy.wrap($el)
                .find('img.transition-transform')
                .should('be.visible')
                .invoke('css', 'transform')
                .should((transform) => {
                    expect(transform).to.not.eq('none');
                });
        });

        cy.scrollTo('top', { duration: 5000 });
        cy.contains('span', 'Tamil workshops').should('exist');
        cy.contains('span', 'English workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Malayalam workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Telugu workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Kannada workshops').scrollIntoView({ duration: 3000 }).should('exist');

        cy.get('a[href="/about"]').eq(1).scrollIntoView({ duration: 3000 });
        cy.get('a[href="/about"]').eq(0).click({ force: true });

        cy.contains('div', 'Careers').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('div', 'Careers').eq(0).click({ force: true });

        cy.get('a[href="/policies/terms"]').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/terms"]').eq(0).click({ force: true });

        cy.get('a[href="/policies/privacy"]').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/privacy"]').eq(0).click({ force: true });

        cy.get('a[href="/policies/refund"]').scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/refund"]').click({ force: true });

        cy.get('a[href="/policies/disclaimer"]').scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/disclaimer"]').click({ force: true });

        cy.contains('div', 'FAQ’s').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('div', 'Impacted the lives of').should('exist');
        cy.contains('div', '2Million People').should('exist');
        cy.contains('div', ' Google Reviews ').should('exist');

        cy.scrollTo('top', { duration: 3000 });

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.document().its('readyState').should('eq', 'complete');
        cy.get('a[href="/"]').eq(2).contains('Home').click();
        cy.wait(5000);
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/products"]', { timeout: 10000 }).click({ multiple: true, force: true });
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/support"]').eq(1).click({ force: true });
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/workshops"]', { timeout: 10000 }).eq(0).click({ multiple: true, force: true });

        cy.document().its('readyState').should('eq', 'complete');
    });
});