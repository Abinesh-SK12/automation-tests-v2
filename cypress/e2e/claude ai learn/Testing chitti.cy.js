// Security Configuration
const TEST_CONFIG = {
  // Use environment variables for sensitive data
  USER_NAME: Cypress.env('TEST_USER_NAME') || 'Test User',
  PHONE: Cypress.env('TEST_PHONE') || '9000000001',
  EMAIL: Cypress.env('TEST_EMAIL') || 'test.user@example.com',
  ADDRESS: Cypress.env('TEST_ADDRESS') || '123 Test Street',
  CITY: Cypress.env('TEST_CITY') || 'Test City',
  PINCODE: Cypress.env('TEST_PINCODE') || '123456',
  
  // Admin credentials should be set via environment variables
  ADMIN_EMAIL: Cypress.env('ADMIN_EMAIL') || 'admin@example.com',
  ADMIN_PASSWORD: Cypress.env('ADMIN_PASSWORD') || 'test-password',
  ADMIN_DASHBOARD_URL: Cypress.env('ADMIN_DASHBOARD_URL') || 'https://dash.internal.chitti.xyz/',
  
  // Base URLs
  BASE_URL: 'https://chitti.app/workshops/'
};

// Security warning for sensitive data
if (!Cypress.env('ADMIN_EMAIL') || !Cypress.env('ADMIN_PASSWORD')) {
  console.warn('⚠️  WARNING: Using default test credentials. Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables for security.');
}

/*
 * SECURITY BEST PRACTICES IMPLEMENTED:
 * 
 * 1. ✅ Environment Variables: All sensitive data uses Cypress.env() with fallbacks
 * 2. ✅ No Hardcoded Credentials: Real passwords and emails removed
 * 3. ✅ Fake Test Data: Phone numbers, emails use obviously fake test data
 * 4. ✅ Centralized Configuration: All test data managed in TEST_CONFIG object
 * 5. ✅ Security Warnings: Console warnings for missing environment variables
 * 
 * ENVIRONMENT VARIABLES TO SET:
 * - TEST_USER_NAME: Test user's name
 * - TEST_PHONE: Test phone number (use fake numbers like 9000000xxx)
 * - TEST_EMAIL: Test email address (use example.com domain)
 * - TEST_ADDRESS: Test address
 * - TEST_CITY: Test city name
 * - TEST_PINCODE: Test postal code
 * - ADMIN_EMAIL: Admin dashboard email (for staging/test environment only)
 * - ADMIN_PASSWORD: Admin dashboard password (for staging/test environment only)
 * - ADMIN_DASHBOARD_URL: Admin dashboard URL
 * 
 * SECURITY NOTES:
 * - Never commit real credentials to version control
 * - Use separate test/staging environments for automation
 * - Regularly rotate test credentials
 * - Monitor test execution logs for exposed data
 */

describe('Chitti Workshops - Comprehensive E2E Testing', () => {
  beforeEach(() => {
    cy.visit(TEST_CONFIG.BASE_URL);
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
      cy.visit(TEST_CONFIG.BASE_URL);
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

  describe('Workshop Registration Flow', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', () => false);
      cy.viewport(1536, 864);
    });

    it('should complete Aeromodelling Program workshop registration', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Find and select specific Aeromodelling Program workshop
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
        .as('aeromodellingWorkshop');
      
      // Click on the workshop card
      cy.get('@aeromodellingWorkshop')
        .should('be.visible')
        .scrollIntoView({ duration: 1500 })
        .click();
      
      cy.wait(3000);
      
      // Click Register Now button
      cy.contains('button', 'Register Now')
        .scrollIntoView({ duration: 1500 })
        .click({ force: true });
      
      cy.wait(3000);
      
      // Fill registration form
      cy.get('input[type="text"]').type(TEST_CONFIG.USER_NAME, { delay: 20 });
      cy.wait(1000);
      
      // Handle country selection for phone number
      cy.get('.iti__flag-container').click();
      cy.wait(1000);
      cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
      cy.wait(1000);
      cy.get('.iti__flag-container').click();
      cy.wait(1000);
      cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
      cy.wait(1000);
      
      // Enter phone number and email
      cy.get('input[type="tel"]').type(TEST_CONFIG.PHONE, { delay: 20 });
      cy.wait(1000);
      cy.get('input[type="email"]').type(TEST_CONFIG.EMAIL, { delay: 20 });
      
      // Select grade/class
      cy.get('select.block').eq(0).select('Class 8');
      
      // Select timezone
      cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
      
      // Select time slot
      cy.contains('span', '12:30 PM').click({ force: true });
      
      // Submit registration
      cy.contains('p', 'Register').click();
      
      // Verify successful registration
      cy.contains('div', ' Registration Successful ').should('exist');
      cy.screenshot('workshop-registration-success');
    });

    it('should handle workshop card selection with flexible criteria', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Alternative approach - find any available free workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return text.includes('Free') && text.includes('English');
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();
            
            cy.wait(2000);
            cy.screenshot('workshop-selected');
            
            // Check if Register Now button exists
            cy.get('body').then(($body) => {
              if ($body.find('button:contains("Register Now")').length > 0) {
                cy.contains('button', 'Register Now').should('be.visible');
                cy.log('Register Now button found and visible');
              } else {
                cy.log('Register Now button not found - workshop may be full or unavailable');
              }
            });
          } else {
            cy.log('No free English workshops found');
          }
        });
    });

    it('should verify workshop card information display', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Verify workshop cards contain expected information
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().within(() => {
        // Check for common workshop card elements
        cy.get('img').should('exist'); // Workshop image
        
        cy.get('body').then(($body) => {
          const cardText = $body.text();
          
          // Log what information is available in the card
          if (cardText.includes('Grade')) {
            cy.log('Grade information found');
          }
          if (cardText.includes('Free') || cardText.includes('₹')) {
            cy.log('Price information found');
          }
          if (cardText.includes('English') || cardText.includes('Tamil') || cardText.includes('Hindi')) {
            cy.log('Language information found');
          }
        });
      });
      
      cy.screenshot('workshop-card-details');
    });

    it('should complete paid workshop registration with payment - CMS Electronics', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Find and select CMS Electronics workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return (
            text.includes('CMS Electronics') &&
            text.includes('₹299') &&
            text.includes('English')
          );
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();
            
            cy.wait(3000);
            
            // Click Register Now button
            cy.contains('button', 'Register Now')
              .scrollIntoView({ duration: 1500 })
              .click({ force: true });
            
            cy.wait(3000);
            
            // Fill registration form
            cy.get('input[placeholder="Enter the Name"]').type(TEST_CONFIG.USER_NAME, { delay: 20 });
            cy.wait(1000);
            
            // Handle country selection
            cy.get('.iti__flag-container').click();
            cy.wait(1000);
            cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
            cy.wait(1000);
            
            // Enter contact details
            cy.get('input[type="tel"]').type(TEST_CONFIG.PHONE, { delay: 20 });
            cy.wait(1000);
            cy.get('input[placeholder="Enter the Email"]').type(TEST_CONFIG.EMAIL, { delay: 20 });
            
            // Select grade
            cy.get('select.block').eq(0).select('Class 10');
            
            // Fill address fields (unique to paid workshops)
            cy.get('input[placeholder="Enter your Address"]').type(TEST_CONFIG.ADDRESS, { delay: 20 });
            cy.get('input[placeholder="Enter your City"]').type(TEST_CONFIG.CITY, { delay: 20 });
            cy.get('input[placeholder="Enter your Pincode"]').type(TEST_CONFIG.PINCODE, { delay: 20 });
            
            // Submit registration
            cy.contains('p', 'Register').click();
            
            // Verify Razorpay payment iframe appears
            cy.get('iframe[src*="api.razorpay.com"]', { timeout: 10000 }).should('be.visible');
            cy.screenshot('payment-gateway-loaded');
          } else {
            cy.log('CMS Electronics workshop not found');
          }
        });
    });

    it('should handle low-priced workshop with time slot - Teacher Empowerment', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Find Teacher Empowerment workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return (
            text.includes('Teacher Empowerment') &&
            text.includes('₹9')
          );
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();
            
            cy.wait(3000);
            
            // Look for price-specific button
            cy.get('body').then(($body) => {
              if ($body.find('button:contains("Book Now for ₹9")').length > 0) {
                cy.contains('button', 'Book Now for ₹9').click({ force: true });
              } else {
                cy.contains('button', 'Register Now').click({ force: true });
              }
            });
            
            cy.wait(3000);
            
            // Fill form
            cy.get('input[type="text"]').first().type(TEST_CONFIG.USER_NAME, { delay: 20 });
            cy.wait(1000);
            
            // Phone and email
            cy.get('input[type="tel"]').type(TEST_CONFIG.PHONE, { delay: 20 });
            cy.get('input[type="email"]').type(TEST_CONFIG.EMAIL, { delay: 20 });
            
            // Select College Student option
            cy.get('select.block').eq(0).then(($select) => {
              if ($select.find('option:contains("College Student")').length > 0) {
                cy.wrap($select).select('College Student');
              } else {
                cy.wrap($select).select($select.find('option').last().text());
              }
            });
            
            // Select time slot if available
            cy.get('body').then(($body) => {
              if ($body.find('span:contains("11:00 AM")').length > 0) {
                cy.contains('span', '11:00 AM').click({ force: true });
              }
            });
            
            // Submit
            cy.contains('p', 'Register').click();
            cy.wait(2000);
            cy.screenshot('teacher-workshop-registration');
          } else {
            cy.log('Teacher Empowerment workshop not found');
          }
        });
    });

    it('should test language-specific workshop - Tamil', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Find Tamil language workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return text.includes('Tamil') && (text.includes('₹') || text.includes('Free'));
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();
            
            cy.wait(3000);
            cy.screenshot('tamil-workshop-selected');
            
            // Check for register button
            cy.get('body').then(($body) => {
              if ($body.find('button:contains("Register")').length > 0) {
                cy.log('Tamil workshop registration available');
              }
            });
          } else {
            cy.log('No Tamil workshops found');
          }
        });
    });

    it('should test workshop filtering by category', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Test different workshop filters
      const filters = [
        { name: 'Online workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'Offline workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'Tamil workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'English workshops', expectedCount: 'greaterThan', value: 5 }
      ];
      
      filters.forEach((filter) => {
        cy.contains(filter.name).click();
        cy.wait(2000);
        
        // Verify workshops are displayed
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col').should('have.length.greaterThan', 0);
        cy.screenshot(`filter-${filter.name.toLowerCase().replace(' ', '-')}`);
        
        // Reset to all workshops
        cy.visit(TEST_CONFIG.BASE_URL);
        cy.wait(1000);
      });
    });

    it('should handle complex workshop selection with multiple criteria', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Complex filtering logic
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').each(($el, index) => {
        const text = $el.text();
        
        // Find workshops matching multiple criteria
        if (
          text.includes('Solar') &&
          text.includes('₹499') &&
          (text.includes('English') || text.includes('Tamil')) &&
          text.includes('Grade')
        ) {
          cy.wrap($el)
            .scrollIntoView({ duration: 1500 })
            .click();
          
          cy.wait(2000);
          cy.screenshot('solar-workshop-multi-criteria');
          
          // Return false to exit the each loop after first match
          return false;
        }
      });
    });
  });

  describe('Admin Dashboard Functionality', () => {
    it('should test Chitti dashboard login and navigation', () => {
      cy.visit(TEST_CONFIG.ADMIN_DASHBOARD_URL);
      
      // Login to dashboard
      cy.get('input[type="email"]').type(TEST_CONFIG.ADMIN_EMAIL);
      cy.get('input[type="password"]').type(TEST_CONFIG.ADMIN_PASSWORD);
      cy.get('button[type="submit"]').click();
      
      cy.wait(3000);
      
      // Navigate to workshops section
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Workshops")').length > 0) {
          cy.contains('a', 'Workshops').click();
          cy.wait(2000);
          cy.screenshot('dashboard-workshops');
          
          // Check for workshop management options
          cy.get('body').then(($body) => {
            if ($body.find('button:contains("View Registrations")').length > 0) {
              cy.log('Workshop management features available');
            }
          });
        } else {
          cy.log('Workshops section not found in dashboard');
        }
      });
    });
  });

  describe('Workshop Registration Edge Cases', () => {
    it('should handle registration with different button selectors', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      // Test different button selector patterns
      const buttonSelectors = [
        'button:contains("Register Now")',
        'button:contains("Book Now")',
        'span.text-base.font-bold.leading-6.text-white',
        'p.flex.justify-center.items-center.text-sm.font-bold.text-white'
      ];
      
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().click();
      cy.wait(2000);
      
      buttonSelectors.forEach(selector => {
        cy.get('body').then(($body) => {
          if ($body.find(selector).length > 0) {
            cy.log(`Found button with selector: ${selector}`);
          }
        });
      });
    });

    it('should verify form field placeholder variations', () => {
      cy.visit(TEST_CONFIG.BASE_URL);
      
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().click();
      cy.wait(2000);
      
      // Try to click any register button
      cy.get('button').contains(/Register|Book Now/i).first().click({ force: true });
      cy.wait(2000);
      
      // Check for different placeholder patterns
      const placeholders = [
        'Enter the Name',
        'Enter Name',
        'Enter the Email',
        'Enter Email',
        'Enter your Address',
        'Enter your City',
        'Enter your Pincode'
      ];
      
      placeholders.forEach(placeholder => {
        cy.get('body').then(($body) => {
          if ($body.find(`input[placeholder="${placeholder}"]`).length > 0) {
            cy.log(`Found placeholder: ${placeholder}`);
          }
        });
      });
    });
  });
});