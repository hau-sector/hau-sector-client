describe('Начисление и платежи', () => {
  beforeEach(() => {
    cy.visit('/payments')
    cy.selectProperty()
  })

  it('Пользователь может следить за своим балансом в режиме реального времени', () => {
    cy.get('[data-test="balance-info"]')
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может оплатить всю сумму задолженности единоразово', () => {
    cy.get('[data-test="balance-full-amount-button"]')
      .should('exist')
      .and('be.visible')
      .click()
  })

  it('Пользователь оплачивает выставленные счета, используя наиболее удобный для него способ', () => {
    cy.get('[data-test="balance-full-amount-button"]').click()

    cy.get('[data-test="balance-payment-sber"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.get('[data-test="balance-payment-no"]').click()

    cy.get('[data-test="balance-payment-card"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.get('[data-test="balance-payment-no"]').click()
  })

  it('Пользователь получает уведомление об успешно совершенном платеже', () => {
    cy.get('[data-test="balance-full-amount-button"]').click()
    cy.get('[data-test="balance-payment-card"]').click()
    cy.get('[data-test="balance-payment-yes"]').click()

    cy.get('[data-test="balance-payment-toast"]')
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может просматривать историю выставленных счетов', () => {
    cy.get('[data-test="payment-history-table"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может выбирать период просмотра счетов', () => {
    cy.get('[data-test="payment-history-select"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="payment-history-calendar"]')
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="payment-history-select-button"]')
      .last()
      .click()

    cy.wait(100)

    cy.get('[data-test="payment-history-select-button"][data-p-highlight="true"]')
      .should('exist')
  })
})
