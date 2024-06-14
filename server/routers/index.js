const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/ErrorHandler')
const authentication = require('../middlewares/Authentication')
// const authorizationAdmin = require('../middlewares/Authorization') 

const UserController = require('../controllers/UserController')
const FoodController = require('../controllers/FoodController')
const CartController = require('../controllers/CartController')
const TransactionController = require('../controllers/TransactionController')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/login-google', UserController.loginByGoogle)

router.use(authentication)

router.get('/foods', FoodController.getAllFoods)
router.post('/foods', FoodController.createFood)
router.get('/foods/:id', FoodController.getFoodById)
router.put('/foods/:id', FoodController.editFoodById)
router.delete('/foods/:id', FoodController.deleteFoodById)


router.post('/carts', CartController.createCart)
router.get('/carts', CartController.getCartByUSer)
router.delete('/carts/:id', CartController.deleteCartById)
router.patch('/carts/:id/quantity', CartController.editItemQuantityById)
router.patch('/carts/:id/status', CartController.editCartStatusById)

router.post('/transactions', TransactionController.createTransaction)
router.post('/transactions/generate-token', TransactionController.generateTokenMidtrans)
router.patch('/transactions/payment', TransactionController.editTransactionStatusById)
router.get('/transactions', TransactionController.getTransactionByUser)
router.get('/transactions/all', TransactionController.getAllTransactions)
router.delete('/transactions/:id', TransactionController.deleteTransactionById)



router.use(errorHandler)

module.exports = router