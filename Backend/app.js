const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionsRoute = require('./routes/transaction');
const createTable = require('./initDB');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

createTable().then(() => {
  console.log("Database ready");
}).catch((err) => {
  console.log("Database not ready", err);
  process.exit(1);
})

app.use('/api/transactions', transactionsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
