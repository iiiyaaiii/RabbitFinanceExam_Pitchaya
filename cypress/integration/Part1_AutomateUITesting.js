// Part1_AutomateUITesting.js created with Cypress
describe('User select health insurances and fill in details', function() {
  it('User select Personal Accident and fill in all details succesfully', function() {
     cy.visit(Cypress.env('staging_env') )
     cy.get('#product_category > :nth-child(2) > .row > :nth-child(3)').click()//Click Personal Accident
     cy.get('#product_accident_subcategory > :nth-child(2) > .row > :nth-child(4)').click()//Click
     cy.get('#customer_phone > .form-group > .row > :nth-child(2)').type(Cypress.env('customer_phone'))
     cy.get('#customer_phone > :nth-child(2) > .col-12 > .btn').click() //#custermer-phone NEXT btn
     cy.get('#customer_first_name > .row > :nth-child(2').type(Cypress.env('customer_first_name'))
     cy.get('#customer_last_name > .row > :nth-child(2').type(Cypress.env('customer_last_name'))
     cy.get(':nth-child(3) > .col-12 > .btn').click() //#custermer-first-lastname NEXT btn
     cy.get('#email').type(Cypress.env('customer_email'))
     cy.get('#customer_email > :nth-child(2) > .col-12 > .btn').click() //#custermer-email NEXT btn
     cy.get('#customer_gender > :nth-child(2) > .row > :nth-child(2) > .form-check > .form-check-label').click()//Select Female
     cy.get('#customer_dob > .form-group > .row > :nth-child(2) > .form-control').type(Cypress.env('customer_dob'))
     cy.get('#customer_dob > :nth-child(2) > .col-12 > .btn').click() //#custermer-dob NEXT btn
     cy.get('.mx-auto > .row > :nth-child(1) > .form-check > .form-check-label').click()
     cy.get('#btn-marketing-consent').should('be.visible').click()
   })

   it('User select Personal Accident and fill in invalid phonenumber', function() {
      cy.visit(Cypress.env('staging_env') )
      cy.get('#product_category > :nth-child(2) > .row > :nth-child(3)').click()
      cy.get('#product_accident_subcategory > :nth-child(2) > .row > :nth-child(4)').click()
      cy.get('#customer_phone > .form-group > .row > :nth-child(2)').type('12345')
      cy.get('.invalid-feedback').should('have.text','Please enter a valid phone number')
    })
})
