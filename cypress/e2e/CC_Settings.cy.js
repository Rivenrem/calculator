describe("Class compoent settings page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/CCSettings");
  });

  it("should render settings title", () => {
    cy.contains("h2", "Settings");
  });

  it("should render theme selector", () => {
    cy.get("select").should("be.visible");

    cy.get("select > option").should("have.length", "3");
    cy.get("select > option").contains("System Theme");
    cy.get("select > option").contains("Light Theme");
    cy.get("select > option").contains("Dark Theme");
  });

  it("should render clean history button", () => {
    cy.get("button").contains("Clean All History").should("be.visible");
  });

  it("should clean history", () => {
    cy.get("a").contains("Home").click();

    cy.get("button").contains("2").click();
    cy.get("button").contains("+").click();
    cy.get("button").contains("2").click();
    cy.get("button").contains("=").click();

    cy.get("#history").contains("2 + 2 = 4");

    cy.get("a").contains("Settings").click();

    cy.get("button").contains("Clean All History").click();

    cy.get("a").contains("Home").click();

    cy.get("#history").not("have.text", "2 + 2 = 4");
  });
});
