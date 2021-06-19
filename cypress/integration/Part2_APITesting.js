// Part2_APITesting.js created with Cypress
describe('Manage Order', function(access_token) {
  it('POST Order success', function() {
    let crust = Math.floor((Math.random() * 2))//random crust "NORMAL","THIN"
    let flavor = Math.floor((Math.random() * 4))//random flavor "CHEESE","CHICKEN-FAJITA","BEEF-NORMAL","HAWAIIAN"
    let size = Math.floor((Math.random() * 3))//random size "S","M","L"
    let table = Math.floor((Math.random() * 10) +1)//random table no.1 to 10
    Cypress.env('table_no',table)
    let timestamp = new Date().toISOString()//Get current timestamp

    cy.log('POST order of Table no.' + Cypress.env('table_no') + '\n Pizza: '
              + Cypress.env('pizza_crust')[crust] + ' '
              + Cypress.env('pizza_flavor')[flavor] + ' size '
              + Cypress.env('pizza_size')[size])
    const order_body = {
     "Crust": Cypress.env('pizza_crust')[crust],
     "Flavor": Cypress.env('pizza_flavor')[flavor],
     "Size": Cypress.env('pizza_size')[size],
     "Table_No": table,
     "Timestamp": timestamp
   }
    //call Clear Order fn.
    cy.Check_And_Clear_Order(Cypress.env('table_no'))

    cy.log(`Logging in as ${Cypress.env('auth_username')}`)
    cy.request({ //getToken
      method: 'POST',
      url: Cypress.env('api_env') +'/auth',
      headers: {
        'accept': 'application/json'
      },
      body: {
        username: Cypress.env('auth_username'),
        password: Cypress.env('auth_password')
      },
  }).then((resp) => {
    cy.request({
      method: 'POST',
      url: Cypress.env('api_env') +'/orders',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer '+ resp.body.access_token
      },
     body: order_body
    }).its('status')
    .should('eq',201)
    cy.Verify_Order(order_body)
  })
})
    it('Delete Orders of the table success', function() {
      cy.Check_And_Clear_Order(Cypress.env('table_no'))
    })

})
