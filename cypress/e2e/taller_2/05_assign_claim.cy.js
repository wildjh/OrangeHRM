describe("05 - Claim: Asignar Reclamo", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.get('a[href*="claim/viewClaimModule"]').click();
  });

  it("HAPPY PATH - Asignar un claim con fixture", () => {
    cy.fixture("claim").then((data) => {
      cy.contains("button", "Assign Claim").click();

      cy.get('input[placeholder="Type for hints..."]').first().type("a");
      cy.get(".oxd-autocomplete-option", { timeout: 15000 }).first().click();

      cy.get(".oxd-select-text").first().click();
      cy.contains(".oxd-select-option", data.event).click();

      cy.get(".oxd-select-text").eq(1).click();
      cy.contains(".oxd-select-option", data.currency).click();

      cy.get(".oxd-textarea").type(data.remarks);

      cy.get('button[type="submit"]').click();

      cy.get(".oxd-toast", { timeout: 15000 }).should(
        "contain",
        "Successfully Saved",
      );
      cy.url().should("include", "/claim/assignClaim");
    });
  });

  it("NEGATIVO - Crear sin evento ni moneda", () => {
    cy.contains("button", "Assign Claim").click();

    cy.get('input[placeholder="Type for hints..."]').first().type("a");
    cy.get(".oxd-autocomplete-option", { timeout: 15000 }).first().click();

    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 1)
      .and("contain", "Required");
  });
});
