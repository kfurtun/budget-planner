module.exports = verifyUserByIdAndPassword = async (
  id,
  password,
  sqlConnect
) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()

      .input("id", id)
      .input("password", password)
      .query(
        "select [Id] from [Budget.Users] where Id=@id and Password=@password",
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
