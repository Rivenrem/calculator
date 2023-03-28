const typeThis = (str) => {
  str.split("").forEach((buttonValue) => {
    return cy.get("button").contains(buttonValue).click();
  });
};

describe("Class component history", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/CC");
  });

  it("should add expression to the history", () => {
    typeThis("2-7=");
    cy.get("button").contains("AC").click();
    typeThis("2+2=");
    cy.get("button").contains("AC").click();
    typeThis("33-55=");

    cy.get("#history").contains("2 - 7 = -5");
    cy.get("#history").contains("2 + 2 = 4");
    cy.get("#history").contains("33 - 55 = -22");
  });

  it("should show old history after navigating to other pages and back", () => {
    typeThis("2+2=");

    cy.get("a").contains("Settings").click();
    cy.get("a").contains("Home").click();

    cy.get("#history").contains("2 + 2 = 4");
  });

  it("should keep open history after navigation to other pages and back", () => {
    cy.get("button").contains("Show History").click();

    cy.get("a").contains("Settings").click();
    cy.get("a").contains("Home").click();

    cy.get("#history").should("be.visible");
  });

  describe("by default", () => {
    it("should not show history", () => {
      typeThis("2+2*2=");

      cy.get("#history").not("be.visible");
    });

    it("should render show history button", () => {
      cy.get("button").contains("Show History");
    });

    it("should not render hide history button", () => {
      cy.get("button").not("Hide History");
    });
  });

  describe("clicking on show history button", () => {
    it("should show history ", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("#history")
        .should("be.visible");
    });

    it("should render hide history button", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("button")
        .contains("Hide History");
    });

    it("should not render show history button", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("button")
        .not("Show History");
    });
  });

  describe("clicking on hide history button", () => {
    it("should not show history", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("button")
        .contains("Hide History")
        .click();

      cy.get("#history").not("be.visible");
    });

    it("should render show history button", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("button")
        .contains("Hide History")
        .click();

      cy.get("button").contains("Show History");
    });

    it("should not render hide history button", () => {
      cy.get("button")
        .contains("Show History")
        .click()
        .get("button")
        .contains("Hide History")
        .click();

      cy.get("button").not("Hide History");
    });
  });
});
