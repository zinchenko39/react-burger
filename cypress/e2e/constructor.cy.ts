describe('service is available on localhost:3000', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  const ingredientSelector = '[class^=constructor-element]';
  const constructorWrapper =
    '[class^=burger-constructor_burger_constructor__container]';

  it('check empty cart', function () {
    cy.get(ingredientSelector).should('not.exist');
    cy.get(constructorWrapper).should('not.exist');
  });

  it('add bun to cart', () => {
    cy.contains('булка').trigger('dragstart');
    cy.get(constructorWrapper).trigger('drop');
    cy.get('[class$=constructor-element_pos_top]').should('exist');
    cy.get('[class$=constructor-element_pos_bottom]').should('exist');
  });

  it('add ingredient to cart', () => {
    cy.contains('минеральные').trigger('dragstart');
    cy.get(constructorWrapper).trigger('drop');
    cy.get(ingredientSelector).should('exist');
  });

  it('should make order', () => {
    const orderText = 'Оформить заказ';
    cy.contains(orderText).click();
    cy.contains('Вход');
    cy.get('input[name="email"]').type('ivan12345@yandex.ru');
    cy.get('input[name="password"]').type('123456789');
    cy.get('[class^=login_login_btn]').click();
    cy.contains(orderText).click();
    cy.wait(22000);
    cy.contains('Идентификатор заказа');
    cy.get('[class^=modal_modal__root]').find('svg').first().click();
    cy.contains('Соберите бургер');
  });
});
