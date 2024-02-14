require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {setupDB,print} = require("./utils")
const {logger} = require("./middleware")
const setupRoutes = require("./routes")

// const travelRouter = require("./routes/travel")

const server = express();

server.use(cors());
server.use(express.json()); 
server.use(logger)


setupRoutes(server)

// server.use("/travel",travelRouter)
server.get("/token", (req, res) => {
  const jwt = require('jsonwebtoken');
  const secretKey = '1@3$5^7*9)qpalzm10';
  const jsonPayload = {"id": "1", "name": "user ONE", "isAdmin":true};
  const token =  jwt.sign(jsonPayload, secretKey)
  return res.status(200).send({
    'token':token
  })
})

server.get("/check", (req, res) => {
  return res.status(200).send({
    hello : "World"
  })
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  setupDB()
  print(`Server is running on ${PORT}`,"SUCCESS")
});