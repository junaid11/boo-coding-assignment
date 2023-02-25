const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { dropDB } = require("../../db");
const { validUser } = require("../../utils/tests");

afterAll(async () => {
  await dropDB();
  app.close()
});

describe("Endpoints", () => {
  it("should create a new user with valid body", async () => {
    const res = await request(app).post("/users").send(validUser);

    expect(res.statusCode).toEqual(201);
  });

  it("should throw an err when creating a user with invalid body", async () => {
    try {
      await request(app).post("/users").send();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it("should get a user with valid id", async () => {
    const createUserRes = await request(app).post("/users").send(validUser);

    const getUserRes = await request(app).get(`/users/${createUserRes.body._id}`)

    expect(getUserRes.statusCode).toEqual(200);
  });

  it("should not get a user with invalid id", async () => {
    const invalidUserId = new mongoose.Types.ObjectId();

    const getUserRes = await request(app).get(`/users/${invalidUserId.toString()}`)

    expect(getUserRes.statusCode).toEqual(404);
  });
});
