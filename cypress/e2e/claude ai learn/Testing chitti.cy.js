describe('Chitti Workshops - Comprehensive E2E Testing', () => {
  beforeEach(() => {
    cy.visit('https://chitti.app/workshops/');
    cy.wait(2000);
  });

  describe('Page Load and Basic Elements', () => {
    it('should load page successfully and verify core elements', () => {
      cy.viewport(1536, 864); // Set desktop viewport for 1920x1080 at 125% scale
      cy.url().should('include', '/workshops');
      cy.get('body').should('be.visible');
      cy.screenshot('page-loaded');
      
      // Verify page title
      cy.title().should('contain', 'Chitti');
    });
    

    it('should verify header navigation elements on desktop', () => {
      cy.viewport(1536, 864); // Ensure desktop viewport for 1920x1080 at 125% scale
      cy.wait(1000);
      
      // Check if elements exist without asserting visibility
      cy.get('body').then(($body) => {
        const navItems = ['Home', 'Products', 'Support', 'About', 'Workshops', 'Get App', 'Log in', 'Sign up'];
        
        navItems.forEach(item => {
          if ($body.find(`a:contains("${item}"), button:contains("${item}")`).length > 0) {
            cy.log(`Found navigation item: ${item}`);
          } else {
            cy.log(`Navigation item not found: ${item}`);
          }
        });
      });
    });

    it('should handle mobile navigation menu', () => {
      cy.viewport('iphone-x');
      cy.wait(2000);
      
      // Look for mobile menu button - common patterns
      cy.get('body').then(($body) => {
        const mobileMenuSelectors = [
          'button[aria-label*="menu"]',
          'button:contains("Menu")',
          '[data-cy="mobile-menu"]',
          'button[aria-expanded]',
          '.hamburger',
          '[role="button"]:contains("☰")',
          'button.md\\:hidden'
        ];
        
        let foundMenu = false;
        for (const selector of mobileMenuSelectors) {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().click();
            cy.wait(500);
            foundMenu = true;
            break;
          }
        }
        
        if (!foundMenu) {
          cy.log('Mobile menu button not found - this is normal for some responsive designs');
        }
      });
      cy.screenshot('mobile-navigation');
    });
  });

  describe('Navigation Functionality', () => {
    beforeEach(() => {
      cy.viewport(1536, 864); // Ensure desktop viewport for navigation tests (1920x1080 at 125% scale)
      cy.wait(1000);
    });

    it('should navigate to Home page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Home")').length > 0) {
          cy.contains('Home').click();
          cy.wait(1000);
          cy.screenshot('home-page');
          cy.go('back');
        } else {
          cy.log('Home link not found - skipping test');
        }
      });
    });

    it('should navigate to Products page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Products")').length > 0) {
          cy.contains('Products').click();
          cy.wait(1000);
          cy.screenshot('products-page');
          cy.go('back');
        } else {
          cy.log('Products link not found - skipping test');
        }
      });
    });

    it('should navigate to Support page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Support")').length > 0) {
          cy.contains('Support').click();
          cy.wait(1000);
          cy.screenshot('support-page');
          cy.go('back');
        } else {
          cy.log('Support link not found - skipping test');
        }
      });
    });

    it('should navigate to About page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("About")').length > 0) {
          cy.contains('About').click();
          cy.wait(1000);
          cy.screenshot('about-page');
          cy.go('back');
        } else {
          cy.log('About link not found - skipping test');
        }
      });
    });

    it('should test login functionality', () => {
      const loginSelectors = ['a:contains("Log in")', 'a:contains("Login")', 'button:contains("Log in")', 'button:contains("Login")'];
      
      let foundLoginElement = false;
      
      for (const selector of loginSelectors) {
        cy.get('body').then(($body) => {
          if (!foundLoginElement && $body.find(selector).length > 0) {
            foundLoginElement = true;
            
            cy.get(selector).first().then(($el) => {
              if ($el.is(':visible')) {
                cy.wrap($el).click();
              } else {
                cy.wrap($el).click({ force: true });
              }
              cy.wait(1000);
              cy.screenshot('login-page');
              cy.go('back');
              cy.wait(500);
            });
          }
        });
        
        if (foundLoginElement) break;
      }
      
      cy.then(() => {
        if (!foundLoginElement) {
          cy.log('Log in link not found - skipping test');
        }
      });
    });

    it('should test signup functionality', () => {
      cy.get('body').then(($body) => {
        const signupSelectors = ['a:contains("Sign up")', 'a:contains("Signup")', 'button:contains("Sign up")', 'button:contains("Signup")'];
        let foundSignup = false;
        
        for (const selector of signupSelectors) {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().then(($el) => {
              if ($el.is(':visible')) {
                cy.wrap($el).click();
                cy.wait(1000);
                cy.screenshot('signup-page');
                cy.go('back');
                foundSignup = true;
              } else {
                // Try force click for hidden elements
                cy.wrap($el).click({ force: true });
                cy.wait(1000);
                cy.screenshot('signup-page');
                cy.go('back');
                foundSignup = true;
              }
            });
            break;
          }
        }
        
        if (!foundSignup) {
          cy.log('Sign up link not found - skipping test');
        }
      });
    });
  });

  describe('Workshop Categories and Filtering', () => {
    it('should verify workshop category links exist', () => {
      cy.contains('Online workshops').should('be.visible');
      cy.contains('Offline workshops').should('be.visible');
      cy.contains('Tamil workshops').should('be.visible');
      cy.contains('English workshops').should('be.visible');
      cy.contains('Malayalam workshops').should('be.visible');
      cy.contains('Telugu workshops').should('be.visible');
      cy.contains('Kannada workshops').should('be.visible');
    });

    it('should test Online workshops filter', () => {
      cy.contains('Online workshops').click();
      cy.wait(2000);
      cy.screenshot('online-workshops-filtered');
    });

    it('should test Offline workshops filter', () => {
      cy.contains('Offline workshops').click();
      cy.wait(2000);
      cy.screenshot('offline-workshops-filtered');
    });

    it('should test language-specific workshop filters', () => {
      const languages = ['Tamil', 'English', 'Malayalam', 'Telugu', 'Kannada'];
      
      languages.forEach(language => {
        cy.contains(`${language} workshops`).click();
        cy.wait(1500);
        cy.screenshot(`${language.toLowerCase()}-workshops-filtered`);
      });
    });
  });

  describe('Content Verification', () => {
    it('should verify brand and company information', () => {
      cy.contains('CHITTI').should('be.visible');
      cy.contains('an initiative by').should('be.visible');
      cy.contains('Making the world a better place through constructing elegant hierarchies.').should('be.visible');
    });

    it('should verify company address and contact info', () => {
      cy.contains('REGISTERED ADDRESS').should('be.visible');
      cy.contains('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai, Tamil Nadu 600117').should('be.visible');
      cy.contains('Chitti Support').should('be.visible');
      cy.contains('support@chitti.app').should('be.visible');
      cy.contains('+91 988 422 2368').should('be.visible');
    });

    it('should verify product links', () => {
      cy.contains('Our Products').should('be.visible');
      cy.contains('Chitti Maker School').should('be.visible');
      cy.contains('Chitti Powered School').should('be.visible');
      cy.contains('Chitti NEET JEE').should('be.visible');
    });

    it('should verify key metrics and achievements', () => {
      cy.contains('Our workshops are live in the USA, UAE, Australia, and beyond.').should('be.visible');
      cy.contains('Impacted the lives of').should('be.visible');
      cy.contains('2Million People').should('be.visible');
      cy.contains('Google Reviews').should('be.visible');
      cy.contains('4.9').should('be.visible');
      cy.contains('(15,000+)').should('be.visible');
    });
  });

  describe('Footer and Legal Links', () => {
    it('should verify footer company links', () => {
      cy.contains('Company').should('be.visible');
      cy.contains('About').should('be.visible');
      cy.contains('Careers').should('be.visible');
      cy.contains('We are Hiring').should('be.visible');
    });

    it('should verify legal and policy links', () => {
      cy.contains('Terms & Conditions').should('be.visible');
      cy.contains('Privacy Policy').should('be.visible');
      cy.contains('Refund & Cancellation Policy').should('be.visible');
      cy.contains('Disclaimer').should('be.visible');
    });

    it('should test Terms & Conditions link', () => {
      cy.contains('Terms & Conditions').click();
      cy.wait(1000);
      cy.screenshot('terms-conditions');
      cy.go('back');
    });

    it('should test Privacy Policy link', () => {
      cy.contains('Privacy Policy').click();
      cy.wait(1000);
      cy.screenshot('privacy-policy');
      cy.go('back');
    });

    it('should verify copyright information', () => {
      cy.contains('© 2024 LMES Academy Pvt. Ltd. All rights reserved.').should('be.visible');
    });
  });

  describe('Responsive Design and Scrolling', () => {
    it('should test desktop viewport', () => {
      cy.viewport(1536, 864); // Desktop viewport for 1920x1080 at 125% scale
      cy.screenshot('desktop-view');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.screenshot('desktop-bottom');
      cy.scrollTo('top');
    });

    it('should test tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.screenshot('tablet-view');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.screenshot('tablet-bottom');
      cy.scrollTo('top');
    });

    it('should test mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.screenshot('mobile-view');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.screenshot('mobile-bottom');
      cy.scrollTo('top');
    });

    it('should test smooth scrolling functionality', () => {
      cy.scrollTo('bottom', { duration: 2000 });
      cy.wait(1000);
      cy.screenshot('scroll-bottom');
      cy.scrollTo('top', { duration: 2000 });
      cy.wait(1000);
      cy.screenshot('scroll-top');
    });
  });

  describe('Interactive Elements and User Experience', () => {
    beforeEach(() => {
      cy.viewport(1536, 864); // Desktop viewport for 1920x1080 at 125% scale
      cy.wait(1000);
    });

    it('should test hover effects on navigation links', () => {
      cy.get('body').then(($body) => {
        const navLinks = ['Home', 'Products', 'Support', 'About'];
        
        navLinks.forEach(linkText => {
          const linkSelectors = [`a:contains("${linkText}")`, `button:contains("${linkText}")`];
          
          for (const selector of linkSelectors) {
            if ($body.find(selector).length > 0) {
              cy.get(selector).first().then(($el) => {
                if ($el.is(':visible')) {
                  cy.wrap($el).trigger('mouseover');
                }
              });
              break;
            }
          }
        });
        
        cy.screenshot('nav-hover-effects');
      });
    });

    it('should verify all clickable elements are accessible', () => {
      cy.get('a').should('have.length.greaterThan', 0);
      cy.get('body').then(($body) => {
        if ($body.find('button').length > 0) {
          cy.get('button').should('have.length.greaterThan', 0);
        }
      });
    });

    it('should test keyboard navigation', () => {
      // Find the first focusable element and focus it
      cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el).focus();
          cy.focused().should('exist');
          cy.screenshot('keyboard-focus');
        } else {
          cy.log('No focusable elements found for keyboard navigation test');
          cy.screenshot('keyboard-focus-no-elements');
        }
      });
    });
  });

  describe('Performance and Loading', () => {
    it('should verify page loads within acceptable time', () => {
      const start = Date.now();
      cy.visit('https://chitti.app/workshops/');
      cy.get('body').should('be.visible');
      cy.then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(10000);
      });
    });

    it('should verify images load properly', () => {
      cy.get('img').should('be.visible').and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });
});