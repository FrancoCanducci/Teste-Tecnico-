import { informationsSelectors as sel } from '../selectors/informations.selectors'

Cypress.Commands.add('fillInformationsAndClickContinue', ({ first, last, postal, submit = true }) => {

  if (first !== undefined) {
    cy.get(sel.firstName).clear().type(first)
  }
  if (last !== undefined) {
    cy.get(sel.lastName).clear().type(last)
  }
  if (postal !== undefined) {
    cy.get(sel.postalCode).clear().type(postal)
  }
  if (submit) {
    cy.get(sel.continueButton).click()
  }
})