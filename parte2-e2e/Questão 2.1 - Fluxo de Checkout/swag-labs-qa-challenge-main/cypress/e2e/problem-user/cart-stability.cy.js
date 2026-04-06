describe('Critical Flow - Cart Stability (problem_user)', () => {

  beforeEach(() => {
    cy.login('problem_user')
  })

  it('should not break cart when adding specific product', () => {

    cy.contains('Sauce Labs Fleece Jacket').click()
    cy.contains('Add to cart').click()
    cy.goToCart()

    cy.get('.cart_item').should('exist')
  })
})