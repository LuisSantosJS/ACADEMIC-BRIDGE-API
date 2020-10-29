
const jwt = require('jsonwebtoken');

function CreateToken(email, secret, expire) {
    if (!email) {
        return { message: 'error', res: 'No email provided.' };
    }
    if (!secret) {
        return { message: 'error', res: 'No key provided.' };
    }
    const tokenExpire = jwt.sign({ email }, secret, { expiresIn: expire });
    const token = jwt.sign({ email }, secret, {});
    return { message: 'success', token: expire == 0 ? token : tokenExpire, expire: expire == 0 ? false : true }

}
module.exports = CreateToken;