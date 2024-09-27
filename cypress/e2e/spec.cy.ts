/// <reference types="cypress" />
describe("template spec", () => {
  it("passes", () => {
    //to try start web page
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    //Login to app
    cy.get("#log").click();
    cy.get("#email-address").type("dima.mobil80@gmail.com");
    cy.get("#password").type("68046flexvB");
    cy.get(".login").click();

    //initial state
    cy.get("#input-area").should("be.empty");
    cy.get(".add-button-disabled").should("be.disabled");
    cy.contains("Please type some text");
    cy.contains("You don't have any items on this list");

    // add tasks
    cy.get("#input-area").type("test");
    cy.get(".add-button").should("not.be.disabled");
    cy.get(".add-button").click();
    cy.get("#input-area").type("test1");
    cy.get(".add-button").click();
    cy.get("#input-area").type("test2");
    cy.get(".add-button").click();
    cy.get("#input-area").type("test3");
    cy.get("#input-area").should("have.value", "test3");
    cy.get(".add-button").click();
    cy.contains("test3");

    //to filter tasks
    cy.contains("Active").click();
    cy.contains("Completed").click();
    cy.contains("All").click();

    //delete tasks
    cy.get(":nth-child(1) > :nth-child(2) > svg").click();

    //to try add space instead string(task)
    cy.get("#input-area").type(" ");
    cy.get(".add-button-disabled").should("be.disabled");

    // add checkbox completed
    cy.get(":nth-child(1) > :nth-child(2) .custom-checkbox").eq(0).click();

    //check amount of task items
    cy.get(".task-item").should("have.length", 3);

    //remove all items
    cy.get(":nth-child(1) > :nth-child(2) > svg").click();
    cy.get(":nth-child(1) > :nth-child(2) > svg").click();
    cy.get(":nth-child(1) > :nth-child(2) > svg").click();
    // cy.get(".removeIcon").eq(0).click();
    // cy.get(".removeIcon").eq(0).click();
    // cy.get(".removeIcon").eq(0).click();

    cy.get(".task-item").should("not.exist");

    //Sign-out from app
    cy.get(".sign-out").click();
  });
});
