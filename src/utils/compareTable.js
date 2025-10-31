export const compareTables = (table1, expression1, table2, expression2) => {
  if (!Array.isArray(table1) || !Array.isArray(table2)) return false;

  // Determine variable column names for each table 
  const vars1 = Object.keys(table1[0] || {})
  const vars2 = Object.keys(table2[0] || {})
  console.log("vars1 and varse2",vars1,vars2)

  // Intersection of variables 
  const vars = vars2.filter(v => vars1.includes(v));
  console.log("vars: ",vars);
  // For each row in table1, find a row in table2 with identical variable assignments,
  // then compare the expression results.
  for (const row1 of table1) {
    const match = table2.find(row2 => {
      return vars.every(v =>
        Object.prototype.hasOwnProperty.call(row1, v) &&
        Object.prototype.hasOwnProperty.call(row2, v) &&
        Boolean(row1[v]) === Boolean(row2[v])
      );
    });

    // No matching assignment found -> tables differ
    if (!match) {
      console.log("No matching assignment found for row:", row1);
      return false;
    }

    // Compare expression results (boolean-normalize both sides)
    if (Boolean(row1[expression1]) !== Boolean(match[expression2])) {
      console.log("Mismatch for assignment:", vars.reduce((acc, v) => (acc[v]=row1[v], acc), {}));
      console.log("table1 value:", row1[expression1], "table2 value:", match[expression2]);
      return false;
    }
  }

  // All rows matched
  return true;
};
