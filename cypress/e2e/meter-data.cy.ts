describe('Внесение данных счетчиков', () => {
  beforeEach(() => {
    cy.visit('/register')
    cy.get('[data-test="meter-input"]')
    cy.wait(100)
  })

  it('Пользователь вносит данные о потреблении ресурсов через интерфейс приложения', () => {
    cy.get('[data-test="meter-input"]').first()
      .should('exist').and('be.visible')
      .type('200,30')

    cy.get('[data-test="meter-button"').first()
      .should('exist').and('be.visible')
      .click()

    cy.wait(100)

    cy.get('[data-test="meter-button-label"').first()
      .should('contain.text', 'Изменить')
  })

  it('Пользователь может скорректировать внесенные данные, если он совершил ошибку', () => {
    cy.get('[data-test="meter-input-value"]').first()
      .should('exist').and('be.visible')
      .type('200,30')

    cy.get('[data-test="meter-button"').first()
      .should('exist').and('be.visible')
      .click()

    cy.wait(100)

    cy.get('[data-test="meter-button-label"').first()
      .should('contain.text', 'Изменить')

    cy.get('[data-test="meter-input-value"]').first()
      .clear().type('666')

    cy.get('[data-test="meter-button"').first()
      .click()

    cy.wait(100)

    cy.get('[data-test="meter-input-value"]').first()
      .should('contain.value', '666')
  })

  it('Пользователь может просматривать историю внесенных данных', () => {
    cy.get('[data-test="register-view"]').scrollTo('bottom')

    cy.get('[data-test="meter-history-table"]')
      .should('exist').and('be.visible')
  })
})
