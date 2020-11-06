
const knex = require('../database/connection');
const ValidateToken = require('../jwt/validate');
const CreateToken = require('../jwt/create');
const CreateLeads = require('../validateForm/leads/createLeads');
const KeySecret = 'secreto';
// const KeySecretExpire = 'aqueletokenqueexpira'
module.exports = {
    async create(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const validationValue = CreateLeads(req.body);
        if (validationValue.message === 'error') {
            return res.json(validationValue);
        }
        const {
            email,
            name,
            cellPhone,
            campaign,
            responsible,
            relationship,
            observation,
            genre,
            status,
            group,
            source,
            country,
            state,
            city,
            birthday,
            salesman,
            category
        } = req.body;
        const valueExist = await knex('leads').where('email', String(email).toLowerCase()).select('*');
        if (valueExist.length !== 0) {
            return res.json({ message: 'error', res: 'Existing lead' })
        }
        knex('leads').insert({
            email,
            name,
            cellPhone,
            campaign,
            responsible,
            relationship,
            observation,
            genre,
            status,
            group,
            source,
            country,
            state,
            city,
            birthday,
            salesman,
            category
        }).then(() => {
            return res.json({ message: 'success' })
        }).catch(err => {
            console.log(err)
            return res.json({ message: 'error', res: err })
        })

    },
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
        try {
            const result = await
                knex('leads')
                    .limit(Number(limit))
                    .offset((Number(page) - 1) * Number(limit))
                    .orderBy('id', String(order))
                    .select('*');

            return res.json({ message: 'success', res: result })
        } catch (error) {
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
        const exsitsValue = await knex('leads').where('id', id).select('*');
        if (exsitsValue.length === 0) {
            return res.json({ message: 'error', res: 'Lead does not exist or already deleted' })
        }
        knex('leads').where('id', String(id)).delete().then(() => {
            return res.json({ message: 'success', res: 'Lead successfully deleted' })
        }).catch(err => {
            return res.json({ message: 'error', res: 'Error deleting Lead', data: err })
        })
    }
}