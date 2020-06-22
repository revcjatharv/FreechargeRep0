
const jwt = require('jsonwebtoken');
const config = require('../startup/config');
const user = require('../models/user');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    const refreshToken = req.headers.refreshauthorization
    try {
        const decoded = jwt.verify(token, config.secret);
        req.userData = decoded;
        next();
    } catch (error) {
        try {
            if (refreshToken) {
                const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
                req.userData = decoded;
                req.refresh = true;
                next();
            }
        } catch (referenceError) {
            return res.status(403).json({
                "message": "not authenticated"
            });
        }
    }
}
