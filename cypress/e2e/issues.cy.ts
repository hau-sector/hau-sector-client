describe('Заявки на ТО', () => {
  beforeEach(() => {
    cy.visit('/issues')
    cy.selectProperty()
  })

  it('Пользователь может создать заявку на техническое обслуживание', () => {
    cy.get('[data-test="issue-form"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="issue-form-input-header"]')
      .should('exist')
      .and('be.visible')
      .type('Тестовый заголовок')

    cy.get('[data-test="issue-form-text"]')
      .should('exist')
      .and('be.visible')
      .type('Тестовая заявка')

    cy.get('[data-test="issue-form-button"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.get('[data-test="issue-card"]')
      .first()
      .should('contain.text', 'Тестовый заголовокТестовая заявка')
  })

  it('Пользователю доступна история ранее созданных заявок', () => {
    cy.get('[data-test="issue-list"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })
})
