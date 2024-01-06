import createAccountPage from "../../support/pageObject/Luma/createAccount.page";
import createAccountFixtures from "../../fixtures/Luma/createAccountFixtures.json";

describe('Verifiy Create Account', () => {
  beforeEach(() => {
    cy.visit('')
    cy.url().should ('eq', 'https://magento.softwaretestingboard.com/')
    cy.get('.panel > .header > :nth-child(3) > a').should('contain.text','Create an Account')
    cy.get('.panel > .header > :nth-child(3) > a').click()
    cy.url().should ('eq','https://magento.softwaretestingboard.com/customer/account/create/')
  });

  it('TC001_Verify Page Create Account', () => {
    cy.contains('Create New Customer Account').should('be.visible')
    cy.contains('Personal Information').should('be.visible')
    cy.get('.field-name-firstname > .label > span').should('have.text','First Name')
    cy.get('#firstname').should('be.visible')
    cy.get('.field-name-lastname > .label > span').should('have.text','Last Name')
    cy.get('#lastname').should('be.visible')
    cy.contains('Sign-in Information').should('be.visible')
    cy.get(':nth-child(3) > .label').should('have.text','Email')
    cy.get('#email_address').should('be.visible')
    cy.get('.account > .password > .label > span').should('have.text','Password')
    cy.get('#password').should('be.visible')
    cy.get('.confirmation > .label > span').should('have.text','Confirm Password')
    cy.get('#password-confirmation').should('be.visible')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').should('be.visible')
    cy.screenshot('SS_TC001')
  })

  it('TC002_Verify Create Account Successfully', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing001124@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-success').should ('contain.text','Thank you for registering with Main Website Store.')
    cy.get('#block-collapsible-nav').should('be.visible')
    cy.get('.block-dashboard-info').should ('contain.text','Account Information')
    cy.get('.block-dashboard-addresses').should ('contain.text','Address Book')
    cy.screenshot('SS_TC002')
  })
  
  //with custom commands
 it('TC003_Verify Failed Create Account - Invalid First Name', () => {
    cy.createNewAccount('Testing@123', 'Indriyani', 'Testing1117@gmail.com', 'P@ssw0rd', 'P@ssw0rd') 
    cy.verifyErrorMessage('.message-error','First Name is not valid!')
  })

 it('TC004_Verify Failed Create Account - First Name diisi spasi', () => {
    cy.createNewAccount(' ', 'Indriyani', 'Testing1118@gmail.com', 'P@ssw0rd', 'P@ssw0rd') 
    cy.verifyErrorMessage('#firstname-error','This is a required field')
  })

  it('TC005_Verify Failed Create Account - First Name disii Spesial Karakter', () => {
    cy.createNewAccount('@-?!%-', 'Indriyani', 'Testing1119@gmail.com', 'P@ssw0rd', 'P@ssw0rd') 
    cy.verifyErrorMessage('.message-error','First Name is not valid!')
  })

  //with page object model
  it('TC006_Verify Failed Create Account - Invalid Last Name', () => {
    cy.get(createAccountPage.firstname).type('Nurul Dini')
    cy.get(createAccountPage.lastname).type('Testing123@')
    cy.get(createAccountPage.email).type('Testing1123@gmail.com')
    cy.get(createAccountPage.password).type('P@ssw0rd123')
    cy.get(createAccountPage.confirmPassword).type('P@ssw0rd123')
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg1('Last Name is not valid!')
  })

  it('TC007_Verify Failed Create Account - Last Name diisi spasi', () => {
    cy.get(createAccountPage.firstname).type('Nurul Dini')
    cy.get(createAccountPage.lastname).type(' ')
    cy.get(createAccountPage.email).type('Testing1124@gmail.com')
    cy.get(createAccountPage.password).type('P@ssw0rd123')
    cy.get(createAccountPage.confirmPassword).type('P@ssw0rd123')
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg2('This is a required field')
  })

  it('TC008_Verify Failed Create Account - Last Name dikosongkan', () => {
    cy.get(createAccountPage.firstname).type('Nurul Dini')
    cy.get(createAccountPage.lastname).type('Indriyani')
    cy.get(createAccountPage.lastname).clear()
    cy.get(createAccountPage.email).type('Testing1124@gmail.com')
    cy.get(createAccountPage.password).type('P@ssw0rd123')
    cy.get(createAccountPage.confirmPassword).type('P@ssw0rd123')
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg2('This is a required field')
  })
  
  it('TC009_Verify Failed Create Account - Last Name spesial karakter', () => {
    cy.get(createAccountPage.firstname).type('Nurul Dini')
    cy.get(createAccountPage.lastname).type('@-?!%^&')
    cy.get(createAccountPage.email).type('Testing1125@gmail.com')
    cy.get(createAccountPage.password).type('P@ssw0rd123')
    cy.get(createAccountPage.confirmPassword).type('P@ssw0rd123')
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg1('Last Name is not valid!')
  })

  //with fixtures
  it('TC010_Verify Failed Create Account - Email Sudah Terdaftar', () => {
    cy.get('#firstname').type(createAccountFixtures.validFirstName)
    cy.get('#lastname').type(createAccountFixtures.validLastName)
    cy.get('#email_address').type(createAccountFixtures.registeredEmail)
    cy.get('#password').type(createAccountFixtures.validPassword)
    cy.get('#password-confirmation').type(createAccountFixtures.validPassword)
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg1(createAccountFixtures.errorMessage[1])
  })

  it('TC011_Verify Failed Create Account - Invalid Email', () => {
    cy.get(createAccountPage.firstname).type(createAccountFixtures.validFirstName)
    cy.get(createAccountPage.lastname).type(createAccountFixtures.validLastName)
    cy.get(createAccountPage.email).type(createAccountFixtures.invalidEmail)
    cy.get(createAccountPage.password).type(createAccountFixtures.validPassword)
    cy.get(createAccountPage.confirmPassword).type(createAccountFixtures.validPassword)
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg3(createAccountFixtures.errorMessage[2])
  })

  it('TC012_Verify Failed Create Account - Email diisi spasi', () => {
    cy.get(createAccountPage.firstname).type(createAccountFixtures.validFirstName)
    cy.get(createAccountPage.lastname).type(createAccountFixtures.validLastName)
    cy.get(createAccountPage.email).type(createAccountFixtures.spasiEmail)
    cy.get(createAccountPage.password).type(createAccountFixtures.validPassword)
    cy.get(createAccountPage.confirmPassword).type(createAccountFixtures.validPassword)
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg3(createAccountFixtures.errorMessage[3])
  })

  it('TC013_Verify Failed Create Account - Email dikosongkan', () => {
    cy.get(createAccountPage.firstname).type(createAccountFixtures.validFirstName)
    cy.get(createAccountPage.lastname).type(createAccountFixtures.validLastName)
    cy.get(createAccountPage.email).type(createAccountFixtures.validEmail)
    cy.get(createAccountPage.email).clear()
    cy.get(createAccountPage.password).type(createAccountFixtures.validPassword)
    cy.get(createAccountPage.confirmPassword).type(createAccountFixtures.validPassword)
    createAccountPage.clickSubmitBtn()
    createAccountPage.verifyErrorMsg3(createAccountFixtures.errorMessage[3])
  })
  
  it('TC014_Verify Failed Create Account - Password Hanya diisi oleh Angka', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('12345678')
    cy.get('#password-confirmation').type('12345678')
    createAccountPage.clickSubmitBtn()
    cy.get('#password-error').should ('contain.text','Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
  })

  it('TC015_Verify Failed Create Account - Password Hanya diisi < 8 Karakter', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@s1')
    cy.get('#password-confirmation').type('P@s1')
    createAccountPage.clickSubmitBtn
    cy.get('#password-error').should ('contain.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
  })

  it('TC016_Verify Failed Create Account - Password with classes of characters < 3', () => {
      cy.get('#firstname').type('Nurul Dini')
      cy.get('#lastname').type('Indriyani')
      cy.get('#email_address').type('Testing1127@gmail.com')
      cy.get('#password').type('T3ST1NG4J4')
      cy.get('#password-confirmation').type('T3ST1NG4J4')
      createAccountPage.clickSubmitBtn()
      cy.get('#password-error').should ('contain.text','Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.') 
  })

  it('TC017_Verify Failed Create Account - Password diisi spasi', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type(' ')
    cy.get('#password-confirmation').type(' ')
    createAccountPage.clickSubmitBtn()
    cy.get('#password-error').should ('contain.text','This is a required field.') 
  })

  it('TC018_Verify Failed Create Account - Password dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password').clear()
    cy.get('#password-confirmation').type('P@ssw0rd123')
    createAccountPage.clickSubmitBtn()
    cy.get('#password-error').should ('contain.text','This is a required field.') 
  })

  it('TC019_Verify Failed Create Account - Password Konfirmasi Tidak Sesuai', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd12')
    createAccountPage.clickSubmitBtn()
    cy.get('#password-confirmation-error').should ('contain.text','Please enter the same value again.')
  })

  it('TC020_Verify Failed Create Account - Password Konfirmasi diisi spasi', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type(' ')
    createAccountPage.clickSubmitBtn()
    cy.get('#password-confirmation-error').should ('contain.text','This is a required field.')
  })

  it('TC021_Verify Failed Create Account - Password Konfirmasi dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini')
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#password-confirmation').clear()
    createAccountPage.clickSubmitBtn()
    cy.get('#password-confirmation-error').should ('contain.text','This is a required field.')
  })
})

//Mohon maaf jika penulisan scipt diatas tidak seragam, 
//Agar dapat penerapan penggunaan Configuration, Command, POM, Fixtures dalam satu fiture di cypress ^_^