const CLIENT_URL = `http://localhost:5000`;

Feature('Messenger Client');

Scenario("Test write todo", ({ I }) => {
  const todo = "Wash dishes";

  I.amOnPage(CLIENT_URL);
  I.fillField("#newTODO", todo);
  I.click("#create-todo");
  I.waitForText(todo, 5);
});

Scenario("Test save todo", ({ I }) => {
  const todo = "Wash dishes";
  
  I.amOnPage(CLIENT_URL);
  I.fillField("#newTODO", todo);
  I.click("#create-todo");
  I.see(todo, "#todo-body");
  I.click("//tr[last()]/td/button");
  I.see(todo, "#done-body");
});
