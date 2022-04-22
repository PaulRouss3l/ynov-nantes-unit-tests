const { Shop, Item } = require("../src/gilded_rose");
const gildedRose = require("./texttest_fixture.js");

describe("Gilded Rose", function () {
  let myShop;
  beforeAll(() => {
    myShop = gildedRose;
  });

  it("should have all attributes", function () {
    myShop.items.forEach((item) => {
      expect(item).toHaveProperty("sellIn");
      expect(item).toHaveProperty("quality");
      expect(item).toHaveProperty("name");
    });
  });

  it("should have good attributes", function () {
    const _myShop = new Shop([...myShop.items, new Item("LeSuperNom", 50, 10)]);
    const items = _myShop.items;

    expect(items[items.length - 1].name).toBe("LeSuperNom");
    expect(items[items.length - 1].sellIn).toBe(50);
    expect(items[items.length - 1].quality).toBe(10);
  });
});
