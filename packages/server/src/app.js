const express = require("express");
const cors = require("cors");
var sql = require("mssql");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const insertUser = require("./insertUser");
const getUsersByEmail = require("./getUserByEmail");
// const createTable = require("./createTable");
const getUsersByEMailAndPassword = require("./getUsersByEmailAndPassword");
const insertInput = require("./insertInput");
const getUserData = require("./getUserData");
const deleteUserData = require("./deleteUserData");
const getUserDataBySelectedDate = require("./getUserDataBySelectedDate");
const changeUserEmail = require("./changeUserEmail");

var config = {
  user: process.env.db_username, //default is sa
  password: process.env.db_password,
  server: process.env.db_server, // for local machine
  database: process.env.db_database, // name of database
  options: {
    // encrypt: true,
  },
};

console.log(config);

const sqlConnect = () => {
  return new Promise((resolve, reject) => {
    sql.connect(config, (err) => {
      if (err) {
        console.log({ err });
        reject(err);
      }

      resolve(sql);
    });
  });
};

app.get("/", (req, res) => {
  res.send("Welcome to Budget Planner Api");
});

app.post("/newUser", async (req, res) => {
  console.log(req.body);

  console.log("Connection Successful !");
  const { firstName, lastName, email, password } = req.body;

  const users = await getUsersByEmail(email, sqlConnect);

  if (users.recordset.length === 0) {
    await insertUser(firstName, lastName, email, password, sqlConnect);
    const userId = await getUsersByEmail(email, sqlConnect);
    console.log(userId.recordset[0]);
    res.send(JSON.stringify(userId.recordset[0]));
  } else {
    res.sendStatus(400);
  }
  // res.send();
});

app.post("/insertUserData", async (req, res) => {
  console.log(req.body);
  const { input, day, month, year, type, subType } = req.body.entry;
  console.log("Connection Successful !");

  const insert = await insertInput(
    input,
    day,
    month,
    year,
    type,
    subType,
    req.body.id,
    sqlConnect
  );

  res.sendStatus(201);
});
app.post("/changeUserEmail", async (req, res) => {
  console.log(req.body);
  const { email, id } = req.body;
  console.log("Connection Successful !");

  const users = await getUsersByEmail(email, sqlConnect);
  if (users.recordset.length === 0) {
    await changeUserEmail(email, id, sqlConnect);
    res.sendStatus(201);
  } else res.sendStatus(400);
});

app.post("/changeUserPassword", async (req, res) => {
  console.log(req.body);
  const { password, id } = req.body;
  console.log("Connection Successful !");

  const result = await changeUserEmail(email, id, sqlConnect);
  console.log(result);
  res.sendStatus(201);
});

app.get("/login", async (req, res) => {
  console.log("Connection Successful !");
  const result = await getUsersByEMailAndPassword(
    req.query.email,
    req.query.password,
    sqlConnect
  );

  console.log(result.recordset);
  if (result.recordset.length == 1) {
    // res.sendStatus(200);
    res.send(JSON.stringify(result.recordset[0]));
  } else {
    res.sendStatus(404);
  }
});

app.get("/onlineUser", async (req, res) => {
  console.log("Connection Successful !");
  const userData = await getUserData(req.query.id, sqlConnect);
  res.send(JSON.stringify(userData.recordset));
});

app.delete("/deleteData", async (req, res) => {
  console.log("Connection Successful !");
  const { itemId, userId } = req.body;
  console.log(req.body);
  // const result = await getUsersByEmail(req.query.email, sqlConnect);
  const deleteInput = await deleteUserData(userId, itemId, sqlConnect);

  if (deleteInput) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
