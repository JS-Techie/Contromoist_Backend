require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {setupDB} = require("./utils")
const {logger} = require("./middleware")
const setupRoutes = require("./routes")

const server = express();

server.use(cors());
server.use(express.json()); 
server.use(logger)

server.get("/", (req, res) => {
  return res.status(200).send({
    hello : "World"
  })
});

setupRoutes(server)

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  setupDB()
  console.log(`Server is running on port ${PORT}`);
});