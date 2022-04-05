describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
  })

  it('displays three todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 3)
    cy.get('.todo-list li').first().should('contain', 'Eat')
    cy.get('.todo-list li').should('contain', 'Sleep')
    cy.get('.todo-list li').last().should('contain', 'Repeat')
  })

  it('can add new todo items', () => {
    const newItem = 'Study'
    cy.get('#new-todo-input').type(`${newItem}{enter}`)
    cy.get('.todo-list li')
      .should('have.length', 4)
      .last()
      .should('contain', newItem)
  })
  it('can check off an item as completed', () => {
    cy.contains('Eat')
    .parent()
    .find('input[type=checkbox]')
    .check()

    // cy.contains('Repeat')
    //   .parents('li')
    //   .should('have.class', 'completed')
    // cy.contains('Repeat').parents('li')
    //   .should('defaultChecked', 'completed')
    cy.contains('Completed').click()
    cy.get('.todo-list li')
    .should('have.length', 1)
    .first()
    .should('contain', 'Eat')

    cy.contains('Sleep').should('not.exist')
    cy.contains('Repeat').should('not.exist')
  })

  it('can edit tasks', () => {
    cy.get('.todo-list li').first()
    cy.contains('Edit').click()
    const newTask = 'Draw'
    cy.get('.todo-text').type(`${newTask}{enter}`)
    cy.get('.todo-list li')
    .should('have.length', 3)
    .should('not.contain', 'Eat')
    .should('contain', 'Draw')
  })

  it('can delete tasks', () => {
    cy.get('.todo-list li').first()
    cy.contains('Delete').click()
    cy.get('.todo-list li')
    .should('have.length', 2)
    .should('not.contain', 'Eat')
  })

  context('with a checked task', () => {
    beforeEach(() => {
        cy.contains('Eat')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
        cy.contains('Active').click()
        cy.get('.todo-list li').should('have.length', 2)
        cy.get('.todo-list li').first().should('contain', 'Sleep')
        cy.get('.todo-list li').last().should('contain', 'Repeat')
        cy.contains('Eat').should('not.exist')
    })

    it('can filter for completed tasks', () => {
        cy.contains('Completed').click()

        cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('contain', 'Eat')

        cy.contains('Sleep').should('not.exist')
        cy.contains('Repeat').should('not.exist')
    })
    
    it('can filter for all tasks', () => {
        cy.contains('All').click()
        cy.get('.todo-list li').should('have.length', 3)
        cy.get('.todo-list li').first().should('contain', 'Eat')
        cy.get('.todo-list li').should('contain', 'Sleep')
        cy.get('.todo-list li').last().should('contain', 'Repeat')
    })
  })
})
