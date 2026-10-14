import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Ignorar errores de red del servidor demo de OrangeHRM
  if (err.message.includes("Network Error")) return false;
  if (err.message.includes("ResizeObserver")) return false;
  if (err.message.includes("unhandled promise rejection")) return false;
  return false;
});
