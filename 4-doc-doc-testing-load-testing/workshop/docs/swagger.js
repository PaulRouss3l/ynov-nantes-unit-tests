const components = require("./components");
const servers = require("./server");
const createTodo = require("./todos/create-todo");
const getTodos = require("./todos/get-todos");
const patchTodo = require("./todos/patch-todo");

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Workshop Todos API",
    description: "A todos API",
    version: "1.0.0",
    contact: {
      name: "Thomas MARY & Chloé NOGER & Marie GAUTRON",
    },
  },
  ...servers,
  ...components,
  paths: {
    "/todo": {
      ...getTodos,
      ...createTodo,
    },
    "/todo/:id": {
      ...patchTodo,
    },
  },
};
