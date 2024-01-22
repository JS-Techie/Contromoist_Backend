require("dotenv").config();

const express = require("express");
const cors = require("cors");

//Import all routes
const routes = require("./routes")

const server = express();
server.use(cors());
server.use(express.json()); 



server.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.use("/api",routes)


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});