describe("02 - Admin: Agregar Usuario", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.get('a[href*="admin/viewAdminModule"]').click();
    cy.url().should("include", "/admin/viewSystemUsers");
  });

  it("HAPPY PATH - Crear usuario Admin correctamente", () => {
    cy.contains("button", "Add").click();
    cy.url().should("include", "/admin/saveSystemUser");

    // User Role: Admin
    cy.get(".oxd-select-text").first().click();
    cy.contains(".oxd-select-option", "Admin").click();

    // Employee Name (autocomplete) - esperar opciones
    cy.get('input[placeholder="Type for hints..."]').first().type("a");
    cy.get(".oxd-autocomplete-option", { timeout: 20000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    // Status: Enabled
    cy.get(".oxd-select-text").eq(1).click();
    cy.contains(".oxd-select-option", "Enabled").click();

    // Username: único con timestamp
    cy.get(".oxd-input-group")
      .filter(':contains("Username")')
      .find("input")
      .type(`user_${Date.now()}`);

    // Passwords
    cy.get('input[type="password"]').eq(0).type("Password123!");
    cy.get('input[type="password"]').eq(1).type("Password123!");

    cy.get('button[type="submit"]').click();

    // Esperar el toast con timeout largo
    cy.get(".oxd-toast", { timeout: 20000 })
      .should("exist")
      .and("contain", "Successfully Saved");
  });

  it("NEGATIVO - Guardar sin llenar campos obligatorios", () => {
    cy.contains("button", "Add").click();
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 2)
      .and("contain", "Required");
  });
});
