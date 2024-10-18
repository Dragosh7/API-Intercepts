describe("API Tests with Button Interactions", () => {

    it("Test 1 GET Users", () => {
      cy.intercept({
        method: 'GET',
        url: '/api/users?page=2', 
      }).as('getUsers'); // Alias for interception
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="users"] a').click();
  
      cy.wait('@getUsers').then((interception) => {
        if (interception.response) {
          const responseBody = interception.response.body;
  
          // Validate the response
          expect(interception.response.statusCode).to.eq(200);
          expect(responseBody.page).to.eq(2);
          expect(responseBody.per_page).to.eq(6);
          expect(responseBody.total).to.eq(12);
          expect(responseBody.total_pages).to.eq(2);
          expect(responseBody.data).to.have.length(6);
          expect(responseBody.data[0]).to.include({
            id: 7,
            email: "michael.lawson@reqres.in",
            first_name: "Michael",
            last_name: "Lawson",
          });
          expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
          expect(responseBody.support.text).to.eq(
            "To keep ReqRes free, contributions towards server costs are appreciated!"
          );
        }
      });
    });
  
    it("Test GET Single User", () => {
      cy.intercept({
        method: 'GET',
        url: '/api/users/2',
      }).as('getSingleUser');
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="users-single"] a').click();
  
      cy.wait('@getSingleUser').then((interception) => {
        if (interception.response) {
          const responseBody = interception.response.body;
  
          // Validate the response
          expect(interception.response.statusCode).to.eq(200);
          expect(responseBody.data).to.include({
            id: 2,
            email: "janet.weaver@reqres.in",
            first_name: "Janet",
            last_name: "Weaver",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
          });
          expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
          expect(responseBody.support.text).to.eq(
            "To keep ReqRes free, contributions towards server costs are appreciated!"
          );
        }
      });
    });
  
    it("Test GET Single User NOT FOUND", () => {
      cy.intercept({
        method: 'GET',
        url: '/api/users/23',
      }).as('getUserNotFound');
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="users-single-not-found"] a').click();
  
      cy.wait('@getUserNotFound').then((interception) => {
        if (interception.response) {
          expect(interception.response.statusCode).to.eq(404);
        }
      });
    });
  
    it("Test GET List <Resource>", () => {
      cy.intercept({
        method: 'GET',
        url: '/api/unknown',
      }).as('getUnknownResources');
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="unknown"] a').click();
  
      cy.wait('@getUnknownResources').then((interception) => {
        if (interception.response) {
          const responseBody = interception.response.body;
  
          // Validate the response
          expect(interception.response.statusCode).to.eq(200);
          expect(responseBody.page).to.eq(1);
          expect(responseBody.per_page).to.eq(6);
          expect(responseBody.total).to.eq(12);
          expect(responseBody.total_pages).to.eq(2);
          expect(responseBody.data).to.have.length(6);
          expect(responseBody.data[0]).to.include({
            id: 1,
            name: "cerulean",
            year: 2000,
            color: "#98B2D1",
            pantone_value: "15-4020",
          });
          expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
          expect(responseBody.support.text).to.eq(
            "To keep ReqRes free, contributions towards server costs are appreciated!"
          );
        }
      });
    });
  
    it("Test GET Single <Resource>", () => {
      cy.intercept({
        method: 'GET',
        url: '/api/unknown/2',
      }).as('getSingleUnknownResource');
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="unknown-single"] a').click();
  
      cy.wait('@getSingleUnknownResource').then((interception) => {
        if (interception.response) {
          const responseBody = interception.response.body;
  
          // Validate the response
          expect(interception.response.statusCode).to.eq(200);
          expect(responseBody.data).to.include({
            id: 2,
            name: "fuchsia rose",
            year: 2001,
            color: "#C74375",
            pantone_value: "17-2031",
          });
          expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
          expect(responseBody.support.text).to.eq(
            "To keep ReqRes free, contributions towards server costs are appreciated!"
          );
        }
      });
    });
  
    it("Test GET Single <Resource> NOT FOUND", () => {
        cy.intercept({
          method: 'GET', // Method
          url: '/api/unknown/23', // URL to intercept
        }).as('getUser'); // Alias
      
        cy.visit('https://reqres.in/');
      
        cy.get('li[data-id="unknown-single-not-found"] a').click();

      
        cy.wait('@getUser').then((interception) => {
          if (interception.response) {
            // Checking the status code
            expect(interception.response.statusCode).to.eq(404);
      
          }
        });
      });

    it('Test POST Create User', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/users',
      }).as('createUser');
  
      cy.visit('https://reqres.in/');
  
      cy.get('li[data-id="post"] a').click(); 
  
      cy.wait('@createUser').then((interception) => {
        if (interception.response) {
          const responseBody = interception.response.body;
  
          // Validate the response
          expect(interception.response.statusCode).to.eq(201);
          expect(responseBody).to.have.property('name', 'morpheus');
          expect(responseBody).to.have.property('job', 'leader');
          expect(responseBody).to.have.property('id').that.is.a('string');
          expect(responseBody).to.have.property('createdAt').that.is.a('string');
        }
      });
    });

    it('Test PUT Update User', () => {
        cy.intercept({
          method: 'PUT',
          url: '/api/users/2', // Intercept the PUT request to update the user
        }).as('updateUser'); // Alias the request
    
         
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="put"] a').click();

    
        // Wait for the intercepted request
        cy.wait('@updateUser').then((interception) => {
          if (interception?.response) {
            const responseBody = interception.response.body;
    
            // Assertions to validate the PUT request response
            expect(responseBody).to.have.property('name', 'morpheus');
            expect(responseBody).to.have.property('job', 'zion resident');
            expect(responseBody).to.have.property('updatedAt').that.is.a('string');
          }
        });
      });

      
  it('Test PATCH Update User', () => {
    cy.intercept({
      method: 'PATCH',
      url: '/api/users/2', // Intercept the PUT request to update the user
    }).as('updateUser'); // Alias the request

     
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="patch"] a').click();

    // Wait for the intercepted request
    cy.wait('@updateUser').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Assertions to validate the PUT request response
        expect(responseBody).to.have.property('name', 'morpheus');
        expect(responseBody).to.have.property('job', 'zion resident');
        expect(responseBody).to.have.property('updatedAt').that.is.a('string');

      }
    });
  });

  it('Test DELETE User', () => {
    cy.intercept({
      method: 'DELETE',
      url: '/api/users/2', // Intercept the DELETE request
    }).as('deleteUser'); // Alias the request

    // Visit the page
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="delete"] a').click();


    // Wait for the intercepted request
    cy.wait('@deleteUser').then((interception) => {
      // Validate the response status code
      expect(interception?.response?.statusCode).to.eq(204);
    });
  });

  it('Test POST Register Success', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/register', // Intercept the register POST request
    }).as('registerUser'); // Alias the request

    // Visit the page
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="register-successful"] a').click();

    // Wait for the intercepted request
    cy.wait('@registerUser').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Validate the response
        expect(interception.response.statusCode).to.eq(200);
        expect(responseBody).to.have.property('id', 4);
        expect(responseBody).to.have.property('token', 'QpwL5tke4Pnpja7X4');
      }
    });
  });

  it('Test POST Register Unsuccessful', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/register', // Intercept the register POST request
    }).as('registerUser'); // Alias the request

    // Visit the page
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="register-unsuccessful"] a').click();

    // Wait for the intercepted request
    cy.wait('@registerUser').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Validate the response
        expect(interception.response.statusCode).to.eq(400);
        expect(responseBody).to.have.property('error', "Missing password");
      }
    });
  });
  
  it('Test POST Login Success', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/login', // Intercept the login POST request
    }).as('loginUser'); // Alias the request

    // Visit the page
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="login-successful"] a').click();


    // Wait for the intercepted request
    cy.wait('@loginUser').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Validate the response
        expect(interception.response.statusCode).to.eq(200);
        expect(responseBody).to.have.property('token', 'QpwL5tke4Pnpja7X4');
      }
    });
  });

  
  it('Test POST Login Failure', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/login', // Intercept the login POST request
    }).as('loginUserFail'); // Alias the request

    // Visit the page
    cy.visit('https://reqres.in/');

    cy.get('li[data-id="login-unsuccessful"] a').click();

    // Wait for the intercepted request
    cy.wait('@loginUserFail').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Validate the response
        expect(interception.response.statusCode).to.eq(400);
        expect(responseBody).to.have.property('error', 'Missing password');
      }
    });
  });

  it("Test GET List Users with delay", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/users?delay=3', // Intercepting the delayed response request
    }).as('getUsers'); // Alias the intercept
  
    cy.visit('https://reqres.in'); // Visiting the website
  
    cy.get('li[data-id="delay"] a').click();
  
    cy.wait('@getUsers').then((interception) => {
      if (interception.response) {
        // Assert the status code
        expect(interception.response.statusCode).to.eq(200);
  
        // Assert response data structure
        const responseBody = interception.response.body;
        expect(responseBody.page).to.eq(1);
        expect(responseBody.data).to.have.length(6); 

        expect(responseBody.per_page).to.eq(6);
        expect(responseBody.total).to.eq(12);
        expect(responseBody.total_pages).to.eq(2);
  
        // Assert specific user data
        expect(responseBody.data[1]).to.include({
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
        });
  
        // Assert the support information
        expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
        expect(responseBody.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
      }
    });
  });

  });
  