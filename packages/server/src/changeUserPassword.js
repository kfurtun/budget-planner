module.exports = changeUserPassword = async (password, userId, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("password", password)
      .input("userId", userId)

      .query(
        `update [Budget.Users] set Password=@password where Id=@userId `,
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
