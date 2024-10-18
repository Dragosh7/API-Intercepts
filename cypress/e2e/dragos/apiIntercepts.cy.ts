describe("API Tests with Changed Response", () => {

    it("Test INTERCEPT: GET Single User Not Found (404) to (500)", () => {
        cy.intercept({
          method: 'GET',
          url: '/api/users/23'
    
        },
        
        {
          statusCode: 500, // Forcing response status code
          body: {
            "data": {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            "support": {
                "url": "https://reqres.in/#support-heading",
                "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
          } 
        }
        
     
      ).as('getUserNotFound'); // Alias for the request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="users-single-not-found"] a').click(); 
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserNotFound').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });

      it("Test INTERCEPT: making GET Single <Resource> to return large dataset", () => {
        cy.intercept({
          method: 'GET',
          url: '/api/unknown/23'
    
        },
        
        {
          statusCode: 999, // Forcing response status code
          body: {
            data: Array(1000).fill(undefined).map((_, i) => ({
                id: i + 1,
                email: `user${i}@example.com`,
                first_name: `User${i}`,
                last_name: `Last${i}`,
                avatar: `https://example.com/avatars/${i}.jpg`,
              })),
          } 
        }
        
     
      ).as('getUserNotFound'); // Alias for the request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="unknown-single-not-found"] a').click();
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserNotFound').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });

      it("Test INTERCEPT: GET Single <Resource> but returning an Unauthorized access 401", () => {
        cy.intercept({
          method: 'GET',
          url: '/api/unknown/23'
    
        },
        
        {
          statusCode: 401, // Forcing response status code
          body: {
            error: 'Unauthorized'
          } 
        }
        
     
      ).as('getUserNotFound'); // Alias for the request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="unknown-single-not-found"] a').click();
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserNotFound').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });

      it("Test INTERCEPT: GET Single <Resource>. Return paginated data by altering the page query parameter", () => {
        cy.intercept({
          method: 'GET',
          url: '/api/unknown/23'
    
        },
        
        {
          statusCode: 100, // Forcing response status code
          body: {
            data: Array(10).fill(undefined).map((_, i) => ({
                id: i + 1,
                email: `user${i}@example.com`,
                first_name: `User${i}`,
                last_name: `Last${i}`,
              })),
              total: 20, //number of users
              page: 1,
            },
        }
        
     
      ).as('getUserNotFound'); // Alias for the request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="unknown-single-not-found"] a').click();
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserNotFound').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });

      it("Test INTERCEPT: GET Single <Resource>. Delayed response seems to load infinitely", () => {
        cy.intercept({
          method: 'GET',
          url: '/api/unknown/23'
    
        },
        
        {
          statusCode: 100, // Forcing response status code
          delay: 5000, // 5 seconds delay
        }
        
     
      ).as('getUserNotFound'); // Alias for the request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="unknown-single-not-found"] a').click();
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserNotFound').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });

      it("Test INTERCEPT: GET Single User - Modifying the response", () => {
        cy.intercept('GET', '/api/users/2', (req) => {
          // Modifying the response data before it gets sent to the reqres
          req.reply((res) => {
            res.body.data.first_name = 'TestFirstName'; // Changed first name
            res.body.data.avatar = ''; // Simulating missing avatar URL
          });
        }).as('getUserModified'); // Alias for the intercepted request
    
        cy.visit('https://reqres.in/');
    
        cy.get('li[data-id="users-single"] a').click();
    
        // Wait for the intercepted request and then validate the response
        cy.wait('@getUserModified').then((interception) => {
          // Check if the response is not undefined
          if (interception.response) {
            // Assert the status code is 404
            expect(interception.response.statusCode).to.eq(404);
    
            // Assert the response body is empty
            expect(interception.response.body).to.be.empty;
          }
        });
      });


  });
  