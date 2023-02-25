const { default: mongoose } = require("mongoose");
const { dropDB, openDbConnection } = require("../../db");
const { validUser } = require("../../utils/tests");
const User = require("./User");

beforeAll(async () => {
  await openDbConnection();
});

afterAll(async () => {
  await dropDB();
});

describe("Model", () => {
  it("should create a user", async () => {
    const user = new User(validUser);

    await user.save();

    expect(user._id).toBeDefined();
  });

  it("should fail for user without required fields", async () => {
    let invalidUser = {};

    try {
      const user = new User(invalidUser);

      await user.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
