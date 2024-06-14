const {Cart, Transaction, Food, User} = require('../models')
const midtransClient = require('midtrans-client');

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
            let {id} = req.user
          const transaction = await Transaction.findOne({
            where: {
                UserId: id,
                paymentStatus: false
            }
        });
          if (!transaction) throw { name: "NotFound" };
          await transaction.update({
            paymentStatus: true
          });

          if(transaction.paymentStatus){
            await Cart.destroy(
            {
                where: {
                UserId: id
            }})
          }
          res
            .status(200)
            .json({ message: `Transaction Payment Status is updated` });
        } catch (error) {
          next(error);
        }
    }

    static async generateTokenMidtrans(req,res,next) {
        try {
            
            let {id} = req.user
            let carts = await Cart.findAll({
                include : Food,
                where: {
                    UserId: id
                }
            })
            if(!carts) throw {name: "NotFound"}

            let grossAmount = 0;
            carts.forEach(el => {
                grossAmount = grossAmount + (el.quantity * el.Food.price)
            })

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            const orderId = "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000);

            let parameter = {
                "transaction_details": {
                    "order_id": orderId, // must be unique
                    "gross_amount": grossAmount
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": req.user.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)

            if (midtransToken) {
                await Transaction.create({ UserId: req.user.id, totalAmount: grossAmount, paymentStatus: false, orderId: orderId });
            }

            res.status(200).json({ midtransToken, orderId });            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = TransactionController