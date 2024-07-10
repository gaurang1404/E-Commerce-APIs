import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class CartItemsController {

    constructor(){
        this.CartItemsRepository = new CartItemsRepository();
    }

    async add(req, res) {
        try{
            const { productID, quantity } = req.body;
            const userID = req.userID;
            console.log(userID + " " + productID + " " + quantity);
            await this.CartItemsRepository.add(userID, productID, quantity);
            res.status(201).send("Cart is updated");
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            const items = await this.CartItemsRepository.get(userID);
            return res.status(200).send(items);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const isDeleted = await this.CartItemsRepository.delete(cartItemID, userID);
        if (!isDeleted) {
            return res.status(404).send("Item not found");
        }else{
            return res.status(200).send('Cart item is removed');
        }
    }
}