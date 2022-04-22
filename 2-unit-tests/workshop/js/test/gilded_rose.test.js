const { Shop, Item } = require("../src/gilded_rose");
const gildedRose = require("./texttest_fixture.js");

describe("Gilded Rose Basic Items", function () {
  let myShop;

  beforeAll(() => {
    myShop = gildedRose;
  });

  //Check des attributs
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

  //items de base
  it("should sellIn and quality decrease when update quality", () => {
    const _myShop = new Shop([
      new Item("Item1", 50, 10),
      new Item("Aged Brie", 80, 5),
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

  it("Quality should not decrease under 0", () => {
    const _myShop = new Shop([new Item("Item", 1, 0)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Quality should not decrease under 0 test négative", () => {
    const _myShop = new Shop([new Item("Item", 1, -2)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

});

describe("Gilded Rose Special items", function () {

//items spéciaux
it('increase quality for Aged Brie by 1 and backstage pass', function() {
  const _myShop = new Shop([new Item('Aged Brie', 5, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10)]);
  const items = _myShop.updateQuality();
  expect(items[0].quality).toBe(11);
  expect(items[1].quality).toBe(11);
});

it('increase quality twice for Aged Brie by 1 when sellIn is 0', function() {
  const _myShop = new Shop([new Item('Aged Brie', 0, 10)]);
  const items = _myShop.updateQuality();
  expect(items[0].quality).toBe(12);
});

it('never increase quality for Aged Brie and for backstage concert over 50', function() {
  const gildedRose = new Shop([new Item('Aged Brie', 5, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(50);
  expect(items[1].quality).toBe(50);
});

//backstage concert
it('quality of backstage increase by 2 when sellIn < 10', function() {
  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 15)]);
  let items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(17);
});


it('quality of backstage increase by 3 when sellIn < 5', function() {
  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 15)]);
  let items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(18);
});

it('quality of backstage drop to 0 when sellIn equals to 0', function() {
  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15)]);
  let items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(0);
});

it('Sulfuras quality never loose quality', function() {
  const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 50, 80)]);
  let items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(80);
});


it('Sulfuras quality never loose quality', function() {
  const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);
  let items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(2);
});


});
