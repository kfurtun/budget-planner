module.exports = getUserDataBySelectedDate = async (
  month,
  year,
  userId,
  sqlConnect
) => {
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
