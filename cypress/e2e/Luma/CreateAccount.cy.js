describe('Verifiy Create Account', () => {
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/')
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
    cy.screenshot('Create New Customer Account')
  })

  it('TC002_Verify Create Account Successfully', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1145@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-success').should ('contain.text','Thank you for registering with Main Website Store.')
    cy.get('#block-collapsible-nav').should('be.visible')
    cy.get('.block-dashboard-info').should ('contain.text','Account Information')
    cy.get('.block-dashboard-addresses').should ('contain.text','Address Book')
  })
  
 it('TC003_Verify Failed Create Account - Invalid First Name', () => {
    cy.get('#firstname').type('Testing@123');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1117@gmail.com')
    cy.get('#password').type('P@ssw0rd')
    cy.get('#password-confirmation').type('P@ssw0rd')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error').should ('contain.text','First Name is not valid!')
  })

 it('TC004_Verify Failed Create Account - First Name dikosongkan', () => {
    cy.get('#firstname').type(' ');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1118@gmail.com')
    cy.get('#password').type('P@ssw0rd')
    cy.get('#password-confirmation').type('P@ssw0rd')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#firstname-error').should ('contain.text','This is a required field')
  })

  it('TC005_Verify Failed Create Account - First Name disii Spesial Karakter', () => {
    cy.get('#firstname').type('@-?!%-');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1119@gmail.com')
    cy.get('#password').type('P@ssw0rd')
    cy.get('#password-confirmation').type('P@ssw0rd')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error').should ('contain.text','First Name is not valid!')
  })

  it('TC006_Verify Failed Create Account - Invalid Last Name', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Testing123@')
    cy.get('#email_address').type('Testing1123@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error').should ('contain.text','Last Name is not valid!')
  })

  it('TC007_Verify Failed Create Account - Last Name dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type(' ')
    cy.get('#email_address').type('Testing1124@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#lastname-error').should ('contain.text','This is a required field')
  })

  it('TC008_Verify Failed Create Account - Last Name spesial karakter', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('@-?!%^&')
    cy.get('#email_address').type('Testing1125@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error').should ('contain.text','Last Name is not valid!')
  })

  it('TC009_Verify Failed Create Account - Email Sudah Terdaftar', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1111@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error > div').should('contain.text','There is already an account')
  })

  it('TC010_Verify Failed Create Account - Invalid Email', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing123')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#email_address-error').should ('contain.text','Please enter a valid email address (Ex: johndoe@domain.com).')
  })

  it('TC011_Verify Failed Create Account - Email dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type(' ')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd123')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#email_address-error').should ('contain.text','This is a required field.')
  })
  
  it('TC012_Verify Failed Create Account - Password Hanya diisi oleh Angka', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('12345678')
    cy.get('#password-confirmation').type('12345678')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-error').should ('contain.text','Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
  })

  it('TC013_Verify Failed Create Account - Password Hanya diisi < 8 Karakter', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@s1')
    cy.get('#password-confirmation').type('P@s1')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-error').should ('contain.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
  })

  it('TC014_Verify Failed Create Account - Password with classes of characters < 3', () => {
      cy.get('#firstname').type('Nurul Dini');
      cy.get('#lastname').type('Indriyani')
      cy.get('#email_address').type('Testing1127@gmail.com')
      cy.get('#password').type('T3ST1NG4J4')
      cy.get('#password-confirmation').type('T3ST1NG4J4')
      cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
      cy.get('#password-error').should ('contain.text','Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.') 
  })

  it('TC015_Verify Failed Create Account - Password dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type(' ')
    cy.get('#password-confirmation').type(' ')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-error').should ('contain.text','This is a required field.') 
  })

  it('TC016_Verify Failed Create Account - Password Konfirmasi Tidak Sesuai', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type('P@ssw0rd12')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-confirmation-error').should ('contain.text','Please enter the same value again.')
  })

  it('TC017_Verify Failed Create Account - Password Konfirmasi dikosongkan', () => {
    cy.get('#firstname').type('Nurul Dini');
    cy.get('#lastname').type('Indriyani')
    cy.get('#email_address').type('Testing1127@gmail.com')
    cy.get('#password').type('P@ssw0rd123')
    cy.get('#password-confirmation').type(' ')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-confirmation-error').should ('contain.text','This is a required field.')
  })
})