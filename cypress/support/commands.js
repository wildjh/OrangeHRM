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
  // Visitar directo PIM Add Employee (sin click que dispare pageLoad masivo)
  cy.visit('/web/index.php/pim/addEmployee', { timeout: 120000 })
  cy.get('form.oxd-form', { timeout: 30000 }).should('be.visible')

  cy.get('input[name="firstName"]', { timeout: 20000 }).should('be.visible').clear().type(firstName)
  cy.get('input[name="lastName"]').should('be.visible').clear().type(lastName)

  // Esperar que el botón Save esté habilitado y clickear
  cy.get('button[type="submit"]', { timeout: 20000 }).should('be.enabled').click()

  // Esperar toast de éxito
  cy.contains('Successfully Saved', { timeout: 30000 }).should('be.visible')
})
