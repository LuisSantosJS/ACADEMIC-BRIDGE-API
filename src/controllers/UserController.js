
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
        const { page, order, limit } = req.query;
        if (!page) {
            return res.json({ message: 'error', res: 'Missing page (query)' })
        }
        if (!order) {
            return res.json({ message: 'error', res: 'Missing order (query)' })
        }
        if (!limit) {
            return res.json({ message: 'error', res: 'Missing limit (query)' })
        }
        if ((order !== 'desc') && (order !== 'asc')) {
            return res.json({ message: 'error', res: 'Invalid OrderBy' })
        }
        const users = await knex('users')
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit))
            .orderBy('id', String(order))
            .select('users.id', 'users.name', 'users.email', 'users.company', 'users.unity', 'users.access').orderBy('id', 'desc');
        return res.status(200).json({ message: 'success', res: users });
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
        const { email, password, name, unity, company, access } = req.body;
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
        if (!unity) {
            return res.status(200).json({ message: 'error', res: 'Missing the unity' })
        }
        if (!access) {
            return res.status(200).json({ message: 'error', res: 'Missing the access' })
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
            name,
            unity,
            company: 'Academic Bridge',
            access
        }]).then(() => {
            return res.status(200).json({ message: 'success', res: 'User created with success' })
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
        if (userCheck.length == 0) {
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

        return res.status(200).json({
            message: 'success', token: value.token, expire: value.expire, data: {
                name: userCheck[0].name, email: userCheck[0].email, type: userCheck[0].type, profile: userCheck[0].profile
            }
        })
    },
    async indexSearch(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { page, order, limit, search } = req.query;
        if (!page) {
            return res.json({ message: 'error', res: 'Missing page (query)' })
        }
        if (!search) {
            return res.json({ message: 'error', res: 'Missing page (query)' })
        }
        if (!order) {
            return res.json({ message: 'error', res: 'Missing order (query)' })
        }
        if (!limit) {
            return res.json({ message: 'error', res: 'Missing limit (query)' })
        }
        if ((order !== 'desc') && (order !== 'asc')) {
            return res.json({ message: 'error', res: 'Invalid OrderBy' })
        }

        try {
            const result = await
                knex('users')
                    .where("company", 'like', `%${search}%`)
                    .orWhere("unity", 'like', `%${search}%`)
                    .orWhere("name", 'like', `%${search}%`)
                    .orWhere("email", 'like', `%${search}%`)
                    .orWhere("access", 'like', `%${search}%`)
                    .limit(Number(limit))
                    .offset((Number(page) - 1) * Number(limit))
                    .orderBy('id', String(order))
                    .select('users.id', 'users.name', 'users.email', 'users.company', 'users.unity', 'users.access');
            return res.json({ message: 'success', res: result })

        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: error })
        }
    },
    async delete(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { id } = req.body;
        if (!id) {
            return res.json({ message: 'error', res: 'Missing id' })
        }
        const exsitsValue = await knex('users').where('id', id).select('*');
        if (exsitsValue.length === 0) {
            return res.json({ message: 'error', res: 'User does not exist or already deleted' })
        }
        knex('users').where('id', String(id)).delete().then(() => {
            return res.json({ message: 'success', res: 'User successfully deleted' })
        }).catch(err => {
            return res.json({ message: 'error', res: 'Error deleting user', data: err })
        })
    },
    async update(req, res) {
        const {
            id,
            email,
            password,
            name,
            unity,
            access,
            isNewPassword
        } = req.body;
        if (!id) {
            return res.json({ message: 'error', res: 'Missing id user' })
        }
        if (!email) {
            return res.json({ message: 'error', res: 'Missing email' })
        }
        if (!name) {
            return res.json({ message: 'error', res: 'Missing name' })
        }
        if (!unity) {
            return res.json({ message: 'error', res: 'Missing unity' })
        }
        if (!access) {
            return res.json({ message: 'error', res: 'Missing access' })
        }
        if (!isNewPassword) {
            return res.json({ message: 'error', res: 'Missing new password' })
        }
        const isExistUser = await knex('users').where('id', id).select('*');
        if (isExistUser.length === 0) {
            return res.json({ message: 'error', res: 'User does not exist or already deleted' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        if (isNewPassword === 'true') {
            knex('users').where('id', id).update({
                email,
                password: hash,
                name,
                unity,
                access
            }).then(() => {
                return res.json({ message: 'success', res: 'Successfully updated user' })
            }).catch((err) => {
                return res.json({ message: 'error', res: 'Error when updating user', err: err })
            })
        } else {
            knex('users').where('id', id).update({
                email,
                name,
                unity,
                access
            }).then(() => {
                return res.json({ message: 'success', res: 'Successfully updated user' })
            }).catch((err) => {
                return res.json({ message: 'error', res: 'Error when updating user', err: err })
            })
        }
    }
}





