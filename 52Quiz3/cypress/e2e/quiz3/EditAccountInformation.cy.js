// cypress/integration/magento_test.spec.js

describe('Magento Automation Testing', () => {
  it('should login, go to My Account, and edit account information', () => {
    // Kunjungi halaman login
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');

    // Masukkan informasi login
    cy.get('#email').type('wahyuningsihtrihesti7@gmail.com');
    cy.get('#pass').type('@trihesti123');

    // Klik tombol login
    cy.get('#send2').click();

    // Verifikasi login berhasil
    cy.url().should('include', '/customer/account/');

    // Klik My Account
    cy.get('.current > strong').click();

    // Klik Edit Account Information
    cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click();

    // Lakukan perubahan informasi akun
    cy.get('#firstname').clear().type('hesti');
    cy.get('#lastname').clear().type('wahyu');

    // Klik tombol Save
    cy.get('button[title="Save"]').click();

    // Verifikasi perubahan berhasil disimpan
    cy.get('.message-success > div').should('exist');
  });
});
