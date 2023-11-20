describe('header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be visible', () => {
    cy.get('[data-test="header-component"]')
      .should('exist')
      .and('be.visible')
  })

  it('should have avatar', () => {
    cy.get('[data-test="header-avatar"]')
      .should('exist')
      .and('be.visible')
  })

  it('should have property select', () => {
    cy.get('[data-test="header-property-select"]')
      .should('exist')
      .and('be.visible')
  })
})
