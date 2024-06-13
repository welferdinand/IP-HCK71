const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/ErrorHandler')
const authentication = require('../middlewares/Authentication')
const authorizationAdmin = require('../middlewares/Authorization')

const UserController = require('../controllers/UserController')
const FoodController = require('../controllers/FoodController')
const CartController = require('../controllers/CartController')
const TransactionController = require('../controllers/TransactionController')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/login-google', UserController.loginByGoogle)

router.use(authentication)

router.get('/foods', FoodController.getAllFoods)
router.post('/foods', authorizationAdmin, FoodController.createFood)
router.get('/foods/:id', FoodController.getFoodById)
router.put('/foods/:id', authorizationAdmin, FoodController.editFoodById)
router.delete('/foods/:id', authorizationAdmin, FoodController.deleteFoodById)


router.post('/carts', CartController.createCart)
router.get('/carts', CartController.getCartByUSer)
router.delete('/carts/:id', CartController.deleteCartById)
router.patch('/carts/:id/quantity', CartController.editItemQuantityById)
router.patch('/carts/:id/status', CartController.editCartStatusById)

router.post('/transactions', TransactionController.createTransaction)
router.get('/transactions', TransactionController.getTransactionByUser)
router.get('/transactions/all', authorizationAdmin, TransactionController.getAllTransactions)
router.delete('/transactions/:id', authorizationAdmin, TransactionController.deleteTransactionById)
router.patch('/transactions/:id/payment', authorizationAdmin, TransactionController.editTransactionStatusById)



router.use(errorHandler)

module.exports = router