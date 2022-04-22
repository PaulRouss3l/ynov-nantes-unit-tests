Feature("Ynov Nantes");

Scenario("Test Ynov Nantes Land Page", ({ I }) => {
  I.amOnPage("https://www.ynov-nantes.com/");
  I.wait(5);
  I.click(locate(".icon-search"));
  I.wait(5);
  I.fillField("s", "info");
  I.wait(5);
  I.see("Bachelor Informatique");
});
