CREATE DATABASE todolist;

CREATE TABLE todo(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  blurred BOOLEAN,
  done BOOLEAN,
  favorite BOOLEAN
);