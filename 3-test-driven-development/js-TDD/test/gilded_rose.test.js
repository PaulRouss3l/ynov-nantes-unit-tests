const { Shop, Item } = require("../src/gilded_rose");

<<<<<<< HEAD
describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
=======
describe("Gilded Rose", function() {
  it("after a day, quality and sellin change", function() {
    // Given
    const items = [
      new Item("foo", 10, 10),
    ]

    // When
    const gildedRose = new Shop(items);
    const results = gildedRose.updateQuality();

    // Then
    const expected = [
      new Item("foo", 9, 9),
    ]

    expect(results[0].name).toBe(expected[0].name);
    expect(results[0].quality).toBe(expected[0].quality);
    expect(results[0].sellIn).toBe(expected[0].sellIn);
  });

  it("quality can never be less than 0", function() {
    // Given
    const items = [
      new Item("foo", 0, 0),
    ]

    // When
    const gildedRose = new Shop(items);
    const results = gildedRose.updateQuality();

    // Then
    const expected = [
      new Item("foo", -1, 0),
    ]

    expect(results[0].name).toBe(expected[0].name);
    expect(results[0].quality).toBe(expected[0].quality);
    expect(results[0].sellIn).toBe(expected[0].sellIn);
>>>>>>> a3e47c8638f9a5326c2b905d3abb15fb23404b9a
  });
});
