describe("API Tests", () => {
 
  it("Test 1 GET",() =>{
    cy.intercept({
      method: 'GET', // Method
      url: '/api/users?page=2' //url to intercept
    }).as('getUsers') //alias
   
    cy.visit('https://reqres.in/');
    cy.wait('@getUsers').then((interception) => {
      
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
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
      expect(responseBody.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
    }
  });
  });
 
  it("Test GET Single User", () => {
    cy.intercept({
      method: 'GET', // Method
      url: '/api/users/2', // URL to intercept
    }).as('getUser'); // Alias
  
    cy.visit('https://reqres.in/');
  
    // Simulate a GET request from the browser (for testing purposes)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users/2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
    cy.wait('@getUser').then((interception) => {
      if (interception.response) {
        // Checking the status code
        expect(interception.response.statusCode).to.eq(200);
  
        const responseBody = interception.response.body;
  
        // Corrected data structure and values according to reqres API response
        expect(responseBody.data).to.include({
          id: 2, 
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",

        });
  
        // Validate the support information
        expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
        expect(responseBody.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
      }
    });
  });
  
  it("Test GET Single User NOT FOUND", () => {
    cy.intercept({
      method: 'GET', // Method
      url: '/api/users/23', // URL to intercept
    }).as('getUser'); // Alias
  
    cy.visit('https://reqres.in/');
  
    // Simulate a GET request from the browser (for testing purposes)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users/23', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
    cy.wait('@getUser').then((interception) => {
      if (interception.response) {
        // Checking the status code
        expect(interception.response.statusCode).to.eq(404);
      }
        
    });
  });

  it("Test GET List <Resource>", () => {
    cy.intercept({
      method: 'GET', // Method
      url: '/api/unknown', // URL to intercept
    }).as('getUser'); // Alias
  
    cy.visit('https://reqres.in/');
  
    // Simulate a GET request from the browser (for testing purposes)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/unknown', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
    cy.wait('@getUser').then((interception) => {
      if (interception.response) {
        // Checking the status code
        expect(interception.response.statusCode).to.eq(200);
  
        const responseBody = interception.response.body;
        expect(responseBody.page).to.eq(1);
        expect(responseBody.per_page).to.eq(6);
        expect(responseBody.total).to.eq(12);
        expect(responseBody.total_pages).to.eq(2);
        expect(responseBody.data).to.have.length(6);
        // Corrected data structure and values according to reqres API response
        expect(responseBody.data[0]).to.include({
          id: 1,
          name: "cerulean",
          year: 2000,
          color: "#98B2D1",
          pantone_value: "15-4020",

        });
  
        // Validate the support information
        expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
        expect(responseBody.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
      }
    });
  });

  it("Test GET Single <Resource>", () => {
    cy.intercept({
      method: 'GET', // Method
      url: '/api/unknown/2', // URL to intercept
    }).as('getUser'); // Alias
  
    cy.visit('https://reqres.in/');
  
    // Simulate a GET request from the browser (for testing purposes)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/unknown/2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
    cy.wait('@getUser').then((interception) => {
      if (interception.response) {
        // Checking the status code
        expect(interception.response.statusCode).to.eq(200);
  
        const responseBody = interception.response.body;
       
        expect(responseBody.data).to.include({
          id: 2,
          name: "fuchsia rose",
          year: 2001,
          color: "#C74375",
          pantone_value: "17-2031",

        });
  
        // Validate the support information
        expect(responseBody.support.url).to.eq("https://reqres.in/#support-heading");
        expect(responseBody.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
      }
    });
  });
  
  it("Test GET Single <Resource> NOT FOUND", () => {
    cy.intercept({
      method: 'GET', // Method
      url: '/api/unknown/23', // URL to intercept
    }).as('getUser'); // Alias
  
    cy.visit('https://reqres.in/');
  
    // Simulate a GET request from the browser (for testing purposes)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/unknown/23', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
    cy.wait('@getUser').then((interception) => {
      if (interception.response) {
        // Checking the status code
        expect(interception.response.statusCode).to.eq(404);
  
      }
    });
  });

  it('Test 2 POST Create User', () => {
    // Trigger the POST request manually using cy.request()
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        "name": "morpheus",
        "job": "leader"
      }
    }).then((response) => {
      // Validate response status code
      expect(response.status).to.eq(201);

      // Validate response body
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'leader');
      expect(response.body).to.have.property('id').that.is.a('string');
      expect(response.body).to.have.property('createdAt').that.is.a('string');
    });
  });

  it('Test 2 POST Create User with Intercept', () => {
    // Intercepts the POST request to the specified URL
    cy.intercept({
      method: 'POST',
      url: '/api/users', 
    }).as('createUser'); 

    cy.visit('https://reqres.in/');

    // Trigger the POST request via browser's JavaScript execution (through the dev tools console)
    cy.window().then((win) => {
      // Making the POST request from the browser
      win.fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'morpheus',
          job: 'leader',
        }),
      });
    });

    // Wait for the intercepted request and validate it
    cy.wait('@createUser').then((interception) => {
      // Ensuring the intercepted response is not undefined
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Validate response body properties
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

    // Visit the page (assuming the page allows triggering a PUT request)
    cy.visit('https://reqres.in/');

    // Trigger the PUT request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users/2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'morpheus',
          job: 'Zion resident',
        }),
      });
    });

    // Wait for the intercepted request
    cy.wait('@updateUser').then((interception) => {
      if (interception?.response) {
        const responseBody = interception.response.body;

        // Assertions to validate the PUT request response
        expect(responseBody).to.have.property('name', 'morpheus');
        expect(responseBody).to.have.property('job', 'Zion resident');
        expect(responseBody).to.have.property('updatedAt').that.is.a('string');
      }
    });
  });

  it('Test PATCH Update User', () => {
    cy.intercept({
      method: 'PATCH',
      url: '/api/users/2', // Intercept the PUT request to update the user
    }).as('updateUser'); // Alias the request

    // Visit the page (assuming the page allows triggering a PUT request)
    cy.visit('https://reqres.in/');

    // Trigger the PUT request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users/2', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'morpheus',
          job: 'zion resident',
        }),
      });
    });

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

    // Trigger the DELETE request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users/2', {
        method: 'DELETE',
      });
    });

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

    // Trigger the POST request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'pistol',
        }),
      });
    });

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

    // Trigger the POST request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'eve.holt@reqres.in',
        }),
      });
    });

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

    // Trigger the POST request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        }),
      });
    });

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

    // Trigger the POST request using window.fetch (from browser context)
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'peter@klaven',
        }),
      });
    });

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
  
    // Trigger the delayed request by fetching data from the server
    cy.window().then((win) => {
      win.fetch('https://reqres.in/api/users?delay=3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  
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