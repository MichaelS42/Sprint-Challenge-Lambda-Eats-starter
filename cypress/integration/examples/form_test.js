
describe("Test our form inputs", function() {
    beforeEach(function () {
        cy.visit("http://localhost:3000/Form");
    });
    it("adds text to name input", function () {

    //name test
    cy.get('[data-cy="name"]')
    .type("Mike")
    .should("have.value", "Mike")

    //checkbox test
    cy.get('[type="checkbox"]')
    .check()
    .should("be.checked")

    //submit test
    cy.contains('Submit').click();
    });
    
});