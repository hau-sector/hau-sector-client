describe('Домашняя страница', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.selectProperty()
  })

  it('Пользователь может просматривать информацию по текущему балансу на главной странице', () => {
    cy.get('[data-test="home-balance"]')
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может просматривать актуальные сообщения в чате на главной странице и оперативно отвечать на них', () => {
    cy.get('[data-test="home-chat"]')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')

    cy.get('[data-test="home-chat-input"]')
      .should('exist')
      .and('be.visible')
      .type('Тестовое сообщение')

    cy.get('[data-test="home-chat-button"]')
      .should('exist')
      .and('be.visible')
      .click()

    cy.get('[data-test="home-chat-messages"]')
      .last()
      .should('contain.text', 'Тестовое сообщение')

    cy.get('[data-test="home-chat"]')
      .scrollIntoView()
  })

  it('Пользователь может просматривать информацию по показаниям счетчика на главной странице', () => {
    cy.get('[data-test="home-meter"]')
      .first()
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может просматривать актуальные голосования на главной странице', () => {
    cy.get('[data-test="home-votes"]')
      .first()
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может просматривать актуальные новости на главной странице', () => {
    cy.get('[data-test="home-news"]')
      .first()
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })

  it('Пользователь может просматривать актуальные заявки на главной странице', () => {
    cy.get('[data-test="home-issues"]')
      .first()
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
  })
})
