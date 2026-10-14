Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/web/index.php/auth/login', { timeout: 120000 })
    cy.get('input[placeholder="Username"]', { timeout: 20000 }).should('be.visible')
    cy.get('input[placeholder="Username"]').clear().type(username)
    cy.get('input[placeholder="Password"]', { timeout: 20000 }).should('be.visible')
    cy.get('input[placeholder="Password"]').clear().type(password)
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 20000 }).should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb-module', { timeout: 20000 }).should('be.visible')
  })
})

Cypress.Commands.add('addEmployee', (firstName, lastName) => {
  cy.get('a[href*="pim/viewPimModule"]', { timeout: 20000 }).click()
  cy.contains('a', 'Add Employee').click()
  cy.get('input[name="firstName"]', { timeout: 20000 }).should('be.visible').type(firstName)
  cy.get('input[name="lastName"]').should('be.visible').type(lastName)
  cy.get('button[type="submit"]').click()
  cy.contains('Successfully Saved', { timeout: 20000 }).should('be.visible')
})
