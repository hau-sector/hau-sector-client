const commands = {
  selectProperty() {
    cy.get('[data-test="header-property-select"]').click()
    cy.get('li.p-dropdown-item').first().click()
  },
}

Cypress.Commands.addAll(commands)

export type Commands = typeof commands
