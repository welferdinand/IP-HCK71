const { Cart, Food } = require('../models')

class CartController {
    static async getCartByUSer(req,res,next){
        try {
            let { id } = req.user
            let data = await Cart.findAll({
                include: Food,
                where: 
                {
                    UserId: id,
                    status: false
                }
                
            })
            if(!data) throw {name: "NotFound"}
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createCart(req,res,next){
        try {
            let { id } = req.user
            const foodId = req.body.id;
             
            let food = await Food.findByPk(foodId)
            if(!food) throw {name: "NotFound"}

            let cart = await Cart.findOne({where: {UserId: id, FoodId: food.id}})
            if(cart){
              let data = await cart.update({
                quantity: cart.quantity + 1
              })

              res.status(200).json(data)
            }else {
              let data = await Cart.create({
                  UserId: id,
                  FoodId: foodId,
                  quantity: 1,
                  status: false
              })
  
              res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteCartById(req, res, next) {
        try {
          const cartId = req.params.id;
          console.log(cartId);
          const cart = await Cart.findByPk(cartId);
          if (!cart) throw { name: "NotFound" };
          await cart.destroy();
          res
            .status(200)
            .json({ message: `success to delete items` });
        } catch (error) {
          next(error);
        }
    }

    static async editItemQuantityById(req, res, next) {
        try {
          const cartId = req.params.id;
          const cart = await Cart.findByPk(cartId);
          if (!cart) throw { name: "NotFound" };
          await cart.update({
            quantity: req.body.quantity
          });
          res
            .status(200)
            .json({ message: `Item Quantity is updated to ${req.body.quantity}` });
        } catch (error) {
          next(error);
        }
    }

    static async editCartStatusById(req, res, next) {
        try {
          const cartId = req.params.id;
          const cart = await Cart.findByPk(cartId);
          if (!cart) throw { name: "NotFound" };
          await cart.update({
            status: true
          });
          res
            .status(200)
            .json({ message: `Item Status is updated` });
        } catch (error) {
          next(error);
        }
    }
}

module.exports = CartController