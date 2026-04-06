import { valid } from '../../fixtures/cep.json'
import { faker } from '@faker-js/faker'

describe('Informations Validation', () => {

    beforeEach(() => {
        cy.login('standard_user')
        cy.addProducts(1)
        cy.goToCart()
        cy.startCheckout()
    })

    it('should require First Name', () => {
        const lastName = faker.person.lastName()
        cy.fillInformationsAndClickContinue({ last: lastName, postal: valid.cep })

        cy.validateErrorContains('Error: First Name is required')
    })

    it('should require Last Name', () => {
        const firstName = faker.person.firstName()

        cy.fillInformationsAndClickContinue({ first: firstName, postal: valid.cep })

        cy.validateErrorContains('Error: Last Name is required')
    })

    it('should require Postal Code', () => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        cy.fillInformationsAndClickContinue({ first: firstName, last: lastName })

        cy.validateErrorContains('Error: Postal Code is required')
    })

    it('should display an error if no field is filled in', () => {
        cy.fillInformationsAndClickContinue({})

        cy.validateErrorContains('Error: First Name is required')
    })
})