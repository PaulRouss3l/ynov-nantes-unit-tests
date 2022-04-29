const ItemService = require('../services/itemService');
const sinon = require('sinon');

describe("ItemService test", () => {
  it("has a module", () => {
    expect(ItemService).toBeDefined();
  });

  describe("listItem test", () => {
    it("lists Item", () => {
      const MockModel = {find: sinon.spy()};
      const itemService = ItemService(MockModel);
      itemService.listItems();
      const expected = true;
      const actual = MockModel.find.calledOnce;

      expect(actual).toEqual(expected);
    });
  });

  describe("createItem test", () => {
    it("creates a item", () => {
      const save = sinon.spy();
      let name;
      let date;

    const MockModel = function(data){
      name = data.name;
      date = data.date;

      return {
        ...data,
      save
      };
    };
    
    const itemService = ItemService(MockModel);

    itemService.createItem("foo","foo");

    const expected = true;
    const actual = save.calledOnce;

    expect(actual).toEqual(expected);
    expect(name).toEqual("foo");
    expect(date).toEqual("foo");
  });
});
});