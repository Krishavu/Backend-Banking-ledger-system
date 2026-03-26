const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require('../controllers/transaction.controller');


const transactionRoutes = Router();

/**
 * - POST /api/transactions/
 * - Create a new transaction
 */


transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction)

/**
 * - POST /api/transactions/system/initial-funds
 * - Create initital funds transaction from system user 
 */

transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

/**
 * - GET /api/transactions/history
 * - Get transaction history for the logged-in user
 */

transactionRoutes.get('/history', authMiddleware.authMiddleware, transactionController.getTransactionHistoryController);

module.exports = transactionRoutes;