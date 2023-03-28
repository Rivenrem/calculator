describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/FC");
  });

  it("should have Calculator heading", () => {
    cy.contains("h1", "Calculator");
  });

  it("should have 3 links", () => {
    cy.get("header  a").should("have.length", "3");
  });

  it("should have link to functional component home page", () => {
    cy.contains("Home").should("have.attr", "href", "/FC");
  });

  it("should have link to functional component settings page", () => {
    cy.contains("Settings").should("have.attr", "href", "/FCSettings");
  });

  it("should have link to class components page", () => {
    cy.contains("Switch To CC").should("have.attr", "href", "/CC");
  });
});
