describe('Внесение данных счетчиков', () => {
  beforeEach(() => {
    cy.visit('/register')
    cy.get('[data-test="meter-input"]')
    cy.wait(100)
  })

  it('Пользователь вносит данные о потреблении ресурсов через интерфейс приложения',
    () => {
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

  it('Пользователь может скорректировать внесенные данные, если он совершил ошибку',
    () => {
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
        .clear().type('111')

      cy.get('[data-test="meter-button"').first()
        .click()

      cy.wait(100)

      cy.get('[data-test="meter-input-value"]').first()
        .should('contain.value', '111')
    })

  it('Пользователь может просматривать историю внесенных данных',
    () => {
      cy.get('[data-test="meter-history-table"]')
        .scrollIntoView()
        .should('exist')
        .and('be.visible')
    })

  it('Пользователь может выбирать период просмотра истории',
    () => {
      cy.get('[data-test="meter-history-select"]')
        .scrollIntoView()
        .should('exist')
        .and('be.visible')

      cy.get('[data-test="meter-history-calendar"]')
        .should('exist')
        .and('be.visible')

      cy.get('[data-test="meter-history-select-button"]')
        .last()
        .click()

      cy.wait(100)

      cy.get('[data-test="meter-history-select-button"][data-p-highlight="true"]')
        .should('exist')
    })

  it('Пользователь имеет доступ к наглядной информации по выставленным счетам',
    () => {
      cy.get('[data-test="meter-history-chart"]')
        .scrollIntoView()
        .should('exist')
        .and('be.visible')
    })
})
