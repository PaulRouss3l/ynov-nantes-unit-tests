const { it } = require("@jest/globals");
const mongoose = require("mongoose");
const Item = require("./Item");

describe("testItemModel", () => {
  let connection;

  beforeAll(async () => {
    // Connect to MongoDB
    connection = mongoose
      .connect("mongodb://mongo:27017/docker-node-mongo", {
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));

    await Item.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Create a new item", () => {
    const item = new Item({ name: "pickaxe" });
    return item.save().then((data) => {
      expect(data.name).toBe("pickaxe");
    });
  });

  it("Find all item ", () => {
    return Item.find({}).then((data) => {
      expect(data.length).toBe(1);
    });
  });

  it("Modify item ", () => {
    return Item.findOneAndUpdate(
      { name: "pickaxe" },
      { name: "axe" },
      { new: true }
    ).then((data) => {
      expect(data.name).toBe("axe");
    });
  });

  it("Delete item ", () => {
    let item = {};
    Item.findOne({ name: "axe" }).then((data) => {
      item = data;
    });
    return Item.deleteOne({ _id: item._id }).then((data) => {
      expect(data.length).toBe(undefined);
    });
  });
});
