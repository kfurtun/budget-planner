module.exports = insertUser = async (
  firstName,
  lastName,
  email,
  password,
  sqlConnect
) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("firstName", firstName)
      .input("lastName", lastName)
      .input("email", email)
      .input("password", password)
      .query(
        "insert into [Budget.Users] values(@firstName,@lastName,@email,@password)",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve();
        }
      );
  });
};
