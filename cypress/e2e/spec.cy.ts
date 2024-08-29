/// <reference types="cypress" />
describe("template spec", () => {
  it("passes", () => {
    cy.wait(1000);
    cy.visit("http://localhost:3000/");
    cy.wait(800);
    // add tasks
    cy.get("#input-area").type("test");
    cy.wait(1000);
    cy.get(".add-button").click();
    cy.get("#input-area").type("test1");
    cy.wait(1000);
    cy.get(".add-button").click();
    cy.get("#input-area").type("test2");
    cy.wait(1000);
    cy.get(".add-button").click();
    cy.get("#input-area").type("test3");
    cy.wait(1000);
    cy.get("#input-area").should("have.value", "test3");
    cy.get(".add-button").click();
    cy.contains("test");

    //to filter tasks
    cy.contains("Active").click();
    cy.wait(1000);
    cy.contains("Completed").click();
    cy.wait(1000);
    cy.contains("All").click();

    //delete tasks
    cy.get(":nth-child(1) > :nth-child(2) > svg").click();

    //to try add space instead string(task)

    // cy.get("#input-area").type(" ");
    // cy.wait(1000);
    // cy.get(".add-button").click();

    // add checkbox completed
    //cy.get(":nth-child(1) > :nth-child(2) .custom-checkbox").click();
    //
    //cy.contains("addTaskHandler");
  });
});
