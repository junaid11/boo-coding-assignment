const { default: mongoose } = require("mongoose");
const { dropDB, openDbConnection } = require("../../db");
const { validComment } = require("../../utils/tests");
const Comment = require("./Comment");

beforeAll(async () => {
  await openDbConnection();
});

afterAll(async () => {
  await dropDB();
});

describe("Model", () => {
  it("should create a comment", async () => {
    const comment = new Comment(validComment);

    await comment.save();

    expect(comment._id).toBeDefined();
  });

  it("should fail for comment without required fields", async () => {
    let invalidComment = {};

    try {
      const comment = new Comment(invalidComment);

      await comment.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
