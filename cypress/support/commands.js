Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Barcelos')
        cy.get('#email').type('nat@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
})