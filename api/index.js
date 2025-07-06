const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
let PORT = 5000;
var cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5000', 
    methods: 'GET, POST', 
    credentials: true, 
  }));

const routes = {
  '/api/image-processing':"http://localhost:5001",
  '/api/image-rotation':"http://localhost:5002",
  '/api/image-gray':"http://localhost:5003",
}

for(const route in routes){
    const target = routes[route];
    app.use(route, createProxyMiddleware({target}));
}

// Check if the middleware is called
app.use(function (req, res, next) {
    console.log("Middleware called")
    next();
});

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// This is a sample route for testing
app.get('/Test', function (req, res) {
    res.send('Welcome to maliks micro services');
});

PORT = PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log("API GATEWAY SERVICE RUNNING ON PORT "+PORT);
});
