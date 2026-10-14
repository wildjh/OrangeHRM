import './commands'

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Network Error')) return false
  if (err.message.includes('ResizeObserver')) return false
  if (err.message.includes('unhandled promise rejection')) return false
  return false
})
