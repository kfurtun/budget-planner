module.exports = insertInput = async (
  input,
  day,
  month,
  year,
  type,
  subType,
  foreignKey,
  sqlConnect
) => {
  const sql = await sqlConnect();

  return new Promise((resolve, reject) => {
    new sql.Request()
      .input("input", input)
      .input("day", day)
      .input("month", month)
      .input("year", year)
      .input("type", type)
      .input("subType", subType)
      .input("foreignKey", foreignKey)
      .query(
        `insert into [Budget.Entries] values (@type,@subType,@day,@month,@year,@input,@foreignKey)`,
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
