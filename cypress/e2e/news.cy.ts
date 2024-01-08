describe('Новости', () => {
  beforeEach(() => {
    cy.visit('/news')
    cy.selectProperty()
  })

  it('Пользователю доступен список новостей', () => {
    cy.get('[data-test="news-view"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="news-card"]')
      .first()
      .should('exist')
      .and('be.visible')
  })
})
