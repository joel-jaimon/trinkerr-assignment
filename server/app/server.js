require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

//parse res/req
app.use(bodyParser.json());

//apply cors middleware
app.use(cors());

// //Test server active or not
app.get("/", (req, res) => {
  res.send("Active");
});

// read
app.get("/users/:num", (req, res) => {
  // get all Todo documents within our todo collection
  // send back to user as json
  const num = req.params.num;

  console.log(num);

  db.getDB()
    .collection("users")
    .find({
      number: parseInt(num),
    })
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        console.log(documents);
        res.json(documents);
      }
    });
});

// update
app.put("/update-swiped/:id", async (req, res) => {
  const { id } = req.params;
  const newArray = req.body;
  await db
    .getDB()
    .collection("users")
    .updateOne(
      { _id: db.getPrimaryKey(id) },
      { $push: { swiped: newArray.data } },
      { returnOriginal: false },
      (err, result) => {
        if (err) console.log(err);
        else {
          res.json(result);
        }
      }
    );
});

app.put("/users/:userId/update-selection/:arrayId", async (req, res) => {
  const { userId, arrayId } = req.params;
  const { data } = req.body;
  console.log(userId, arrayId, data);

  await db
    .getDB()
    .collection("users")
    .updateOne(
      { _id: db.getPrimaryKey(userId), "swiped.id": arrayId },
      {
        $set: {
          "swiped.$.state": data,
        },
      },
      { returnOriginal: false },
      (err, result) => {
        if (result) res.json(result);
        else {
          console.log(err);
        }
      }
    );

  res.json(key.params);
});

//create
app.post("/register-user", async (req, res, next) => {
  // Document to be inserted
  const { data } = req.body;
  await db
    .getDB()
    .collection("users")
    .insertOne(data, (err, result) => {
      if (err) {
        const error = new Error("Failed to insert Todo Document");
        error.status = 400;
        next(error);
      } else
        res.json({
          result: result,
          document: result.ops[0],
          msg: "Successfully inserted Todo!!!",
          error: null,
        });
    });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      message: err.message,
    },
  });
});

db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database.");
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log("Connected to database, Now listening on port " + port);
    });
  }
});
