describe("Class component header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/CC");
  });

  it("should have Calculator heading", () => {
    cy.contains("h1", "Calculator");
  });

  it("should have 3 links", () => {
    cy.get("header  a").should("have.length", "3");
  });

  it("should have link to class component home page", () => {
    cy.contains("Home").should("have.attr", "href", "/CC");
  });

  it("should have link to class component setting page", () => {
    cy.contains("Settings").should("have.attr", "href", "/CCSettings");
  });

  it("should have link to functional components page", () => {
    cy.contains("Switch To FC").should("have.attr", "href", "/FC");
  });
});
