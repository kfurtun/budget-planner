module.exports = getUsersByEmail = async (email, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("email", email)
      .query(
        "select [Email],[Id],[FirstName] from [Budget.Users] where [Budget.Users].[Email] = @email",
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
