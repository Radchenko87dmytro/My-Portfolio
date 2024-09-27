describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    //Login to app
    cy.get("#log").click();
    cy.get("#email-address").type("dima.mobil80@gmail.com");
    cy.get("#password").type("68046flexvB");
    cy.get(".login").click();
  });
});
