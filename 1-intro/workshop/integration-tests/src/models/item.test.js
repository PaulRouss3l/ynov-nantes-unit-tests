var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/my_test_database";
mongoose.connect(mongoDB,{useNexUrlParser: true});
const Item = require('../models/Item.js');

describe("Item model test", () => {
  beforeAll(async () => {
    await Item.remove({});
  });

  afterEach(async () => {
    await Item.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Item).toBeDefined();
  });

  describe("get item", () => {
    it("gets a item", async () => {
      const item = new Item({
        name: "foo",
        date: "2020-01-02"
      });
      await item.save();

      const foundItem = await Item.findOne({
        name: "foo"
      });

      const expected = "foo";
      const actual = foundItem.name;
      expect(actual).toEqual(expected);
    });
  });

  describe("save item", () =>{
    it("Saves a item", async () => {
      const item = new Item({
        name: "foo",
        date: "2020-01-02"
      });
      const savedItem = await item.save();
      const expected = "foo";
      const actual = savedItem.name;
      expect(actual).toEqual(expected);
    })
  });

  describe("update item", () =>{
    it("update a item", async () => {
      const item = new Item({
        name: "foo",
        date: "2020-01-02"
      });
      await item.save();

      item.name = "bar"
      const updateItem = await item.save();

      const expected = "bar";
      const actual = updateItem.name;
      expect(actual).toEqual(expected);
    });
  });
});
