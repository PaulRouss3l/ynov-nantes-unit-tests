const {Shop, Item} = require("../src/gilded_rose");
const gildedRose = require('./texttest_fixture.js');

describe("Gilded Rose", function() {
  let myShop;
  beforeAll(() => {
    myShop = gildedRose;
  })


  //console.log(gildedRose.items);
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("Every element should have a sellIn attribute", function() {

  })
});
