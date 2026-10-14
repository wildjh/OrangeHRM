describe("06 - Demo de TODOS los localizadores en Cypress", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.get('a[href*="admin/viewAdminModule"]').click();
    cy.url().should("include", "/admin/viewSystemUsers");
  });

  it("Aplicar get, first, eq, last, filter, find, parent, next, nextAll, prev, prevAll", () => {
    cy.get(".oxd-table-body .oxd-table-card").should(
      "have.length.greaterThan",
      0,
    );
    cy.get(".oxd-table-body .oxd-table-card").first().should("be.visible");
    cy.get(".oxd-table-body .oxd-table-card").eq(1).should("exist");
    cy.get(".oxd-table-body .oxd-table-card").last().should("exist");
    cy.get(".oxd-table-body .oxd-table-card")
      .filter(':contains("Admin")')
      .should("have.length.at.least", 1);
    cy.get(".oxd-table-body .oxd-table-card")
      .first()
      .find(".oxd-table-cell")
      .should("have.length.greaterThan", 0);
    cy.get(".oxd-table-body .oxd-table-card")
      .first()
      .parent()
      .should("have.class", "oxd-table-body");
    cy.get(".oxd-table-body .oxd-table-card").first().next().should("exist");
    cy.get(".oxd-table-body .oxd-table-card")
      .first()
      .nextAll()
      .should("have.length.greaterThan", 0);
    cy.get(".oxd-table-body .oxd-table-card").last().prev().should("exist");
    cy.get(".oxd-table-body .oxd-table-card")
      .last()
      .prevAll()
      .should("have.length.greaterThan", 0);
  });
});
