describe("05 - Claim: Asignar Reclamo", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.get('a[href*="claim/viewClaimModule"]', { timeout: 25000 }).click();
    cy.url({ timeout: 20000 }).should("include", "/claim/viewClaimModule");

    // ESPERAR a que el botón Assign Claim esté visible
    cy.contains("button", "Assign Claim", { timeout: 25000 }).should(
      "be.visible",
    );
  });

  it("HAPPY PATH - Asignar un claim con fixture", () => {
    cy.fixture("claim").then((data) => {
      cy.contains("button", "Assign Claim", { timeout: 25000 }).click();
      cy.url().should("include", "/claim/assignClaim");

      // Empleado
      cy.get('input[placeholder="Type for hints..."]', { timeout: 25000 })
        .first()
        .type("a");
      cy.get(".oxd-autocomplete-option", { timeout: 25000 })
        .should("have.length.greaterThan", 0)
        .first()
        .click();

      // Evento
      cy.get(".oxd-select-text").first().click();
      cy.contains(".oxd-select-option", data.event).click();

      // Moneda
      cy.get(".oxd-select-text").eq(1).click();
      cy.contains(".oxd-select-option", data.currency).click();

      // Remarks
      cy.get(".oxd-textarea").type(data.remarks);

      cy.get('button[type="submit"]').click();

      cy.get(".oxd-toast", { timeout: 25000 })
        .should("exist")
        .and("contain", "Successfully Saved");
    });
  });

  it("NEGATIVO - Crear sin evento ni moneda", () => {
    cy.contains("button", "Assign Claim", { timeout: 25000 }).click();

    cy.get('input[placeholder="Type for hints..."]', { timeout: 25000 })
      .first()
      .type("a");
    cy.get(".oxd-autocomplete-option", { timeout: 25000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 1)
      .and("be.visible");
  });
});
