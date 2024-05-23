const jwt = require('jsonwebtoken');

// Middleware for user authentication
const isAuthenticated = (req, res, next) => {
    // Get token from header
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.slice(7); // Remove "Bearer " prefix
        console.log(token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid Token' });
        }
    } else {
        res.status(401).json({ message: 'No Token' });
    }
};

// Middleware for user authorization
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized, admin access required' });
    }
};

module.exports = { isAuthenticated, isAdmin };
