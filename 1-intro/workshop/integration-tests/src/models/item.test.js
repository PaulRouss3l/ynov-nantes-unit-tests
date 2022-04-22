const request = require('supertest');
const app = require('../app');
const db = require('../config/database');

const agent = request.agent(app);

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("items", () => {
    describe("GET /items", () => {
        test("successful", async () => {
            const res = await agent.get("/")
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeTruthy();
        });
    });

    describe("POST /items", () => {
        test("successful", async () => {
            const res = await agent.post("/items").send({ name: "test-item" });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeTruthy();
        });
    });

    describe("DELETE /items/:id", () => {
        test("successful", async () => {
            const items = db.collection('items');
            const deletedItemID = await items.findOne({ _id: 'some-user-id' });
            const res = await agent.delete("/items", deletedItemID)
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeTruthy();
        });
    });

    describe("PUT /items/:id", () => {
        test("successful", async () => {
            const items = db.collection('items');
            const updatedItemID = await items.findOne({ _id: 'some-user-id' });
            
            const res = await agent.put("/items", updatedItemID)
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeTruthy();
        });
    });
});
