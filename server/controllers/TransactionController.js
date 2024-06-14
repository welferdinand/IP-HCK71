const {Cart, Transaction, Food, User} = require('../models')

class TransactionController {
    static async createTransaction(req,res,next) {
        try {
            let {id} = req.user
            let carts = await Cart.findAll({
                include : Food,
                where: {
                    UserId: id
                }
            })
            if(!carts) throw {name: "NotFound"}

            let amount = 0;
            for (const cart of carts) {
                amount += cart.Food.price * cart.quantity
            }

            let transaction = await Transaction.create({
                UserId: id,
                totalAmount: amount,
                paymentStatus: false
            })

            res.status(201).json(transaction)
        } catch (error) {
            next(error)
        }
    }

    static async getTransactionByUser(req,res,next){
        try {
            let { id } = req.user
            let data = await Transaction.findAll({
                include: User,
                where: 
                {
                    UserId: id
                }
                
            })
            if(!data) throw {name: "NotFound"}
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllTransactions(req,res,next){
        try {
            let data = await Transaction.findAll({
                include: User
            })
            if(!data) throw {name: "NotFound"}

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTransactionById(req, res, next) {
        try {
          const transactionId = req.params.id;
          const transaction = await Transaction.findByPk(transactionId);
          if (!transaction) throw { name: "NotFound" };
          await transaction.destroy();
          res
            .status(200)
            .json({ message: `Transaction success to delete` });
        } catch (error) {
          next(error);
        }
    }

    static async editTransactionStatusById(req, res, next) {
        try {
          const transactionId = req.params.id;
          const transaction = await Transaction.findByPk(transactionId);
          if (!transaction) throw { name: "NotFound" };
          await transaction.update({
            paymentStatus: true
          });
          res
            .status(200)
            .json({ message: `Transaction Payment Status is updated` });
        } catch (error) {
          next(error);
        }
    }
}

module.exports = TransactionController