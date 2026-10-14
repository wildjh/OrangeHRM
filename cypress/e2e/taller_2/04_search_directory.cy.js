describe("04 - Directory: Buscar Empleado", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.get('a[href*="directory/viewDirectory"]').click();
    cy.url().should("include", "/directory/viewDirectory");
  });

  it("HAPPY PATH - Buscar empleado existente", () => {
    cy.get('input[placeholder="Type for hints..."]').type("a");
    cy.get(".oxd-autocomplete-option", { timeout: 15000 }).first().click();
    cy.get('button[type="submit"]').click();

    cy.get(".orangehrm-directory-card", { timeout: 15000 }).should("exist");
    cy.get(".orangehrm-directory-card").should("have.length.at.least", 1);
    cy.get(".orangehrm-directory-card").first().should("be.visible");
  });

  it("NEGATIVO - Buscar empleado inexistente", () => {
    cy.get('input[placeholder="Type for hints..."]').type("zzzznoexiste");
    cy.get('button[type="submit"]').click();

    cy.get(".orangehrm-directory-card").should("not.exist");
    cy.url().should("include", "/directory/viewDirectory");
  });
});
