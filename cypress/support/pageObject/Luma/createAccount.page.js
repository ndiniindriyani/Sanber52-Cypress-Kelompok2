class createAccountPage{
  firstname = '#firstname'
  lastname = '#lastname'
  email = '#email_address'
  password = '#password'
  confirmPassword ='#password-confirmation'
  submitBtn ='#form-validate > .actions-toolbar > div.primary > .action'
  errorMsg = '.message-error'
  lastnameError ='#lastname-error'

  clickSubmitBtn(){
    cy.get(this.submitBtn).click()
  }

  verifyErrorMsg1(msg){
    cy.get(this.errorMsg). should('contain.text', msg)
  }

  verifyErrorMsg2(msg){
    cy.get(this.lastnameError). should('contain.text', msg)
  }
}

export default new createAccountPage()