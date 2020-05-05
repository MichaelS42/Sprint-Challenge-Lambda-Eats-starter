
describe("Test our form inputs", function() {
    beforeEach(function () {
        cy.visit("http://localhost:3000/Pizza");
    });
    it("adds text to name input", function () {

    //name test
    cy.get('[data-cy="name"]')
    .type("Mike")
    .should("have.value", "Mike")

    //special instructions test
    cy.get('textarea')
    .type("deliver to side door")
    .should("have.value", "deliver to side door");

    //checkbox test
    cy.get('[type="checkbox"]')
    .check()
    .should("be.checked")

    //submit test
    cy.contains('Add to Order').click();
    cy.get('[data-cy="Add to Order"]')
    .should("have.value", "")
    });
    
});