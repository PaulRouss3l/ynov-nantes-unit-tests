const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("Sword", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sword");
  });

  //Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it("should degrade twice as fast when sellIn equal 0", function () {
    const gildedRose = new Shop([new Item("Sword", 0, 12)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(2);
  });

  //La qualité (quality) d'un produit ne peut jamais être négative.
  it("quality shouldn't be negative", function () {
    const gildedRose = new Shop([new Item("Sword", 5, 3)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  });

  //"Aged Brie" augmente sa qualité (quality) plus le temps passe.
  it("quality of Aged Brie has to increase", function () {
    startQuality = 5;
    const gildedRose = new Shop([new Item("Aged Brie", 5, startQuality)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThan(startQuality);
  });

  //La qualité d'un produit n'est jamais de plus de 50.
  it("quality shouldn't be superior than 50", function () {
    startQuality = 49;
    const gildedRose = new Shop([
      new Item("Aged Brie", 15, startQuality),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, startQuality)
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    //Aged Brie
    expect(gildedRose.items[0].quality).not.toBeGreaterThan(50);
    //Backstage passes
    expect(gildedRose.items[1].quality).not.toBeGreaterThan(50);
  });

  //"Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  it("Sulfuras shouldn't loose quality and sellIn", function () {
    startQuality = 45;
    StartSellIn = 5;
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", StartSellIn, startQuality),
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].sellIn).toBe(StartSellIn);
    expect(gildedRose.items[0].quality).toBe(startQuality);
  });

  //"Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ;
  it("Backstage passes should increase", function () {
    startQuality = 20;
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 30, startQuality),
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThan(startQuality);
  });

  //"Backstage passes" augmente sa qualité de 2 quand il reste 10 jours ou moins
  it("Backstage passes should increase by 2 when 10 days remaining", function () {
    startQuality = 50;
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBe(30);
  });

  //"Backstage passes" augmente sa qualité de 3 quand il reste 5 jours ou moins
  it("Backstage passes should increase by 3 when 5 days remaining", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBe(35);
  });

  //"Backstage passes" passe à 0 de qualité après le concert
  it("Backstage passes should be 0 when concert is over", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20),
    ]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBe(0);
  });
});
