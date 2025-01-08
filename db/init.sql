CREATE DATABASE textsdb;

\c textsdb;

CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);
