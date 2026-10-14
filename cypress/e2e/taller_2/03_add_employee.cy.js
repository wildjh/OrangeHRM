describe('03 - PIM: Agregar Empleado', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123')
  })

  it('HAPPY PATH - Crear empleado con fixture y comando personalizado', () => {
    cy.fixture('employee').then((emp) => {
      cy.addEmployee(emp.firstName, emp.lastName)

      cy.get('.orangehrm-edit-employee-name', { timeout: 30000 })
        .should('be.visible')
        .and('contain', emp.fullName)

      cy.url().should('include', '/pim/viewPersonalDetails')

      // Screenshot en éxito
      cy.screenshot('03-add-employee-happy-path', { capture: 'viewport' })
    })
  })

  it('NEGATIVO - Guardar sin nombre ni apellido', () => {
    cy.visit('/web/index.php/pim/addEmployee', { timeout: 120000 })
    cy.get('form.oxd-form', { timeout: 30000 }).should('be.visible')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 2)
      .and('contain', 'Required')

    cy.screenshot('03-add-employee-negative', { capture: 'viewport' })
  })
})
