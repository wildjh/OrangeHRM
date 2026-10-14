describe("01 - Login OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("HAPPY PATH - Login correcto con fixture", () => {
    cy.fixture("login").then((data) => {
      cy.get('input[name="username"]').type(data.validUser.username);
      cy.get('input[name="password"]').type(data.validUser.password);
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
      cy.get(".oxd-topbar-header-breadcrumb").should("be.visible");
      cy.get(".oxd-topbar-header-breadcrumb").should("contain", "Dashboard");
    });
  });

  it("NEGATIVO - Contraseña incorrecta", () => {
    cy.fixture("login").then((data) => {
      cy.get('input[name="username"]').type(data.invalidUser.username);
      cy.get('input[name="password"]').type(data.invalidUser.password);
      cy.get('button[type="submit"]').click();

      cy.get(".oxd-alert-content-text")
        .should("exist")
        .and("be.visible")
        .and("contain", "Invalid credentials");
    });
  });

  it("NEGATIVO - Campos vacíos", () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[name="username"]')
      .closest(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain", "Required");

    cy.get('input[name="password"]')
      .closest(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain", "Required");
  });
});
