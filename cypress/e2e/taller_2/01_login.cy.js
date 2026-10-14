describe("01 - Login OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("HAPPY PATH - Login correcto con fixture", () => {
    cy.fixture("login").then((data) => {
      cy.get('input[name="username"]').type(data.validUser.username);
      cy.get('input[name="password"]').type(data.validUser.password);
      cy.get('button[type="submit"]').click();

      // Aserción 1: URL contiene /dashboard
      cy.url({ timeout: 20000 }).should("include", "/dashboard");

      // Aserción 2: el nombre del usuario logueado aparece en la barra
      cy.get(".oxd-userdropdown-name", { timeout: 20000 })
        .should("exist")
        .and("be.visible")
        .and("not.be.empty");

      // Aserción 3: el menú lateral está cargado
      cy.get(".oxd-main-menu", { timeout: 20000 }).should("exist");
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

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 2)
      .and("be.visible");

    cy.url().should("include", "/auth/login");
  });
});
