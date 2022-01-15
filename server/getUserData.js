module.exports = getUserData = async (id, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("id", id)
      .query(
        `select * from [Budget.Entries] where UserId=@id`,
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
