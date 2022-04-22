const { Shop, Item } = require("../src/gilded_rose");

describe("Test Gilded Rose", () => {
  test("La qualité et la date de péremption décroissent chaque jour", () => {
    const items = [new Item("+5 Dexterity Vest", 10, 20)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBeLessThanOrEqual(9);
    expect(gildedRose.items[0].quality).toBeLessThanOrEqual(19);
  });

  test("Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement", () => {
    const items = [new Item("+5 Dexterity Vest", 10, 20)];
    const gildedRose = new Shop(items);
    for (let day = 0; day < 12; day++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(6);
  });

  test("La qualité d'un produit ne peut jamais être négative", () => {
    const items = [new Item("+5 Dexterity Vest", 10, 20)];
    const gildedRose = new Shop(items);
    for (let day = 0; day < 16; day++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(0);
  });

  test("'Aged Brie' augmente sa qualité plus le temps passe", () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
    for (let day = 0; day < 4; day++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(8);
  });

  test("La qualité d'un produit n'est jamais de plus de 50.", () => {
    const items = [new Item("Diamond Sword", 10, 50)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
  });

  test("'Sulfuras', étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)", () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(80);
  });

  test("'Backstage passes', comme le 'Aged Brie', augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 23),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 27),
    ];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
    expect(gildedRose.items[1].quality).toBe(25);
    expect(gildedRose.items[2].quality).toBe(30);
  });
});
