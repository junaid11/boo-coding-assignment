const { default: mongoose } = require("mongoose");
const { dropDB, openDbConnection } = require("../../db");
const { validLike } = require("../../utils/tests");
const Like = require("./Like");

beforeAll(async () => {
  await openDbConnection();
});

afterAll(async () => {
  await dropDB();
});

describe("Model", () => {
  it("should create a like", async () => {
    const like = new Like(validLike);

    await like.save();

    expect(like._id).toBeDefined();
  });

  it("should fail for like without required fields", async () => {
    let invalidLike = {};

    try {
      const like = new Like(invalidLike);

      await like.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
