// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Custom Command for Create New Account
Cypress.Commands.add('createNewAccount', (firstname, lastname, email, password, passconfirm) => {
    cy.get('#firstname').type(firstname);
    cy.get('#lastname').type(lastname)
    cy.get('#email_address').type(email)
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(passconfirm)
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
}) 

//Custom Command for Verify Text
Cypress.Commands.add('verifyErrorMessage', (elemen, message) => {
    cy.get(elemen).should('contain.text', message)
})