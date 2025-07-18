const express = require('express');
let PORT = 5002;
var cors = require('cors');
const app = express();
const rotateRoutes = require("./src/routes/rotateRoutes");
const connectDb = require('./src/config/dbConnection');
const consumeMessages = require('./src/service/kafka');

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.use(`/`, rotateRoutes);

async function start() {
  connectDb();
  consumeMessages('my-topic');
  app.listen(PORT, () => console.log("Server running " + PORT));
}

start();
  
  //     console.log("IMAGE ROTATE SERVICE RUNNING ON PORT " + PORT);
  // });
