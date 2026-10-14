describe('02 - Admin: Agregar Usuario', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123')
    // Con session, hay que navegar explícitamente
    cy.visit('/web/index.php/admin/viewSystemUsers', { timeout: 60000 })
    cy.get('.orangehrm-header-container', { timeout: 20000 }).should('be.visible')
  })

  it('HAPPY PATH - Formulario Add User carga correctamente', () => {
    cy.get('.orangehrm-header-container button', { timeout: 20000 }).contains('Add').click()

    cy.url({ timeout: 15000 }).should('include', '/admin/saveSystemUser')
    cy.get('form.oxd-form', { timeout: 15000 }).should('be.visible')

    cy.get('.oxd-select-text').should('have.length.at.least', 2)
    cy.get('input[placeholder="Type for hints..."]').should('exist')
    cy.get('input[type="password"]').should('have.length', 2)

    cy.get('form.oxd-form').should('contain', 'User Role')
    cy.get('form.oxd-form').should('contain', 'Employee Name')
    cy.get('form.oxd-form').should('contain', 'Username')
    cy.get('form.oxd-form').should('contain', 'Password')

    cy.contains('button', 'Save').should('be.visible')
    cy.contains('button', 'Cancel').should('be.visible')
  })

  it('HAPPY PATH - Seleccionar User Role y Status', () => {
    cy.get('.orangehrm-header-container button', { timeout: 20000 }).contains('Add').click()
    cy.get('form.oxd-form', { timeout: 15000 }).should('be.visible')

    cy.get('.oxd-select-text').first().click()
    cy.contains('.oxd-select-option', 'Admin').click()
    cy.get('.oxd-select-text').first().should('contain', 'Admin')

    cy.get('.oxd-select-text').eq(1).click()
    cy.contains('.oxd-select-option', 'Enabled').click()
    cy.get('.oxd-select-text').eq(1).should('contain', 'Enabled')
  })

  it('NEGATIVO - Guardar sin llenar campos obligatorios', () => {
    cy.get('.orangehrm-header-container button', { timeout: 20000 }).contains('Add').click()
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 2)
      .and('be.visible')

    cy.url().should('include', '/admin/saveSystemUser')
  })
})
