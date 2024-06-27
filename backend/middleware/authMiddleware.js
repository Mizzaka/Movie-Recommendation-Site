const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
        try {
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-passowrd');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token faild'});

        }
    }
    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token'});

    }
};

module.exports = protect