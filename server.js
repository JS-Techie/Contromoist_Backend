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

server.get("/check", (req, res) => {
  return res.status(200).send({
    hello : "World"
  })
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  setupDB()
  print(`Server is running on ${PORT}`,"SUCCESS")
});