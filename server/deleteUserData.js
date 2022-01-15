module.exports = deleteUserData = async (userId, itemId, sqlConnect) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("userId", userId)
      .input("itemId", itemId)
      .query(
        `delete from [Budget.Entries] where [Id]=@itemId and [UserId]=@userId`,
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
