const commands = {
  selectProperty() {
    cy.wait(500)
    cy.get('[data-test="header-property-select"]').click()
    cy.get('li.p-dropdown-item').first().click()
  },
}

Cypress.Commands.addAll(commands)

export type Commands = typeof commands
