import mysql from "mysql2/promise";

export const adminDb = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "123456",
  database: "tasks",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const userDb = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "123456",
  database: "tasks",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
