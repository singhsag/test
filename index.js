const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// secret key for signin and verifying the token
// this will be taken from .env file or stored somewhere else
const secretKey = 'mySecretKey';

// middleware for authentication using JWT

const authenticateJWT = (req, res, next) => {
  
  const token = req.headers.authorization;
  if(!token) {
    return res.status(401).json({'error': 'unauthorized' });
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      return res.status(401).json({'error': 'unauthorized' });
    }
    
    // if valid token proceed
    next();
  });
};

// middleware for validating numeric input

const validateNumericInput = (req, res, next) => {
  const num1, num2 = req.query;
  if(isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({'error': 'Invalid input, please provide numeric values'});
  }
  next();
}

// applying authentication middleware for all routes
app.use(authenticateJWT);

// GET API

app.get('/add', validateNumericInput, (req, res) => {
  const num1, num2 = req.query;
  const result = parseInt(num1) + parseInt(num2);
  res.json({result});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
