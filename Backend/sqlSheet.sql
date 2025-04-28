CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    productId VARCHAR(50),
    productName VARCHAR(255),
    amount VARCHAR(50),
    customerName VARCHAR(255),
    status INTEGER,
    transactionDate TIMESTAMP,
    createBy VARCHAR(255),
    createOn TIMESTAMP
);

CREATE TABLE status (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50)
);
