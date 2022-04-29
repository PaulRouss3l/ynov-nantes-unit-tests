const { describe, expect, test, it } = require('@jest/globals');
const { createTODO, doneTODO } = require('../public/script.js');

// Vu avec Paul, les tests ne fonctionnent pas. Problème de jsdom.
describe("unit tests", () => {
    it("tests createTODO", () => {
        const todo = "test";
        createTODO(todo);
        expect(document.querySelector('input').value).toBe("test");
    });

    it("tests doneTODO", () => {
        const todo = "test";
        createTODO(todo);
        const todoId = document.querySelector('button').id;
        doneTODO(todoId);
        expect(document.querySelector('button').innerHTML).toBe("Done");
    });
});
