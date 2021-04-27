const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check token exists
    if(token){
        jwt.verify(token, 'token secret name', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login')
            }
            else {
                next();
            }
        })

    } else {
    res.redirect('/login');
    }
}

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'token secret name', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                next();
            }
        })
    }
}

module.exports = { requireAuth, checkUser };