// Part2_APITesting.js created with Cypress
describe('POST User', function() {
  it('POST User success', function() {
    cy.request({
      method: 'POST',
      url: Cypress.env('api_env') +'/auth',
      headers: {
        'accept': 'application/json',
        'access_token': 'string'//input Token
      },
      body: {
        username: "userapi1",
        password:  "psswdapi1"
      }
    })
      .its('status')
      .should('equal',200)
      })
})

describe('Get Orders', function() {
  it('Get all Orders', function() {
    cy.request({
      method: 'GET',
      url: Cypress.env('api_env') +'/orders'
    }).as('Orders')
    cy.get('@Orders').should((response) => {
      assert.equal(response.status,200)
      expect(response.body).to.not.be.null
    })
  })
})

describe('POST Orders', function() {
  it('POST Orders success', function() {
    cy.request({
      method: 'POST',
      url: Cypress.env('api_env') +'/orders',
      headers: {
        'accept': 'application/json',
        'order': "string"//input Token
      },
      body:{
       "Crust": "NORMAL",
       "Flavor": "CHEESE",
       "Size": "M",
       "Table_No": 6,
       "Timestamp": "2021-06-18T18:21:08.708470"
      }
    })
      .its('status')
      .should('equal',200)
      })
})

describe('Delete Order', function() {
  it('DELETE Order fail', function() {
    cy.request({
      method: 'DELETE',
      url: Cypress.env('api_env') +'/orders/1',//DELETE Order_ID 1
      headers: {
        'accept': 'application/json'
      }
    }).as('Order')
      cy.get('@Order').should((response) => {
      assert.equal(response.status,200)
    })
  })
})
