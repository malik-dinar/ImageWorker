const express = require('express');
let PORT = 5002;
var cors = require('cors');
const app = express();
const rotateRoutes = require("./routes/rotateRoutes");

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.use(`/`, rotateRoutes); 


// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log("IMAGE ROTATE SERVICE RUNNING ON PORT " + PORT);
});
