const express = require('express');
let PORT = 5001;
var cors = require('cors');
const app = express();
const imageRoutes = require("./src/routes/imageRoutes");
const connectDb = require('./src/config/dbConnection');

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
  
app.use(`/`, imageRoutes); 

connectDb()

app.listen(PORT,()=>{
    console.log("IMAGE PROCESS SERVICE RUNNING ON PORT " + PORT);
});
