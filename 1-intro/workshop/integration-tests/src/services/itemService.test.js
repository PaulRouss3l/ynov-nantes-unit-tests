const { it } = require("@jest/globals");
const mongoose = require("mongoose");
const { createItem, listItems } = require("./itemService");

const itemWithoutName = {};
const itemWithName = { name: "pickaxe" };

describe("testItemService", () => {
  let connection;

  beforeAll(async () => {
    // Connect to MongoDB
    connection = mongoose
      .connect("mongodb://mongo:27017/docker-node-mongo", {
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Create a new item without body : throw error cannot read property", () => {
    expect(() => createItem()).toThrow(
      "Cannot read properties of undefined (reading 'name')"
    );
  });

  it("Create a new item with body but without name : throw error No name provided in the body", () => {
    expect(() => createItem(itemWithoutName)).toThrow(
      "No name provided in the body"
    );
  });

  // it("Create a new item with body with name", () => {
  //   return createItem(itemWithName).then((data) => {
  //     expect(data.name).toBe("pickaxe");
  //   });
  // });
});
