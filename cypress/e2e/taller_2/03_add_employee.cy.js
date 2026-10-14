describe("03 - PIM: Agregar Empleado", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
  });

  it("HAPPY PATH - Crear empleado con fixture y comando personalizado", () => {
    cy.fixture("employee").then((emp) => {
      cy.addEmployee(emp.firstName, emp.lastName);

      cy.get(".orangehrm-edit-employee-name", { timeout: 15000 })
        .should("be.visible")
        .and("contain", emp.fullName);

      cy.url().should("include", "/pim/viewPersonalDetails");
    });
  });

  it("NEGATIVO - Guardar sin nombre ni apellido", () => {
    cy.get('a[href*="pim/viewPimModule"]').click();
    cy.contains("a", "Add Employee").click();
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 2)
      .and("contain", "Required");
  });
});
