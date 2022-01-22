module.exports = changeUserEmail = async (email, userId, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("email", email)
      .input("userId", userId)

      .query(
        `update [Budget.Users] set Email=@email where Id=@userId `,
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
