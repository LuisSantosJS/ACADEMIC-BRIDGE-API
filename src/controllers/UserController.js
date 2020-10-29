
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
const ValidateToken = require('../jwt/validate');
const CreateToken = require('../jwt/create');

const KeySecret = 'secreto';
const KeySecretExpire = 'aqueletokenqueexpira'
module.exports = {
    async index(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const users = await knex('users').select('users.id', 'users.name', 'users.email').orderBy('id', 'desc');
        return res.status(200).json(users);
    },
    // async valid(req, res) {
    //     const { code, hash, email } = req.body;
    //     const valueBcrypt = bcrypt.compareSync(String(code).toLowerCase(), hash);
    //     if (valueBcrypt == false) {
    //         return res.json({ message: 'error', res: 'Invalid code' })
    //     }
    //     const value = CreateToken(email, KeySecretExpire, 7200);
    //     if (value.message == 'error') {
    //         return res.json({ message: 'error', res: 'Failed to create token' })
    //     }
    //     return res.json({ message: 'success', token: value.token, expire: value.expire })
    // },
    async create(req, res) {
        const token = req.headers['x-access-token'];
        const { email, password, name } = req.body;
        if (!email) {
            return res.status(200).json({ message: 'error', res: 'Missing the email' })
        }
        if (!token) {
            return res.status(200).json({ message: 'error', res: 'Missing the token' })
        }
        if (!password) {
            return res.status(200).json({ message: 'error', res: 'Missing the password' })
        }
        if (!name) {
            return res.status(200).json({ message: 'error', res: 'Missing the name' })
        }
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const existeUser = await knex('users').where('email', email).select('*');
        if (existeUser.length !== 0) {
            return res.status(200).json({ message: 'error', res: 'Existing User' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        knex('users').insert([{
            email,
            password: hash,
            name
        }]).then(() => {
            return res.status(200).json({ message: 'success', res: '' })
        }).catch((err) => {
            return res.status(200).json({ message: 'error', res: 'Failed to create user', err: err })
        })
    },
    async login(req, res) {
        const { email, password } = req.body;
        if (!email) {
            return res.status(200).json({ message: 'error', res: 'Missing the email' })
        }
        if (!password) {
            return res.status(200).json({ message: 'error', res: 'Missing the password' })
        }
        const userCheck = await knex('users').where('email', email).select('*');
        if(userCheck.length == 0){
            return res.status(200).json({ message: 'error', res: 'User does not exist' })
        }
        const valuePass = userCheck[0].password;
        const valueCheckPass = bcrypt.compareSync(password, valuePass);
        if (!valueCheckPass) {
            return res.status(200).json({ message: 'error', res: 'Incorrect password' })
        }
        const value = CreateToken(email, KeySecret, 0);
        if (value.message == 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to create token' })
        }

        return res.status(200).json({ message: 'success', token: value.token, expire: value.expire })
    }
}





