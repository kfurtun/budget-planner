const express = require("express");
const cors = require("cors");
var sql = require("mssql");
// const createPostTable = require("./postTable");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const sqlConnect = require("./sqlConnect");
const insertUser = require("./insertUser");
const getUsersByEmail = require("./getUserByEmail");
const createTable = require("./createTable");
const getUsersByEMailAndPassword = require("./getUsersByEmailandPassword");

var config = {
  user: process.env.db_username, //default is sa
  password: process.env.db_password,
  server: process.env.db_server, // for local machine
  database: process.env.db_database, // name of database
  options: {
    // encrypt: true,
  },
};

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

// const insertUser = async (firstName, lastName, email, password) => {
//   const sql = await sqlConnect();

//   return new Promise((resolve, reject) => {
//     new sql.Request()
//       .input("firstName", firstName)
//       .input("lastName", lastName)
//       .input("email", email)
//       .input("password", password)
//       .query(
//         "insert into [Budget.Users] values(@firstName,@lastName,@email,@password)",
//         (err, result) => {
//           if (err) {
//             console.log(err);
//             reject(err);
//           }

//           resolve();
//         }
//       );
//   });
// };

// const getUsersByEmail = async (email) => {
//   const sql = await sqlConnect();

//   return new Promise((resolve, reject) => {
//     new sql.Request()
//       .input("email", email)
//       .query(
//         "select [Budget.Users].[Email] from [Budget.Users] where [Budget.Users].[Email] = @email",
//         (err, result) => {
//           if (err) {
//             console.log(err);
//             reject(err);
//           }

//           resolve(result);
//         }
//       );
//   });
// };

// const createTable = async () => {
//   const sql = await sqlConnect();
//   return new Promise((resolve, reject) => {
//     new sql.Request().query(
//       "create table [Budget.Entries](Id int not null primary key identity (1,1), [Type] NVARCHAR(25) not NULL,[SubType] NVARCHAR(25) not NULL,[Date] NVARCHAR(25) not NULL,[Input] int not null ,[UserId] int not null foreign key references [Budget.Users](Id))",
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//         }

//         resolve(result);
//       }
//     );
//   });
// };

const insertInput = async (input, date, type, subType) => {
  const sql = await sqlConnect();
  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("input", input)
      .input("date", date)
      .input("type", type)
      .input("subType", subType)
      .input("foreignKey", foreignKey)
      .query(
        "insert into [Budget.Entries] values (@type,@subType,@date,@input,@foreignKey)",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve(result);
          console.log(result);
        }
      );
  });
};

// const declareTableName = async () => {
//   const sql = await sqlConnect();

//   return new Promise((resolve, reject) => {
//     new sql.Request()
//       .query(
//         "declare @tableName int",
//         (err, result) => {
//           if (err) {
//             console.log(err);
//             reject(err);
//           }

//           resolve();
//         }
//       );
//   });
// };

// const setTableName = async (id) => {
//   const sql = await sqlConnect();

//   return new Promise((resolve, reject) => {

//     new sql.Request()
//       .input("id", id)
//       .query("declare @tableName int set @tableName=@id", (err, result) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//         }

//         resolve();
//       });
//   });
// };

app.post("/newUser", async (req, res) => {
  console.log(req.body);

  console.log("Connection Successful !");
  const { firstName, lastName, email, password } = req.body;

  const users = await getUsersByEmail(email, sqlConnect);

  if (users.recordset.length === 0) {
    await insertUser(firstName, lastName, email, password, sqlConnect);
    const userId = await getUsersByEmail(email, sqlConnect);

    await createTable(sqlConnect, userId.recordset[0].Id);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
  // res.send();

  console.log(result);
});

app.post("/userData", async (req, res) => {
  console.log(req.body);
  const { input, date, type, subType } = req.body;
  console.log("Connection Successful !");

  // const input = await insertInput();
  const users = await getUsersByEmail(email);
  if (users.recordset.length === 0) {
    await insertUser(firstName, lastName, email, password);
    await createTable();
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
  // res.send();

  console.log(result);
});

// const getUsersByEMailAndPassword = async (email, password, sqlConnect) => {
//   const sql = await sqlConnect();

//   return new Promise((resolve, reject) => {
//     new sql.Request()

//       .input("email", email)
//       .input("password", password)
//       .query(
//         "select * from [Budget.Users] where Email=@email and Password=@password",
//         (err, result) => {
//           if (err) {
//             console.log(err);
//             reject(err);
//           }

//           resolve(result);
//         }
//       );
//   });
// };

app.get("/login", async (req, res) => {
  console.log("Connection Successful !");
  const result = await getUsersByEMailAndPassword(
    req.query.email,
    req.query.password
  );

  console.log(result.recordset);
  if (result.recordset.length == 1) {
    res.sendStatus(200);
    res.send(result.recordset);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const insertInput = async (input, date, type, subType, foreignKey) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("input", input)
      .input("date", date)
      .input("type", type)
      .input("subType", subType)
      .input("foreignKey", foreignKey)

      .query(
        `insert into [Budget.${foreignKey}] values (@type,@subType,@date,@input,@foreignKey)`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve(result);
          console.log(result);
        }
      );
  });
};

const getUserData = async (id) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request().query(`select * from [Budget.${id}]`, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(result);
    });
  });
};

const deleteUserData = async (userId, itemId) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("itemId", itemId)
      .query(
        `delete from [Budget.${userId}] where [Id]=@itemId `,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve(result);
        }
      );
  });
};

const getUserDataBySelectedDate = async (month, year, userId, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("month", month)
      .input("year", year)
      .input("userId", userId)
      .query(
        `select * from [Budget.Entries] where [Month]=@month and [Year]=@year and [UserId]=@userId`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve(result);
        }
      );
  });
};
