describe("Login Formu E2E Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("a) Başarılı form doldurulduğunda submit edebiliyorum ve success sayfası açılıyor", () => {
    cy.get('[data-cy="email-input"]').type("test@workintech.com.tr");
    cy.get('[data-cy="password-input"]').type("Sifre123!");
    cy.get('[data-cy="terms-checkbox"]').check();

    cy.get('[data-cy="submit-button"]').should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.get('[data-cy="success-title"]').should("contain", "Giriş Başarılı!");
  });

  describe("b) Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor", () => {
    it("Email yanlış girildiğinde: 1 hata mesajı var, doğru mesaj görünüyor ve buton disabled", () => {
      cy.get('[data-cy="email-input"]').type("yanlis-email");
      cy.get('[data-cy="password-input"]').type("Sifre123!");
      cy.get('[data-cy="terms-checkbox"]').check();

      cy.get('[data-cy="error-message"]').should("have.length", 1);
      cy.contains("Lütfen geçerli bir email adresi giriniz.").should(
        "be.visible",
      );
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });

    it("Email ve password yanlış girildiğinde: 2 hata mesajı var, password hatası görünüyor ve buton disabled", () => {
      cy.get('[data-cy="email-input"]').type("yanlis-email");
      cy.get('[data-cy="password-input"]').type("123");
      cy.get('[data-cy="terms-checkbox"]').check();

      cy.get('[data-cy="error-message"]').should("have.length", 2);
      cy.contains(
        "Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermelidir.",
      ).should("be.visible");
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });

    it("Email ve password doğru ama kurallar kabul edilmediğinde buton disabled kalıyor", () => {
      cy.get('[data-cy="email-input"]').type("test@workintech.com.tr");
      cy.get('[data-cy="password-input"]').type("Sifre123!");

      cy.get('[data-cy="error-message"]').should("not.exist");
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });
  });
});
