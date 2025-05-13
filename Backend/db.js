const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'./env')
})

const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: false 
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Gagal koneksi ke database', err.stack);
  }
  console.log('Berhasil terkoneksi ke database!');
  release(); 
});

module.exports = pool;
