const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres',
  password: 'Marcello21',
  port: 5432, 
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Gagal koneksi ke database', err.stack);
  }
  console.log('Berhasil terkoneksi ke database!');
  release(); 
});

module.exports = pool;
