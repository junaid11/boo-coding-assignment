const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { dropDB } = require("../../db");
const { validComment } = require("../../utils/tests");

afterAll(async () => {
  await dropDB();
  app.close();
});

describe("Endpoints", () => {
  it("should create a new comment with valid body", async () => {
    const res = await request(app).post("/comments").send(validComment);

    expect(res.statusCode).toEqual(201);
  });

  it("should throw an err when creating a comment with invalid body", async () => {
    try {
      await request(app).post("/comments").send();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it("should get comments", async () => {
    const res = await request(app).get("/comments");

    expect(res.statusCode).toEqual(200);
  });

  it("should get likesCount on a comment", async () => {
    const res = await request(app).get("/comments");

    expect(res.body[0].likesCount).toBeDefined();
  });

  it("should get filtered comments", async () => {
    const res = await request(app).get("/comments", { filter: "mbti" });

    res.body.forEach((comment) => {
      expect(comment.mbti).toBeDefined();

      expect(comment.enneagram).not.toBeDefined();

      expect(comment.zodiac).not.toBeDefined();
    });
  });

  it("should get comments sorted by likes (best)", async () => {
    const res = await request(app).get("/comments", { sort: "best" });

    const firstCommentLikes = res.body[0].likesCount;
    const lastCommentItemLikes = res.body[res.body.length - 1].likesCount;

    expect(firstCommentLikes).toBeGreaterThanOrEqual(lastCommentItemLikes);
  });

  it("should get comments sorted by createdAt (recent)", async () => {
    const res = await request(app).get("/comments", { sort: "recent" });

    const firstCommentCreatedAt = new Date(res.body[0].created_at).getTime();
    const lastCommentItemCreatedAt = new Date(
      res.body[res.body.length - 1].created_at
    ).getTime();

    expect(firstCommentCreatedAt).toBeGreaterThanOrEqual(
      lastCommentItemCreatedAt
    );
  });
});
