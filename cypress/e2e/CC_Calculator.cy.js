const typeThis = (str) => {
  str.split("").forEach((buttonValue) => {
    return cy.get("button").contains(buttonValue).click();
  });
};

describe("Class component calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/CC");
  });

  describe("Arithmetic Operations", () => {
    it("should calculate addition", () => {
      typeThis("56+23=");

      cy.get('input[type="text"]').should("have.value", "79");
    });

    it("should calculate multtiple additions", () => {
      typeThis("56+23+23=");

      cy.get('input[type="text"]').should("have.value", "102");
    });

    it("should calculate subtraction", () => {
      typeThis("56-23=");

      cy.get('input[type="text"]').should("have.value", "33");
    });

    it("should calculate multtiple subtractions", () => {
      typeThis("56-23-23=");

      cy.get('input[type="text"]').should("have.value", "10");
    });

    it("should calculate multiplication", () => {
      typeThis("56*23=");

      cy.get('input[type="text"]').should("have.value", "1288");
    });

    it("should calculate multiple multiplications", () => {
      typeThis("56*23*23=");

      cy.get('input[type="text"]').should("have.value", "29624");
    });

    it("should calculate division", () => {
      typeThis("25÷5=");

      cy.get('input[type="text"]').should("have.value", "5");
    });

    it("should calculate multtiple divisions", () => {
      typeThis("25÷5÷5=");

      cy.get('input[type="text"]').should("have.value", "1");
    });

    it("should calculate reminder", () => {
      typeThis("5%2=");

      cy.get('input[type="text"]').should("have.value", "1");
    });

    it("should calculate multiple reminders", () => {
      typeThis("10%7%3=");

      cy.get('input[type="text"]').should("have.value", "0");
    });

    it("should calculate float number such as '.5' and '0.5'", () => {
      typeThis(".5+0.5=");

      cy.get('input[type="text"]').should("have.value", "1");
    });

    it("should calculate parenthesis operations", () => {
      typeThis("3*((1+2)*2)=");
      cy.get('input[type="text"]').should("have.value", "18");

      cy.get("button").contains("AC").click();

      typeThis("3*(2*(2+2))=");
      cy.get('input[type="text"]').should("have.value", "24");
    });

    it("should change current number sign after clicking on ±", () => {
      cy.get("button").contains("6").click();

      cy.get("button").contains("±").click();
      cy.get('input[type="text"]').should("have.value", "-6");

      cy.get("button").contains("±").click();
      cy.get('input[type="text"]').should("have.value", "6");
    });

    it("should change operand", () => {
      typeThis("3*");

      cy.get("button").contains("C");

      typeThis("+3=");
      cy.get('input[type="text"]').should("have.value", "6");
    });
  });

  describe("Keypad", () => {
    it("should render buttons", () => {
      cy.get("button").should("have.length", 23);

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
    it(" should show '0' at the begining", () => {
      cy.get('input[type="text"]').should("have.value", "0");
    });

    it(" should not be editable by keyboard", () => {
      cy.get('input[type="text"]').type("123asdf").should("have.value", "0");
      cy.get('input[type="text"]').type("{del}").should("have.value", "0");
    });

    it("should render operations", () => {
      typeThis("3*(2-4)");
      cy.get('input[type="text"]').should("have.value", "3 * ( 2 - 4 )");
    });

    it("should render parenthesis", () => {
      typeThis("3*(2-(");

      cy.get('input[type="text"]').should("have.value", "3 * ( 2 - ( ");

      typeThis("1+(2-3");
      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3"
      );

      typeThis(")");

      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 )"
      );

      typeThis(")");

      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 ) )"
      );

      typeThis(")");

      cy.get('input[type="text"]').should(
        "have.value",
        "3 * ( 2 - ( 1 + ( 2 - 3 ) ) )"
      );
    });

    it("should type close brackets only after open brackets", () => {
      typeThis("))=");
      cy.get('input[type="text"]').should("have.value", "0");

      typeThis("))(2*3)=");
      cy.get('input[type="text"]').should("have.value", "6");
    });
  });

  describe("Clean functions", () => {
    it("should remove last value", () => {
      typeThis("(0+(5-(3+2)))+");

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

    it("should set 0 to display after clicking on AC button", () => {
      typeThis("+523*1");

      cy.get("button").contains("AC").click();
      cy.get('input[type="text"]').should("have.value", "0");
    });
  });
});
