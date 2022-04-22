const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("Sword", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sword");
  });

  it("quality shouldn't be negative", function() {
    //sellIn = 5, quality = 3
    const gildedRose = new Shop([new Item("Sword", 5, 3)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  })
});
