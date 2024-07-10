//This will include the environment variables in our server.js 
import "./env.js";

import express from 'express'; //web framework for nodeJs 
import swagger from 'swagger-ui-express'; //used to explain how your APIs work
import cors from 'cors';  //used to allow different domains to send requests to your server

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';

const server = express(); //Create an express server

// CORS policy configuration
var corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3200"]  //Array of all allowed origins
}
server.use(cors(corsOptions));  //middleware that allows only the origins mentioned in corsOptions to call the APIs

server.use(express.json()); //Parses the incoming requests in JSON payloads which you can access via req.body

//!I will come to this later
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));  

server.use(loggerMiddleware); //Using the logger middleware to log all API requests by clients

//Setting up the routes
server.use('/api/products', productRouter);
server.use("/api/cart", jwtAuth, cartRouter);
server.use('/api/users', userRouter);

// Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// Error handler middleware
server.use((err, req, res, next)=>{
  console.log(err);
  if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }
  res.status(500).send('Something went wrong, please try later');
});

// Middleware to handle 404 requests.
server.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});


// 5. Specify port.
server.listen(3200, ()=>{
  console.log('Server is running at 3200');
  connectToMongoDB();
});

