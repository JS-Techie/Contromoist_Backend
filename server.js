require("dotenv").config();

const express = require("express");
const cors = require("cors");

//Import logging middleware
const {logger} = require("./middleware")

//Import all routes
const routes = require("./routes")



const server = express();
server.use(cors());
server.use(express.json()); 


server.use(logger)



server.get("/", (req, res) => {
  return res.status(200).send({
    hello : "World"
  })
});

server.use("/api",routes)

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});