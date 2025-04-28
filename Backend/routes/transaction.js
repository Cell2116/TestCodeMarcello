const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/group', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        EXTRACT(YEAR FROM transactiondate) AS year,
        EXTRACT(MONTH FROM transactiondate) AS month,
        COUNT(*) AS total
      FROM transactions
      GROUP BY year, month
      ORDER BY year DESC, month DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/detail/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    const result = await pool.query(`
      SELECT *
      FROM transactions
      WHERE EXTRACT(YEAR FROM transactiondate) = $1
        AND EXTRACT(MONTH FROM transactiondate) = $2
      ORDER BY transactiondate DESC
    `, [year, month]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/addData', async (req, res) => {
  const { productID, productName, amount, customerName, status, transactionDate, createBy, createOn } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO transactions (productid, productname, amount, customername, status, transactiondate, createby, createon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [productID, productName, amount, customerName, status, transactionDate, createBy, createOn]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productid, productname, amount, customername, status, transactiondate, createby, createon } = req.body
  try {
    const result = await pool.query(`
      UPDATE transactions
      SET productid = $1,
          productname = $2,
          amount = $3,
          customername = $4,
          status = $5,
          transactiondate = $6,
          createby = $7,
          createon = $8
      WHERE id = $9
      RETURNING *
    `, [productid, productname, amount, customername, status, transactiondate, createby, createon, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT *
      FROM transactions
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    
    res.json(result.rows[0]); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
