module.exports = getUsersByEMailAndPassword = async (
  email,
  password,
  sqlConnect
) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()

      .input("email", email)
      .input("password", password)
      .query(
        "select [Id],[FirstName] from [Budget.Users] where Email=@email and Password=@password",
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
