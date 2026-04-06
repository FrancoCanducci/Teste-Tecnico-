import { faker } from '@faker-js/faker'
import { valid } from '../../fixtures/cep.json'

describe('Critical Flow - Prevent Empty Checkout', () => {

  beforeEach(() => {
    cy.login('standard_user')
  })

  it('should not allow checkout without products', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    cy.goToCart()
    cy.startCheckout()

    cy.fillInformationsAndClickContinue({ first: firstName, last: lastName, postal: valid.cep })

    cy.contains('Finish').click()

    cy.contains('Thank you for your order!')
      .should('not.exist')
  })
})