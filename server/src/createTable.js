// module.exports = createTable = async (sqlConnect) => {
//   const sql = await sqlConnect();
//   return new Promise((resolve, reject) => {
//     new sql.Request().query(
//       "create table [Budget.@tableName](Id int not null primary key identity (1,1), [Type] NVARCHAR(25) not NULL,[SubType] NVARCHAR(25) not NULL,[Date] NVARCHAR(25) not NULL,[Input] int not null ,[UserId] int not null foreign key references [Budget.Users](Id))",
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

module.exports = createTable = async (sqlConnect, id) => {
  const sql = await sqlConnect();
  return new Promise((resolve, reject) => {
    new sql.Request().query(
      `create table [Budget.${id}](Id int not null primary key identity (1,1), [Type] NVARCHAR(25) not NULL,[SubType] NVARCHAR(25) not NULL,[Day] NVARCHAR(2) not NULL,[Month] NVARCHAR(2) not NULL,[Year] NVARCHAR(4) not NULL,[Input] int not null ,[UserId] int not null foreign key references [Budget.Users](Id))`,

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
