describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/FC");
  });

  describe("keyPad", () => {
    it("should render buttons", () => {
      cy.get("button").should("have.length", 22);

      for (let i = 0; i <= 9; i++) {
        cy.get("button").contains(i).and("be.visible");
      }

      cy.get("button").contains("+").should("be.visible");
      cy.get("button").contains("-").should("be.visible");
      cy.get("button").contains("*").should("be.visible");
      cy.get("button").contains("%").should("be.visible");
      cy.get("button").contains("÷").should("be.visible");
      cy.get("button").contains("=").should("be.visible");
      cy.get("button").contains("(").should("be.visible");
      cy.get("button").contains(")").should("be.visible");
      cy.get("button").contains("±").should("be.visible");
      cy.get("button").contains(".").should("be.visible");
      cy.get("button").contains("C").should("be.visible");
      cy.get("button").contains("AC").should("be.visible");
    });
  });

  describe("Display", () => {
    it(" should not be editable by keyboard", () => {
      cy.get('input[type="text"]').type("123asdf").should("have.value", "0");
      cy.get('input[type="text"]').type("{del}").should("have.value", "0");
    });
  });

  describe("calculator", () => {
    it("should render display with 0 by default", () => {
      cy.get('input[type="text"]').should("have.value", "0");
    });

    it("should replace default display value to first number clicked", () => {
      cy.get('input[type="text"]').should("have.value", "0");

      cy.get("button").contains(2).click();

      cy.get('input[type="text"]').should("have.value", "2");
    });

    it("should set clicked number to display", () => {
      cy.get("button").contains(2).click();
      cy.get('input[type="text"]').should("have.value", "2");

      cy.get("button").contains(1).click();
      cy.get('input[type="text"]').should("have.value", "21");

      cy.get("button").contains(5).click();
      cy.get('input[type="text"]').should("have.value", "215");
    });

    it("should remove last symbol from display after clicking on C button", () => {
      cy.get("button").contains(5).click();
      cy.get("button").contains(6).click();
      cy.get("button").contains("+").click();
      cy.get("button").contains(2).click();
      cy.get("button").contains(3).click();

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "56 + 2");

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "56 + ");

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "56");

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "5");
      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "0");
    });

    it("should set 0 to display after clicking on AC button", () => {
      cy.get("button").contains("+").click();
      cy.get("button").contains(5).click();
      cy.get("button").contains(2).click();
      cy.get("button").contains(3).click();
      cy.get("button").contains("*").click();
      cy.get("button").contains(1).click();

      cy.get("button").contains("AC").click();
      cy.get('input[type="text"]').should("have.value", "0");
    });

    it("should set a clicked operand to display after display`s number value", () => {
      cy.get("button").contains("+").click();
      cy.get('input[type="text"]').should("have.value", "0 + ");

      cy.get("button").contains("-").click();
      cy.get('input[type="text"]').should("have.value", "0 - ");

      cy.get("button").contains("*").click();
      cy.get('input[type="text"]').should("have.value", "0 * ");

      cy.get("button").contains("%").click();
      cy.get('input[type="text"]').should("have.value", "0 % ");

      cy.get("button").contains("÷").click();
      cy.get('input[type="text"]').should("have.value", "0 ÷ ");
    });

    it("should change change current number sign after clicking on ±", () => {
      cy.get("button").contains("6").click();

      cy.get("button").contains("±").click();
      cy.get('input[type="text"]').should("have.value", "-6");

      cy.get("button").contains("±").click();
      cy.get('input[type="text"]').should("have.value", "6");
    });

    it("should calculate", () => {
      "3*((1+2)*2)=".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should("have.value", "18");
    });

    it("should remove last value correctly", () => {
      "(0+(5-(3+2)))+".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should(
        "have.value",
        "( 0 + ( 5 - ( 3 + 2 ) ) )"
      );

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should(
        "have.value",
        "( 0 + ( 5 - ( 3 + 2 ) )"
      );

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should(
        "have.value",
        "( 0 + ( 5 - ( 3 + 2 )"
      );

      cy.get("button").contains("C").click();
      cy.get('input[type="text"]').should("have.value", "( 0 + ( 5 - ( 3 + 2");
    });

    it("should render parenthesis correctly", () => {
      "3*(2-(".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should("have.value", "3 * ( 2 - ( ");

      "1+(2-3".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3"
      );

      ")".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 )"
      );

      ")".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 ) )"
      );

      ")".split("").forEach((buttonValue) => {
        cy.get("button").contains(buttonValue).click();
      });
      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 ) ) )"
      );
    });
  });
});
