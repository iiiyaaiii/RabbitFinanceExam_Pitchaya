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
Cypress.Commands.add('Check_And_Clear_Order', (table_no) => {
    let tableNo = table_no
    cy.log('Check Order of Table: ' + tableNo)
    cy.request({
      method: 'GET',
      url: Cypress.env('api_env') +'/orders'
    }).then(response => {
      assert.equal(response.status,200)
      let n = response.body.length
      let orders = response.body
      //cy.log(n)
      for(let i = 0; i < n ; i++) {
        if (orders[i].Table_No == tableNo) {
            cy.log('Call to delete Order_ID: ' + orders[i].Order_ID + '  Table_No: ' + orders[i].Table_No)
            cy.Delete_Order(orders[i].Order_ID)
          } /*else {
            cy.log('Cleared! No Order found for the request table')
          }*/
      }
    })
})

Cypress.Commands.add('Delete_Order', (order_id) => {
    let orderID = order_id
    //cy.log(order_id)
    cy.request({
      method: 'DELETE',
      url: Cypress.env('api_env') +'/orders/'+ orderID,//DELETE Order_ID
      headers: {
        'accept': 'application/json'
      }
    }).as('Order')
      cy.get('@Order').should((response) => {
      assert.equal(response.status,200)
    })
    cy.log('Deleted Order_ID: '+ orderID + ' successful')
})

Cypress.Commands.add('Verify_Order', (order_body) => {
    let tableNo = order_body.Table_No
    cy.log('Check Order of Table: ' + tableNo)
    cy.request({
      method: 'GET',
      url: Cypress.env('api_env') +'/orders'
    }).then(response => {
      assert.equal(response.status,200)
      let n = response.body.length
      let orders = response.body
      for(let i = 0; i < n ; i++) {
        if (orders[i].Table_No == tableNo) {
            //cy.log('Verify order: ' + orders[i].Order_ID)
            expect(orders[i].Crust).to.equal(order_body.Crust)
            expect(orders[i].Flavor).to.equal(order_body.Flavor)
            expect(orders[i].Size).to.equal(order_body.Size)
          } /*else {
            cy.log('---Not found Order of Table: ' + tableNo)
          }*/
      }
    })
})
