# API-Intercepts

## Project Description

**API-Intercepts** is a Cypress-based testing project aimed at simulating, modifying, and validating API responses within a browser environment. This project enables comprehensive testing of UI behavior by intercepting API requests and manipulating responses. By simulating various backend scenarios, it ensures that the front-end application handles unexpected or incorrect data gracefully, resulting in a more resilient user experience.

## Key Features

- **API Interception and Modification**: Intercepts API requests to simulate different server responses without altering the actual backend.
- **Mocking and Validation**: Tests the application’s behavior by modifying API responses (e.g., missing data, altered fields) to verify how well the UI adapts to unexpected data inputs.
- **Response Validation**: Ensures the application correctly handles success, error, and edge-case responses, including missing fields, modified status codes, or empty response bodies.

## Tools and Libraries Used

- **Cypress**: The primary testing framework used for end-to-end testing, simulating user interactions and managing API intercepts.
  - **`cy.intercept()`**: Cypress’s built-in intercept command to catch and manipulate API requests, allowing modification of request headers, status codes, response bodies, and error scenarios. Essential for testing how the UI responds to varied backend data.
  - **`cy.window().then()`**: Provides access to the browser's `window` object, allowing simulation of direct `fetch` requests to test API calls independently from user-triggered events.
- **Reqres API**: An open-source mock API used to simulate user data in test cases, providing a controlled environment to test different scenarios without impacting production servers.

## How It Works

### Intercepting and Modifying Requests
- **Using `cy.intercept()`**: Captures HTTP requests to specified endpoints (e.g., `GET /api/users/2`) and modifies responses to simulate different test scenarios. For example, altering the status code or removing specific fields (e.g., the `avatar` field).

### Testing Response Handling
- **Simulating Server Responses**: Different server responses (such as altered user data, missing fields, or error codes) are simulated to ensure the UI responds appropriately in each scenario. Examples include modifying the user's `first_name` to a test value or removing the avatar URL to simulate missing resources.

### Direct `fetch` Simulation
- **Using `cy.window().then()`**: Accesses the `window` object to directly invoke `fetch` requests. This allows testing of API endpoints without user interactions, providing greater flexibility in creating different API call scenarios.

## Example Scenarios

- **Modifying User Data**: Alters user information (e.g., `first_name`, `avatar` URL) in the API response to check if the UI displays the modified data as expected.
- **Handling Missing Data**: Simulates incomplete or missing fields in the API response to verify that the UI gracefully handles unexpected data.
- **Simulating Errors**: Forces specific status codes (such as `404` or `500`) to test error handling and confirm that the UI displays appropriate feedback to users.

## Why This Project?

The **API-Intercepts** project is designed to improve the reliability of web applications by testing various backend data scenarios in a controlled environment. This ensures the application can handle unexpected data responses smoothly, resulting in a better user experience.

## Getting Started

To run this project locally, follow these steps:

1. **Install Cypress**: Follow the [Cypress installation guide](https://docs.cypress.io/guides/getting-started/installing-cypress) to set up your testing environment.
2. **Clone the Repository**: Clone this repository to your local machine.
3. **Run Cypress Tests**: Open Cypress in your project directory and run the tests to see API intercepts in action.

This project is intended for QA engineers, looking to strengthen their application’s resilience to various backend scenarios using Cypress.
