const pool = require('./db');

async function createTable(){
  try{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS transactions(
          id SERIAL PRIMARY KEY,
          productid INT,
          productname VARCHAR(255),
          amount INT,
          customername VARCHAR(255),
          status INT,
          transactiondate DATE,
          createby VARCHAR(255),
          createon DATE
        )
      `);
      console.log("✅ Database build ");    
  }
  catch (err){
    console.log("❌ Database can't be build ", err)
  }
}

module.exports = createTable;