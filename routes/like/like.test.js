const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { dropDB } = require("../../db");
const { validLike } = require("../../utils/tests");

afterAll(async () => {
  await dropDB();
  app.close();
});

describe("Endpoints", () => {
  it("should create a new like with valid body", async () => {
    const res = await request(app).post("/comment/like").send(validLike);

    expect(res.statusCode).toEqual(201);
  });

  it("should throw an err when creating a like with invalid body", async () => {
    try {
      await request(app).post("/comment/like").send();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it("should delete a like (unlike)", async () => {
    const like = await request(app).post("/comment/like").send(validLike);

    const { likeBy, likeOn } = like;

    const res = await request(app).post("/comment/unlike").send({
      likeBy,
      likeOn,
    });

    expect(res.statusCode).toEqual(200);
  });
});
