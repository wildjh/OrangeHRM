describe("01 - Login OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    cy.get('input[placeholder="Username"]', { timeout: 10000 }).should("be.visible");
  });

  it("HAPPY PATH - Login correcto con fixture", () => {
    cy.fixture("login").then((data) => {
      cy.get('input[placeholder="Username"]').clear().type(data.validUser.username);
      cy.get('input[placeholder="Password"]').clear().type(data.validUser.password);
      cy.get('button[type="submit"]').click();

      cy.url({ timeout: 10000 }).should("include", "/dashboard");
      cy.get(".oxd-topbar-header-breadcrumb-module", { timeout: 10000 })
        .should("be.visible")
        .and("contain", "Dashboard");

      cy.screenshot("01-login-happy-path", { capture: "viewport" });
    });
  });

  it("NEGATIVO - Contraseña incorrecta", () => {
    cy.fixture("login").then((data) => {
      cy.get('input[placeholder="Username"]').clear().type(data.invalidUser.username);
      cy.get('input[placeholder="Password"]').clear().type(data.invalidUser.password);
      cy.get('button[type="submit"]').click();

      cy.get(".oxd-alert-content-text", { timeout: 10000 })
        .should("exist")
        .and("be.visible")
        .and("contain", "Invalid credentials");

      cy.screenshot("01-login-negative-password", { capture: "viewport" });
    });
  });

  it("NEGATIVO - Campos vacíos", () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[placeholder="Username"]')
      .closest(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain", "Required");

    cy.get('input[placeholder="Password"]')
      .closest(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain", "Required");

    cy.screenshot("01-login-negative-empty", { capture: "viewport" });
  });
});
