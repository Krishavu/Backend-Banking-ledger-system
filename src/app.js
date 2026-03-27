const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // 1. Require CORS

const app = express();

// 2. Configure CORS before your routes
// The VIP Guest List for your backend
const allowedOrigins = [
  'http://127.0.0.1:5500', 
  'http://localhost:5500',
  'https://bank-ledger-frontend-three.vercel.app' // Your Vercel domain
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());    

/**
 * -Routes required
 */
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');

/**
 * - API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// dummy api
app.get("/", (req, res) => {
    res.send("Ledger service is up and running.")
});

module.exports = app;