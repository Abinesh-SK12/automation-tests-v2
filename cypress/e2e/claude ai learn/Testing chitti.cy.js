describe('TestFlow Generated Test', () => {
it('should execute test steps', () => {
// Unknown command: // Complete Element Verification Test for Chitti Workshops Page
cy.visit('https://chitti.app/workshops/');
cy.wait(3000);
cy.screenshot('page-loaded');
// Unknown command: // === HEADER SECTION VERIFICATION ===
cy.contains('Your Company').should('exist');
cy.contains('Sign up').should('exist');
cy.contains('Open main menu').should('exist');
// Unknown command: // === MAIN NAVIGATION LINKS ===
cy.contains('Home').should('exist');
cy.contains('Products').should('exist');
cy.contains('Support').should('exist');
cy.contains('About').should('exist');
cy.contains('Workshops').should('exist');
cy.contains('Get App').should('exist');
cy.contains('Log in').should('exist');
cy.contains('Sign up').should('exist');
// Unknown command: // === WORKSHOP CATEGORIES ===
cy.contains('Online workshops').should('exist');
cy.contains('Offline workshops').should('exist');
cy.contains('Tamil workshops').should('exist');
cy.contains('English workshops').should('exist');
cy.contains('Malayalam workshops').should('exist');
cy.contains('Telugu workshops').should('exist');
cy.contains('Kannada workshops').should('exist');
// Unknown command: // === MAIN BRAND SECTION ===
cy.contains('CHITTI').should('exist');
cy.contains('an initiative by').should('exist');
cy.contains('Making the world a better place through constructing elegant hierarchies.').should('exist');
// Unknown command: // === COMPANY ADDRESS ===
cy.contains('REGISTERED ADDRESS').should('exist');
cy.contains('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai, Tamil Nadu 600117').should('exist');
// Unknown command: // === PRODUCT LINKS ===
cy.contains('Our Products').should('exist');
cy.contains('Chitti Maker School').should('exist');
cy.contains('Chitti Powered School').should('exist');
cy.contains('Chitti NEET JEE').should('exist');
// Unknown command: // === COMPANY SECTION ===
cy.contains('Company').should('exist');
cy.contains('About').should('exist');
cy.contains('Careers').should('exist');
cy.contains('We are Hiring').should('exist');
cy.contains('Terms & Conditions').should('exist');
cy.contains('Privacy Policy').should('exist');
cy.contains('Refund & Cancellation Policy').should('exist');
cy.contains('Disclaimer').should('exist');
// Unknown command: VERIFY 'text=FAQ's' EXISTS
// Unknown command: // === CONTACT INFORMATION ===
cy.contains('Contact').should('exist');
cy.contains('Chitti Support').should('exist');
cy.contains('support@chitti.app').should('exist');
cy.contains('+91 988 422 2368').should('exist');
// Unknown command: // === KEY METRICS & ACHIEVEMENTS ===
cy.contains('Our workshops are live in the USA, UAE, Australia, and beyond.').should('exist');
cy.contains('Impacted the lives of').should('exist');
cy.contains('2Million People').should('exist');
cy.contains('Google Reviews').should('exist');
cy.contains('4.9').should('exist');
cy.contains('(15,000+)').should('exist');
// Unknown command: // === COPYRIGHT FOOTER ===
cy.contains('© 2024 LMES Academy Pvt. Ltd. All rights reserved.').should('exist');
// Unknown command: // === FINAL VERIFICATION SCREENSHOT ===
cy.screenshot('all-elements-verified');
// Unknown command: // === SCROLL TEST (to ensure full page loads) ===
cy.scrollTo('bottom');
cy.wait(1000);
cy.screenshot('page-bottom');
cy.scrollTo('top');
cy.wait(1000);
cy.screenshot('page-top');
});
});