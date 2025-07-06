const express = require('express');
let PORT = 5003;
var cors = require('cors');
const app = express();
const grayRoutes = require("./src/routes/grayRoutes");
const connectDb = require('./src/config/dbConnection');

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.use(`/`, grayRoutes);
 
  connectDb();
  app.listen(PORT,()=>{
      console.log("IMAGE ROTATE SERVICE RUNNING ON PORT " + PORT);
  });
