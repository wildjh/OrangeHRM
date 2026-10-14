Cypress.Commands.add("login", (username, password) => {
  cy.visit("/web/index.php/auth/login", { timeout: 120000 });
  cy.get('input[name="username"]', { timeout: 20000 })
    .should("be.visible")
    .type(username);
  cy.get('input[name="password"]', { timeout: 20000 })
    .should("be.visible")
    .type(password);
  cy.get('button[type="submit"]').should("be.enabled").click();
  cy.url({ timeout: 20000 }).should("include", "/dashboard");
});

Cypress.Commands.add("addEmployee", (firstName, lastName) => {
  cy.get('a[href*="pim/viewPimModule"]', { timeout: 20000 }).click();
  cy.contains("a", "Add Employee").click();
  cy.get('input[name="firstName"]', { timeout: 20000 })
    .should("be.visible")
    .type(firstName);
  cy.get('input[name="lastName"]').should("be.visible").type(lastName);
  cy.get('button[type="submit"]').click();
  cy.contains("Successfully Saved", { timeout: 20000 }).should("be.visible");
});
