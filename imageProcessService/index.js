const express = require('express');
let PORT = 5001;
var cors = require('cors');
const app = express();
const imageRoutes = require("./routes/imageRoutes");

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
  
app.use(`/`, imageRoutes); 

// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log("IMAGE PROCESS SERVICE RUNNING ON PORT " + PORT);
});
