const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionsRoute = require('./routes/transaction');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/transactions', transactionsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
