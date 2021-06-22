const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const dbname = process.env.APP_DB_NAME;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kb588.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

console.log(uri);

const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) cb();
  else {
    MongoClient.connect(uri, mongoOptions, (err, client) => {
      if (err) cb(err);
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
