// cypress/e2e/forget-password.cy.ts

describe("ForgetPassword Component", () => {
  beforeEach(() => {
    cy.visit("/forgetpassword"); // Adjust this URL to match your app's routing
  });

  it("renders the forget password form", () => {
    cy.contains("Forget Password").should("be.visible");
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.contains("button", "Send Reset Email").should("be.visible");
  });

  it("shows error for invalid email", () => {
    cy.get('input[placeholder="Email"]').type("invalidemail");
    cy.contains("button", "Send Reset Email").click();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("navigates back to login page", () => {
    cy.contains("Back to log in").click();
    cy.url().should("include", "/login");
  });
});
