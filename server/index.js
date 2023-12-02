const express = require('express')
const cors = require('cors')
// const sql = require("msnodesqlv8")


const app = express()
app.use(cors())

// const connectionString = "server=.;Database=QLNK;Trusted_Connection=Yes;Driver={SQL Server}";
// const query = "SELECT * FROM dbo.BACSI WHERE MA_BS = 000003";

// sql.queryRaw(connectionString, query, (err, result) => {
//   if (err) {
//       console.error("Error executing query:", err);
//       return;
//   }
//   const rows = result && result.rows ? result.rows : [];
//   console.log("Result:", rows);
// });

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/getData', function (req, res) {
  res.send('Successful connect to backend ')
})

app.listen(3001, () => {
    console.log("server is running on port 3001")
})