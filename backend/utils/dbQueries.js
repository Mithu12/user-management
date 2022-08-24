export const createUserTable = `CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  image VARCHAR(30),
  name VARCHAR(30),
  email VARCHAR(30),
  phone VARCHAR(30),
  nid INT,
  area  VARCHAR(30),
  district VARCHAR(30),
  postalCode INT
)`
export const deleteUserTable = `DROP TABLE users`

export const getUserTableData = `SELECT * FROM users`

export const insertDummyUserData = `INSERT INTO users(
    image,
    name,
    email,
    phone,
    nid,
    area,
    district,
    postalCode
    ) VALUES ('test.webp','n1','a1@a.c','+88123',123,'a1','d1', 1200),
    ('test.webp','n2','a2@a.c','+88223',223,'a2','d2', 2200),
    ('test.webp','n3','a3@a.c','+88323',323,'a3','d3', 3200),
    ('test.webp','n4','a4@a.c','+88423',423,'a4','d4', 4200)`
