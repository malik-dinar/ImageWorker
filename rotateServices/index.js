const express = require('express');
let PORT = 5002;
var cors = require('cors');
const app = express();
const rotateRoutes = require("./src/routes/rotateRoutes");
const connectDb = require('./src/config/dbConnection');

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.use(`/`, rotateRoutes);
 
  connectDb();
  app.listen(PORT,()=>{
      console.log("IMAGE ROTATE SERVICE RUNNING ON PORT " + PORT);
  });
