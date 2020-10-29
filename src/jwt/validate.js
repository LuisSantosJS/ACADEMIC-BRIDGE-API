
const jwt = require('jsonwebtoken');

function ValidateToken(token, secret) {
    if (!token) {
        return { message: 'error', res: 'No token provided.' };
    }
    if (!secret) {
        return { message: 'error', res: 'No key provided.' };
    }
    return jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return { message: 'error', res: 'Failed to authenticate token.' };
        }
        return { message: 'success', res: '' };
    });

}
module.exports = ValidateToken;