const { Shop, Item } = require("../src/gilded_rose");
const gildedRose = require("./texttest_fixture.js");

describe("Gilded Rose Basic Items", function () {
  let myShop;

  beforeEach(() => {
    myShop = gildedRose;
  });

  //Tous les éléments ont une valeur sellIn qui désigne le nombre de jours restant pour vendre l'article.
  // Tous les articles ont une valeur quality qui dénote combien l'article est précieux.
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

  // À la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit.
  // Test with random items, it should pass
  it("should sellIn and quality decrease when a a day is passed (basic items)", () => {
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

  // À la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit.
  // Test with fixtures items, it should not pass (specific items)
  it("should sellIn and quality decrease when a a day is passed (all items)", () => {
    const items = myShop.items;

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, item.quality - 1);
    });
    const itemsAfterOneDay = myShop.updateQuality();

    expect(itemsAfterOneDay).toBe(expectedItems);
  });

  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  //  Test with random items, it should pass
  it("shoud quality decrease twice faster when sellIn in equal 0 (basic item)", () => {
    const _myShop = new Shop([new Item("Item", 1, 80)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(79);
    items = _myShop.updateQuality();
    expect(items[0].quality).toBe(77);
  });

  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  //  Test with fixtures items, it should not pass (because sulfuras is in the items)
  it("shoud quality decrease twice faster when sellIn in equal 0 (all item)", () => {
    const itemsDatePassed = myShop.items.filter((item) => item.sellIn <= 0);

    const expectedItems = itemsDatePassed.map((item) => {
      return new Item(item.name, item.sellIn, item.quality - 2);
    });

    const itemsAfterOneDay = myShop.updateQuality();

    const itemsAfterOneDayAndShouldDegreaseFaster = itemsAfterOneDay.filter(
      (item) => {
        return itemsDatePassed.map(({ name }) => name).includes(item.name);
      }
    );

    expect(itemsAfterOneDayAndShouldDegreaseFaster).toBe(expectedItems);
  });

  // La qualité (quality) d'un produit ne peut jamais être négative.
  // Test with random items, it should pass
  it("should quality never under 0 (basic item)", () => {
    const _myShop = new Shop([new Item("Item", 1, 0)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  // La qualité (quality) d'un produit ne peut jamais être négative.
  // Test if quality is already negative
  it("should quality never under 0 (items already have negative quality)", () => {
    const _myShop = new Shop([new Item("Item", 1, -2)]);
    let items = _myShop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  // La qualité (quality) d'un produit ne peut jamais être négative.
  // Test with fixtures items and 10 days, it should pass
  it("should quality never under 0 even if 10 days have passed (all items)", () => {
    const days = 10;

    for (let day = 0; day < days; day++) {
      const itemsAfterOneDay = myShop.updateQuality();

      const itemsAfterOneDayQualities = itemsAfterOneDay.map(
        ({ quality }) => quality
      );

      expect(itemsAfterOneDayQualities).toEqual(
        expect.not.stringContaining("0")
      );
    }
  });
});

describe("Gilded Rose Special items", function () {
  let myShop;

  beforeEach(() => {
    myShop = gildedRose;
  });

  // "Aged Brie" augmente sa qualité (quality) plus le temps passe.
  //  Test with fixtures items, it should pass or not (depends on sellIn)
  it("should increase quality for Aged Brie by 1 after one day", function () {
    const items = myShop.items.filter(({ name }) => name === "Aged Brie");

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, item.quality + 1);
    });

    const itemsAfterOneDay = myShop
      .updateQuality()
      .filter(({ name }) => name === "Aged Brie");

    expect(itemsAfterOneDay).toStrictEqual(expectedItems);
  });

  // La qualité d'un produit n'est jamais de plus de 50.
  // Test with fixtures items, it should not pass (sulfure can ben more than 50)
  it("should never increase quality over 50", function () {
    const items = myShop.items;

    items.forEach((item) => {
      expect(item.quality).toBeLessThan(50);
    });
  });

  // La qualité d'un produit n'est jamais de plus de 50.
  // Test with fixtures items over 3 days, it should not pass (sulfure can ben more than 50)
  it("should never increase quality over 50 after 3 days", function () {
    const days = 3;
    const items = myShop.items;
    for (let day = 0; day < days; day++) {
      items.forEach((item) => {
        expect(item.quality).toBeLessThan(50);
      });
      myShop.updateQuality();
    }
  });

  // "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  // Test with random item, should pass
  it("should Sulfuras quality never loose quality (basic item)", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 50, 80),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  // "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  // Test with fixtures items, should pass
  it("should Sulfuras quality never loose quality (all items)", function () {
    const items = myShop.items.filter(({ name }) =>
      name.startsWith("Sulfuras")
    );

    const itemsAfterOneDay = myShop
      .updateQuality()
      .filter(({ name }) => name.startsWith("Sulfuras"));

    expect(itemsAfterOneDay).toStrictEqual(items);
  });

  // "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ;
  //  Test with basic item, it should pass
  it("should increase quality for Backstage passes by 1 after one day (basic item)", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  // "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ;
  //  Test with fixtures items, it should pass or not (depends on sellIn, and not over 50)
  it("should increase quality for Backstage passes & Aged Brie by 1 after one day (all items)", function () {
    const items = myShop.items.filter(
      ({ name }) => name.startsWith("Backstage passes") || name === "Aged Brie"
    );

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, item.quality + 1);
    });

    const itemsAfterOneDay = myShop
      .updateQuality()
      .filter(
        ({ name }) =>
          name.startsWith("Backstage passes") || name === "Aged Brie"
      );

    expect(itemsAfterOneDay).toStrictEqual(expectedItems);
  });

  // "Backstage passes", comme le "Aged Brie", La qualité augmente de 2 quand il reste 10 jours ou moins
  // Test with basic items, should pass
  it("quality of backstage increase by 2 when sellIn <= 10 (basic items)", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 15),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(17);
  });

  // "Backstage passes", comme le "Aged Brie", La qualité augmente de 2 quand il reste 10 jours ou moins
  // Test with fixtures items, should pass or not (depends on sellIn and not over 50)
  it("should quality of backstage increase by 2 when sellIn <= 10 (all items)", function () {
    const items = myShop.items.filter(
      ({ name, sellIn }) =>
        (name.startsWith("Backstage passes") || name === "Aged Brie") &&
        sellIn <= 10
    );

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, item.quality + 2);
    });

    const itemsAfterOneDay = myShop.updateQuality();

    const itemsAfterOneDayAndShouldDegreaseFaster = itemsAfterOneDay.filter(
      (item) => {
        if (items.includes(item)) {
          return item;
        }
      }
    );

    expect(itemsAfterOneDayAndShouldDegreaseFaster).toStrictEqual(
      expectedItems
    );
  });

  // "Backstage passes", comme le "Aged Brie", et de 3 quand il reste 5 jours ou moins,
  // Test with basic items, should pass
  it("quality of backstage increase by 3 when sellIn <= 5 (basic items)", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  // "Backstage passes", comme le "Aged Brie", et de 3 quand il reste 5 jours ou moins,
  // Test with fixtures items, should pass or not (depends on sellIn and not over 50)
  it("should quality of backstage increase by 3 when sellIn <= 5 (all items)", function () {
    const items = myShop.items.filter(
      ({ name, sellIn }) =>
        (name.startsWith("Backstage passes") || name === "Aged Brie") &&
        sellIn <= 5
    );

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, item.quality + 3);
    });

    const itemsAfterOneDay = myShop.updateQuality();

    const itemsAfterOneDayAndShouldDegreaseFaster = itemsAfterOneDay.filter(
      (item) => {
        if (items.includes(item)) {
          return item;
        }
      }
    );

    expect(itemsAfterOneDayAndShouldDegreaseFaster).toStrictEqual(
      expectedItems
    );
  });

  // "Backstage passes", comme le "Aged Brie", mais la qualité tombe à 0 après le concert.
  // Test with basic items, should pass
  it("quality of backstage drop to 0 when sellIn equals to 0 (basic items)", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  // "Backstage passes", comme le "Aged Brie", mais la qualité tombe à 0 après le concert.
  // Test with fixtures items, should pass or not (depends on sellIn and not over 50)
  it("should quality of backstage drop to 0 when sellIn equals to 0 (all items)", function () {
    const items = myShop.items.filter(
      ({ name, sellIn }) =>
        (name.startsWith("Backstage passes") || name === "Aged Brie") &&
        sellIn <= 0
    );

    const expectedItems = items.map((item) => {
      return new Item(item.name, item.sellIn - 1, 0);
    });

    const itemsAfterOneDay = myShop.updateQuality();

    const itemsAfterOneDayAndShouldDegreaseFaster = itemsAfterOneDay.filter(
      (item) => {
        if (items.includes(item)) {
          return item;
        }
      }
    );

    expect(itemsAfterOneDayAndShouldDegreaseFaster).toStrictEqual(
      expectedItems
    );
  });

  // Sulfuras" est un objet légendaire et comme tel sa qualité est de 80 et elle ne change jamais.
  it("should Sulfuras always quality is 80", function () {
    const items = myShop.items.filter(({ name }) =>
      name.startsWith("Sulfuras")
    );

    const itemsQualities = items.map(({ quality }) => quality);
    const removeDuplicates = [...new Set(itemsQualities)];

    const itemsAfterOneDay = myShop
      .updateQuality()
      .filter(({ name }) => name.startsWith("Sulfuras"));

    const itemsQualitiesAfterOneDay = itemsAfterOneDay.map(
      ({ quality }) => quality
    );
    const removeDuplicatesAfterOneDay = [...new Set(itemsQualitiesAfterOneDay)];

    expect(removeDuplicatesAfterOneDay).toEqual([80]);
  });
});
