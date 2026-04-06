Cypress.Commands.add('goToCart', () => {
  cy.get('.shopping_cart_link').click()
})

Cypress.Commands.add('startCheckout', () => {
  cy.contains('Checkout').click()
})

Cypress.Commands.add('finishCheckout', () => {
  cy.contains('Finish').click()
})

Cypress.Commands.add('validateFinishCheckoutMessage', (value) => {
  cy.get('[data-test="complete-header"]')
    .should('be.visible')
    .and('contain', value)
})