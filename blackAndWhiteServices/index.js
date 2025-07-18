const express = require('express');
let PORT = 5003;
var cors = require('cors');
const app = express();
const grayRoutes = require("./src/routes/grayRoutes");
const connectDb = require('./src/config/dbConnection');
const consumeMessages = require('./src/service/kafka');

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.use(`/`, grayRoutes);
 
async function start() {
  connectDb();
  consumeMessages('my-topic');
  app.listen(PORT, () => console.log("Server running " + PORT));
}

start();
