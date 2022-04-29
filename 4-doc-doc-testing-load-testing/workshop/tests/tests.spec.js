const request = require("supertest"); // supertest is a framework that allows to easily test web apis

const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/toDoApp";

const app = require("../app.js");

const mockingoose = require("mockingoose");

const ToDo = require("../toDoModel.js").ToDo;

beforeAll(async () => {
  await mongoose.connect(DB_URI);
});

describe("GET /todo", () => {
  it("should return code 200 & reponse JSON", async () => {
    const response = await request(app).get("/todo");
    // console.log(response);

    expect(response.statusCode).toBe(200);
  });

  it("should return the todo with find function", async () => {
    const _doc = {
      _id: "626b9f56e54ad72dea6b1f5e",
      text: "Todo1",
      done: false,
    };

    mockingoose(ToDo).toReturn(_doc, "find");

    const response = await request(app).get("/todo");
    console.log(JSON.parse(JSON.stringify(response)));
    expect(response.statusCode).toBe(200);

    return ToDo.find().then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});

describe("POST /todo", () => {
  it("should return code 200 & reponse JSON", async () => {
    const response = await request(app).post("/todo").send({
      text: "MyTodo",
      done: false,
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // it('should return the doc with update', () => {
  //   const _doc = {
  //     _id: '507f191e810c19729de860ea',
  //     name: 'name',
  //     email: 'name@email.com',
  //   };

  //   mockingoose(model).toReturn(doc, 'update');

  //   return model
  //     .update({ name: 'changed' }) // this won't really change anything
  //     .where({ _id: '507f191e810c19729de860ea' })
  //     .then(doc => {
  //       expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
  //     });
  // });
});
