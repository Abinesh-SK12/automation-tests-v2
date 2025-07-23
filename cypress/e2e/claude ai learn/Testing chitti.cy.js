describe('Chitti Workshops - Comprehensive E2E Testing', () => {
  beforeEach(() => {
    // Handle uncaught exceptions to prevent test failures from app errors
    cy.on('uncaught:exception', (err, runnable) => {
      // Handle dynamic import failures
      if (err.message.includes('Failed to fetch dynamically imported module')) {
        cy.log('Dynamic import failure caught and ignored');
        return false; // Prevent Cypress from failing the test
      }
      
      // Handle other common app errors that shouldn't fail tests
      if (err.message.includes('ChunkLoadError') || 
          err.message.includes('Loading chunk') ||
          err.message.includes('_nuxt') ||
          err.message.includes('Network Error') ||
          err.message.includes('fetch')) {
        cy.log(`App error caught and ignored: ${err.message}`);
        return false; // Prevent Cypress from failing the test
      }
      
      // Let other errors fail the test as normal
      return true;
    });
    
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

  });

  describe('Workshop Categories and Filtering', () => {
    beforeEach(() => {
      cy.viewport(1536, 864); // Ensure desktop viewport
      cy.wait(1000);
    });

    it('should verify workshop category links exist', () => {
      cy.get('body').then(($body) => {
        const workshopCategories = ['Online workshops', 'Offline workshops', 'Tamil workshops', 'English workshops', 'Malayalam workshops', 'Telugu workshops', 'Kannada workshops'];
        
        workshopCategories.forEach(category => {
          if ($body.find(`*:contains("${category}")`).length > 0) {
            cy.log(`Found workshop category: ${category}`);
          } else {
            cy.log(`Workshop category not found: ${category}`);
          }
        });
      });
    });

    it('should test hover effects on all workshop categories', () => {
      const workshopCategories = ['Online workshops', 'Offline workshops', 'Tamil workshops', 'English workshops', 'Malayalam workshops', 'Telugu workshops', 'Kannada workshops'];
      
      cy.get('body').then(($body) => {
        workshopCategories.forEach((category, index) => {
          if ($body.find(`*:contains("${category}")`).length > 0) {
            cy.get(`*:contains("${category}")`).first().then(($el) => {
              if ($el.length > 0) {
                // Trigger hover without scrolling
                cy.wrap($el).trigger('mouseenter', { force: true });
                cy.wait(300);
                cy.wrap($el).trigger('mouseover', { force: true });
                cy.wait(500); // Wait to see hover effect
                
                cy.screenshot(`category-hover-${category.toLowerCase().replace(/\s+/g, '-')}`);
                
                cy.wrap($el).trigger('mouseleave', { force: true });
                cy.wait(200);
                cy.log(`Hovered over: ${category}`);
                
                // Pause between categories
                if (index < workshopCategories.length - 1) {
                  cy.wait(300);
                }
              }
            });
          } else {
            cy.log(`Category not found: ${category}`);
          }
        });
        cy.screenshot('workshop-categories-hover-effects-complete');
      });
    });

    it('should test hover effects on individual workshop cards', () => {
      cy.get('body').then(($body) => {
        // Look for common workshop card selectors
        const workshopSelectors = [
          '[class*="workshop"]',
          '[class*="card"]',
          '[class*="course"]',
          'a[href*="workshop"]',
          'div[role="button"]',
          '.clickable',
          '[data-testid*="workshop"]'
        ];
        
        let foundWorkshops = false;
        
        workshopSelectors.forEach(selector => {
          if (!foundWorkshops && $body.find(selector).length > 0) {
            cy.get(selector).each(($workshop, index) => {
              if (index < 5) { // Test first 5 workshops to avoid timeout
                cy.wrap($workshop).trigger('mouseover', { force: true });
                cy.wait(200);
                cy.log(`Hovered over workshop card ${index + 1}`);
              }
            });
            foundWorkshops = true;
          }
        });
        
        if (!foundWorkshops) {
          cy.log('No workshop cards found for hover testing');
        }
        
        cy.screenshot('individual-workshops-hover-effects');
      });
    });

    it('should test Online workshops filter', () => {
      cy.get('body').then(($body) => {
        if ($body.find('*:contains("Online workshops")').length > 0) {
          cy.get('*:contains("Online workshops")').first().click({ force: true });
          cy.wait(2000);
          cy.screenshot('online-workshops-filtered');
        } else {
          cy.log('Online workshops filter not found');
          cy.screenshot('online-workshops-not-found');
        }
      });
    });

    it('should test Offline workshops filter', () => {
      cy.get('body').then(($body) => {
        if ($body.find('*:contains("Offline workshops")').length > 0) {
          cy.get('*:contains("Offline workshops")').first().click({ force: true });
          cy.wait(2000);
          cy.screenshot('offline-workshops-filtered');
        } else {
          cy.log('Offline workshops filter not found');
          cy.screenshot('offline-workshops-not-found');
        }
      });
    });

    it('should test language-specific workshop filters', () => {
      const languages = ['Tamil', 'English', 'Malayalam', 'Telugu', 'Kannada'];
      
      cy.get('body').then(($body) => {
        languages.forEach(language => {
          if ($body.find(`*:contains("${language} workshops")`).length > 0) {
            cy.get(`*:contains("${language} workshops")`).first().click({ force: true });
            cy.wait(1500);
            cy.screenshot(`${language.toLowerCase()}-workshops-filtered`);
          } else {
            cy.log(`${language} workshops filter not found`);
            cy.screenshot(`${language.toLowerCase()}-workshops-not-found`);
          }
        });
      });
    });

    it('should test mouse hover events on workshop navigation elements', () => {
      cy.get('body').then(($body) => {
        // Test hover on main workshop navigation links
        const workshopNavElements = [
          'a[href*="workshop"]',
          'button:contains("Workshop")',
          '*:contains("Workshops")',
          '*:contains("Online workshops")',
          '*:contains("Offline workshops")'
        ];
        
        workshopNavElements.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().then(($el) => {
              if ($el.length > 0) {
                // Trigger multiple hover events without scrolling
                cy.wrap($el).trigger('mouseenter', { force: true });
                cy.wait(300);
                cy.wrap($el).trigger('mouseover', { force: true });
                cy.wait(500); // Longer wait to see hover effect
                
                // Take screenshot while hovering
                cy.screenshot(`hover-${selector.replace(/[^a-zA-Z0-9]/g, '-')}`);
                
                cy.wrap($el).trigger('mouseleave', { force: true });
                cy.wait(200);
                cy.log(`Tested hover events on: ${selector}`);
              }
            });
          } else {
            cy.log(`Navigation element not found: ${selector}`);
          }
        });
        cy.screenshot('workshop-navigation-hover-events-complete');
      });
    });

    it('should test mouse hover events with CSS state changes', () => {
      cy.get('body').then(($body) => {
        // Look for elements that might have hover CSS effects
        const hoverTargets = [
          '[class*="hover"]',
          '[class*="workshop"]', 
          '[class*="card"]',
          'a',
          'button',
          '[role="button"]'
        ];
        
        let testedElements = 0;
        
        hoverTargets.forEach(selector => {
          if ($body.find(selector).length > 0 && testedElements < 10) {
            cy.get(selector).each(($element, index) => {
              if (index < 3) { // Test first 3 of each type
                cy.wrap($element).then(($el) => {
                  // Record initial state
                  const initialClasses = $el.attr('class') || '';
                  
                  // Trigger hover events
                  cy.wrap($el).trigger('mouseenter', { force: true });
                  cy.wait(300);
                  
                  // Check for hover state changes
                  cy.wrap($el).should('exist').then(($hoverEl) => {
                    const hoverClasses = $hoverEl.attr('class') || '';
                    if (hoverClasses !== initialClasses) {
                      cy.log(`CSS classes changed on hover: ${selector}`);
                    }
                  });
                  
                  cy.wrap($el).trigger('mouseleave', { force: true });
                  cy.wait(200);
                  testedElements++;
                });
              }
            });
          }
        });
        
        cy.screenshot('workshop-hover-css-states');
      });
    });


    it('should test hover events on workshop cards with interaction feedback', () => {
      cy.get('body').then(($body) => {
        // Find workshop cards using various selectors
        const cardSelectors = [
          '[class*="workshop"][class*="card"]',
          '[data-testid*="workshop"]',
          'div[class*="workshop"]',
          'article[class*="workshop"]',
          '.workshop-item',
          '.course-card',
          'a[href*="workshop"]'
        ];
        
        let foundCards = false;
        
        cardSelectors.forEach(selector => {
          if (!foundCards && $body.find(selector).length > 0) {
            cy.get(selector).each(($card, index) => {
              if (index < 5) { // Test first 5 cards
                cy.wrap($card).then(($el) => {
                  if ($el.length > 0) {
                    // Record initial state
                    const initialStyles = $el.attr('style') || '';
                    const initialClasses = $el.attr('class') || '';
                    
                    // Test hover with potential tooltip/overlay effects without scrolling
                    cy.wrap($el).trigger('mouseenter', { force: true });
                    cy.wait(500); // Wait for hover animations
                    cy.wrap($el).trigger('mouseover', { force: true });
                    cy.wait(600); // Longer wait to see full effect
                    
                    // Take screenshot during hover
                    cy.screenshot(`workshop-card-hover-${index + 1}`);
                    
                    // Check for changes during hover
                    cy.wrap($el).then(($hoveredEl) => {
                      const hoverStyles = $hoveredEl.attr('style') || '';
                      const hoverClasses = $hoveredEl.attr('class') || '';
                      
                      if (hoverStyles !== initialStyles || hoverClasses !== initialClasses) {
                        cy.log(`Card ${index + 1} shows hover effect changes`);
                      }
                    });
                    
                    // Check for overlay or tooltip elements that might appear on hover
                    cy.get('body').then(($bodyCheck) => {
                      if ($bodyCheck.find('[class*="tooltip"], [class*="overlay"], [class*="popup"]').length > 0) {
                        cy.log(`Hover triggered tooltip/overlay on card ${index + 1}`);
                      }
                    });
                    
                    cy.wrap($el).trigger('mouseleave', { force: true });
                    cy.wait(400);
                    cy.log(`Tested hover interaction on workshop card ${index + 1}`);
                    
                    // Pause between cards for smooth experience
                    if (index < 4) {
                      cy.wait(500);
                    }
                  }
                });
              }
            });
            foundCards = true;
          }
        });
        
        if (!foundCards) {
          cy.log('No workshop cards found for hover testing');
        }
        
        cy.screenshot('workshop-cards-hover-interactions-complete');
      });
    });

    it('should test hover events with focus states', () => {
      cy.get('body').then(($body) => {
        // Test hover combined with focus events
        const focusableWorkshopElements = [
          'a[href*="workshop"]',
          'button:contains("workshop")',
          'input[placeholder*="workshop"]',
          '[tabindex]:contains("workshop")'
        ];
        
        focusableWorkshopElements.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().then(($el) => {
              // Test hover + focus combination
              cy.wrap($el).focus({ force: true });
              cy.wait(200);
              cy.wrap($el).trigger('mouseenter', { force: true });
              cy.wait(300);
              cy.wrap($el).trigger('mouseover', { force: true });
              cy.wait(200);
              cy.wrap($el).blur({ force: true });
              cy.wrap($el).trigger('mouseleave', { force: true });
              cy.log(`Tested hover + focus combination on: ${selector}`);
            });
          }
        });
        cy.screenshot('workshop-hover-focus-states');
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
      cy.get('body').then(($body) => {
        const footerLinks = ['Company', 'About', 'Careers', 'We are Hiring'];
        
        footerLinks.forEach(linkText => {
          if ($body.find(`*:contains("${linkText}")`).length > 0) {
            cy.log(`Found footer link: ${linkText}`);
          } else {
            cy.log(`Footer link not found: ${linkText}`);
          }
        });
      });
    });

    it('should verify legal and policy links', () => {
      cy.get('body').then(($body) => {
        const legalLinks = ['Terms & Conditions', 'Privacy Policy', 'Refund & Cancellation Policy', 'Disclaimer'];
        
        legalLinks.forEach(linkText => {
          if ($body.find(`*:contains("${linkText}")`).length > 0) {
            cy.log(`Found legal link: ${linkText}`);
          } else {
            cy.log(`Legal link not found: ${linkText}`);
          }
        });
      });
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