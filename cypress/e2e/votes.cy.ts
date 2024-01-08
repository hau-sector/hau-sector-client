describe('Голосования', () => {
  beforeEach(() => {
    cy.visit('/votes')
    cy.selectProperty()
  })

  it('Пользователь может просматривать все голосования', () => {
    cy.get('[data-test="votes-list"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может проголосовать в актуальном голосовании', () => {
    cy.wait(100)

    cy.get('[data-test="vote-card"]')
      .first()
    cy.get('[data-test="vote-card-radiobutton"]')
      .first()
      .click()
    cy.get('[data-test="vote-card-button"]')
      .first()
      .click()
  })

  it('Пользователь может просмотреть распределение голосов в голосованиях', () => {
    cy.wait(100)

    cy.get('[data-test="vote-card"]')
      .last()
      .scrollIntoView()

    cy.get('[data-test="vote-card-chart"]')
      .last()
      .should('exist')
      .and('be.visible')
  })
})
