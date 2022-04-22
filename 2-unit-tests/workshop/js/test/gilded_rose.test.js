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
    const lastItem = items[items.length - 1];

    expect(lastItem.name).toBe("LeSuperNom");
    expect(lastItem.sellIn).toBe(50);
    expect(lastItem.quality).toBe(10);
  });

  it("should sellIn and quality decrease when update quality", () => {
    const _myShop = new Shop([
      new Item("Item1", 50, 10),
      new Item("Item2", 80, 5),
    ]);
    const items = _myShop.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(9);

    expect(items[1].sellIn).toBe(79);
    expect(items[1].quality).toBe(4);
  });

  it("shoud quality decrease twice faster when sellIn in equal 0", () => {
    const _myShop = new Shop([new Item("Item", 1, 80)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(79);
    items = _myShop.updateQuality();
    expect(items[0].quality).toBe(77);
  });
});
