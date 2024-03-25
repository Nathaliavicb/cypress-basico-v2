/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECOND_IN_MS = 3000

    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const textoLongo = 'Texto longo para realizarmos um teste'
        cy.clock()
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Barcelos')
        cy.get('#email').type('nat@gmail.com')
        cy.get('#open-text-area').type(textoLongo, { delay:0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECOND_IN_MS)
        cy.get('.success').should('not.be.visible')

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Barcelos')
        cy.get('#email').type('nat@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECOND_IN_MS)
        cy.get('.error').should('not.be.visible')

    });

    it('Campo telefone continua vazio quando preenchido com valor nao numérico', function(){
        cy.get('#phone')
            .type('teste')
                .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Barcelos')
        cy.get('#email').type('nat@gmail.com')
        cy.get('#phone-checkbox').check()
            .should('be.checked')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECOND_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Nathalia').should('have.value', 'Nathalia')
            .clear()
            .should('have.value', '')

        cy.get('#lastName').type('Barcelos').should('have.value', 'Barcelos')
            .clear()
            .should('have.value', '')

        cy.get('#email').type('nat@gmail.com').should('have.value', 'nat@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone').type('9927279951').should('have.value', '9927279951')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area').type('qualquer coisa').should('have.value', 'qualquer coisa')
            .clear()
            .should('have.value', '')
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
        cy.clock()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECOND_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('Envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    

    })
    //Selecionando opção do tipo dropdown
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube')
            .should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1)
            .should('have.value','blog')
    })

    it('marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
         .should('have.value','feedback')

    })
    //Estrutura tipo FOR que encadeia os elementos e passa por cada um deles
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
    })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
            
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('Anexo')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@Anexo', { action: 'drag-drop' })
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })

    it('Abrir a política de privacidade em uma nova aba', function(){
        cy.get('#privacy a').click()
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
        
    })
        
  })
  