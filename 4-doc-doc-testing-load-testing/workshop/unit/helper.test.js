const HelperService = require('../HelperService');

describe("Correct Behavior Helper Service", () => {

    it("shoud call the todoHelper with a good parameter and receive true", () => {
        const param = { body: { text: 'bonjour'}};
        expect(HelperService.helperTodoCreation(param)).toBe(true);
    })

    it("shoud call the todoHelper with a wrong parameter and receive false", () => {
        let param = { body: { text: ''}};
        expect(HelperService.helperTodoCreation(param)).toBe(false);

        param = { body: null};
        expect(HelperService.helperTodoCreation(param)).toBe(false);

        param = "hello";
        expect(HelperService.helperTodoCreation(param)).toBe(false);
    })
})

describe("should be false", function () {
    it("should return true", function () {
      let todo = new ToDo([]);
      expect(todo.done).toBeFalsy();
    });
  });
  
describe("Should be egal", function () {
    it("should be equal to text", function () {
      let todo = new ToDo([]);
      todo.text = "test";
      expect(todo.text).toBe("test");
});
});
