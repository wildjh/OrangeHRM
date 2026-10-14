describe('05 - Claim: Asignar Reclamo', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123')
    cy.visit('/web/index.php/claim/viewClaimModule', { timeout: 60000 })
    cy.url({ timeout: 20000 }).should('include', '/claim')
    cy.contains('button', 'Assign Claim', { timeout: 20000 }).should('be.visible')
  })

  it('HAPPY PATH - Formulario Assign Claim carga correctamente', () => {
    cy.contains('button', 'Assign Claim', { timeout: 20000 }).click()
    cy.url({ timeout: 15000 }).should('include', '/claim/assignClaim')
    cy.get('form.oxd-form', { timeout: 15000 }).should('be.visible')

    cy.get('input[placeholder="Type for hints..."]').should('exist')
    cy.get('form.oxd-form').should('contain', 'Event')
    cy.get('form.oxd-form').should('contain', 'Currency')

    cy.screenshot('05-claim-happy-1', { capture: 'viewport' })
  })

  it('HAPPY PATH - Seleccionar Event y Currency', () => {
    cy.contains('button', 'Assign Claim', { timeout: 20000 }).click()
    cy.get('form.oxd-form', { timeout: 15000 }).should('be.visible')

    cy.get('.oxd-select-text').first().click()
    cy.contains('.oxd-select-option', 'Travel Allowance').click()
    cy.get('.oxd-select-text').first().should('contain', 'Travel Allowance')

    cy.get('.oxd-select-text').eq(1).click()
    cy.contains('.oxd-select-option', 'Euro').click()
    cy.get('.oxd-select-text').eq(1).should('contain', 'Euro')

    cy.screenshot('05-claim-happy-2', { capture: 'viewport' })
  })

  it('NEGATIVO - Crear sin evento ni moneda', () => {
    cy.contains('button', 'Assign Claim', { timeout: 20000 }).click()

    cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
      .first()
      .clear()
      .type('manda', { delay: 150 })
    cy.get('.oxd-autocomplete-dropdown', { timeout: 15000 }).should('be.visible')
    cy.get('.oxd-autocomplete-option', { timeout: 15000 }).first().click()
    cy.wait(800)

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1)
      .and('be.visible')

    cy.screenshot('05-claim-negative', { capture: 'viewport' })
  })
})
