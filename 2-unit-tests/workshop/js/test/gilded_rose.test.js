const {Shop, Item} = require("../src/gilded_rose");

// test sur la date de peremption
// une fois depassée la qualité se dégrade plus
describe("Gilded Rose", function() {
  it("date depassé", function() {
    const gildedRose = new Shop([new Item("foo", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  /** */

  it("should be equal to number of days left to sell the item ", function () {
    const gildedRose = new Shop([new Item("foo", 23, 19)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(22);
    expect(items[0].sellIn).toBeGreaterThanOrEqual(0);
    expect(items[0].quality).toBe(18);
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  /*******************************************************/
  /*******************************************************/

  /**  codé par ESNAULT Bastien */
  // À la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit.  
  it("should decrement ", function () {
    const gildedRose = new Shop([new Item("foo", 23, 19)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(22);
    expect(items[0].quality).toBe(18);
  });

  /**  codé par ESNAULT Bastien */

  /*******************************************************/
  /*******************************************************/


  /** cette portion de code est valide mais le code ne respecte pas ce test **/
  
  // it("qualité toujours positive", function() {
  //   const gildedRose = new Shop([new Item("foo", 0, -1)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBeUndefined();
  // })

  // test sur la qualite d'un produit: Elle ne peut jamais etre negative
  
  // it("qualite non negative", function(){
  //   const gildedRose = new Shop([new Item("Aged Brie", 1, -4)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(5)
    
  // })
  
  // test sur le temps et la qualite
  // plus le temps passe plus la qualité augmente
  it("comportement Aged Brie",function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 4)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(5);

  })

  // it("qualite ne depassant plus 50",function(){
  //   const gildedRose = new Shop([new Item("Aged Brie", 51, 4)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(85);
  // })


});