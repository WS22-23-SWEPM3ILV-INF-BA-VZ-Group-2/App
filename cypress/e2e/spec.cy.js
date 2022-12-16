describe('Register Tests', () => {
  it('should register', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('UnReveal').should('be.visible')
    cy.contains('Login').should('be.visible')
    cy.contains('Register').should('be.visible')

    cy.contains('Register').click()

    cy.get('[placeholder="Username"]').type('username')
    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('password')

    cy.intercept(`*register`, {
      statusCode: 201,
    })

    cy.contains("Let's go!").click()

    cy.contains('Login to your account').should('be.visible')
  })

  it('should not register with wrong username', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('Register').click()

    cy.get('[placeholder="Username"]').type('use')
    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('password')

    cy.contains("Let's go!").click()

    cy.contains('Invalid username.').should('be.visible')
  })

  it('should not register with wrong email', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('Register').click()

    cy.get('[placeholder="Username"]').type('username')
    cy.get('[placeholder="Email"]').type('emailemailcom')
    cy.get('[placeholder="Password"]').type('password')

    cy.contains("Let's go!").click()

    cy.contains('You did not enter a valid email.').should('be.visible')
  })

  it('should not register with wrong password', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('Register').click()

    cy.get('[placeholder="Username"]').type('Username')
    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('1234')

    cy.contains("Let's go!").click()

    cy.contains('Password is too short.').should('be.visible')
  })

  it('should display error alert when failed registration', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('UnReveal').should('be.visible')
    cy.contains('Login').should('be.visible')
    cy.contains('Register').should('be.visible')

    cy.contains('Register').click()

    cy.get('[placeholder="Username"]').type('username')
    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('password')

    cy.intercept(`*register`, {
      statusCode: 403,
    })

    cy.contains("Let's go!").click()

    cy.on('windows:alert', (str) => {
      expect(str).to.equal('Username or Email already taken, or invalid inputs')
    })
  })
})

describe('Login Tests', () => {
  it('should login', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('Login').click()

    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('password')

    cy.contains("Let's go!").click()

    cy.on('windows:alert', (str) => {
      expect(str).to.equal('Account created!')
    })
  })

  it('should not login with wrong email', () => {
    cy.visit(Cypress.env('BASE_URL'))

    cy.contains('Login').click()

    cy.get('[placeholder="Email"]').type('emailemailcom')
    cy.get('[placeholder="Password"]').type('password')

    cy.contains("Let's go!").click()

    cy.contains('Invalid email.').should('be.visible')
  })

  it('should not login with wrong password', () => {
    cy.visit(Cypress.env('BASE_URL'))
    cy.contains('UnReveal').should('be.visible')
    cy.contains('Login').should('be.visible')
    cy.contains('Register').should('be.visible')

    cy.contains('Login').click()

    cy.get('[placeholder="Email"]').type('email@email.com')
    cy.get('[placeholder="Password"]').type('1234')

    cy.contains("Let's go!").click()

    cy.contains('Password is too short.').should('be.visible')
  })
})
