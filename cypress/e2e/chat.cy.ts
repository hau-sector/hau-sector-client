describe('Чат', () => {
  beforeEach(() => {
    cy.visit('/chat')
    cy.wait(100)
  })

  it('Пользователю доступен список жильцов его дома', () => {
    cy.get('[data-test="chat-contacts"]')
      .should('exist')
      .and('be.visible')
  })

  it('Пользователю доступна переписка жильцов дома', () => {
    cy.get('[data-test="chat-message-dialog"]')
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может отправлять сообщения в чат', () => {
    cy.get('[data-test="chat-input-area"]')
      .should('exist')
      .and('be.visible')
      .type('Тестовое сообщение')

    cy.get('[data-test="chat-button"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.get('[data-test="chat-message-dialog"]')
      .last()
      .should('contain.text', 'Тестовое сообщение')
  })
})
