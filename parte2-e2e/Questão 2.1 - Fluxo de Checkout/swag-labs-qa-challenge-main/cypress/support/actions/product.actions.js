Cypress.Commands.add('addProducts', (quantity = 1) => {
  for (let i = 0; i < quantity; i++) {
    cy.get('button')
      .contains('Add to cart')
      .first()
      .click()
  }
})


Cypress.Commands.add('checkQuantityInCart', (numberProducts) => {
  cy.get('.shopping_cart_badge').should('have.text', numberProducts)
})