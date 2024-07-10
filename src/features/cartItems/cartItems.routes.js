// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.delete('/:id', (req, res)=>{
    cartController.delete(req, res);
});
cartRouter.post('/', (req, res)=>{
    cartController.add(req, res);
});
cartRouter.get('/', (req, res)=>{
    cartController.get(req, res);
});

export default cartRouter;