describe('04 - Directory: Buscar Empleado', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123')
    cy.visit('/web/index.php/directory/viewDirectory', { timeout: 60000 })
    cy.url({ timeout: 20000 }).should('include', '/directory/viewDirectory')
    cy.get('form.oxd-form', { timeout: 20000 }).should('be.visible')
  })

  it('HAPPY PATH - Buscar empleado existente', () => {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
      .clear()
      .type('a', { delay: 100 })

    cy.get('.oxd-autocomplete-dropdown', { timeout: 20000 }).should('be.visible')
    cy.get('.oxd-autocomplete-option', { timeout: 20000 }).first().click()

    cy.get('button[type="submit"]').click()

    cy.get('.orangehrm-directory-card', { timeout: 20000 }).should('exist')
    cy.get('.orangehrm-directory-card').should('have.length.at.least', 1)
    cy.get('.orangehrm-directory-card').first().should('be.visible')
  })

  it('NEGATIVO - Empleado inexistente no aparece en el autocomplete', () => {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
      .clear()
      .type('zzzznoexiste', { delay: 100 })

    // El autocomplete no debe mostrar opciones para un nombre que no existe
    cy.get('.oxd-autocomplete-option').should('not.exist')

    // Y seguimos en Directory
    cy.url().should('include', '/directory/viewDirectory')
  })
})
