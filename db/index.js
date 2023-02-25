const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const MOGOOSE_CON_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let uri =
  process.env.NODE_ENV !== "test"
    ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    : null;

let mongo = null;

const openDbConnection = async () => {
  if (!uri) {
    mongo = await MongoMemoryServer.create();
    uri = mongo.getUri();
  }

  await mongoose.connect(uri, MOGOOSE_CON_OPTIONS);
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongo.stop();
  }

  await mongoose.connection.close();
};

const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
  }
};

module.exports = { openDbConnection, dropDB, dropCollections };
