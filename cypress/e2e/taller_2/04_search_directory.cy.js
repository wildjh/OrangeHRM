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

    cy.screenshot('04-directory-happy-path', { capture: 'viewport' })
  })

  it('NEGATIVO - Búsqueda sin seleccionar empleado válido', () => {
    // Escribir un texto SIN seleccionar del autocomplete
    cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
      .clear()
      .type('zzzznoexiste', { delay: 100 })

    // Intentar buscar sin haber seleccionado una opción del dropdown
    cy.get('button[type="submit"]').click()

    // Aserción 1: el input sigue con el texto (no se vinculó a un empleado)
    cy.get('input[placeholder="Type for hints..."]')
      .should('have.value', 'zzzznoexiste')

    // Aserción 2: la URL no cambió (no navegó a resultados filtrados)
    cy.url().should('include', '/directory/viewDirectory')

    cy.screenshot('04-directory-negative', { capture: 'viewport' })
  })
})
