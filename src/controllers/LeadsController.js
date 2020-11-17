
const knex = require('../database/connection');
const ValidateToken = require('../jwt/validate');
const CreateToken = require('../jwt/create');
const UpdateLeads = require('../validateForm/leads/updateLeads')
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
            fullName,
            cellPhone,
            whatsapp,
            notes,
            region,
            salesMan,
            generateBy,
            relationship,
            genre,
            status,
            source,
            country,
            city,
            birthday,
            campaign,
            travelForecast
        } = req.body;
        const valueExist = await knex('leads').where('email', String(email).toLowerCase()).select('*');
        if (valueExist.length !== 0) {
            return res.json({ message: 'error', res: 'Existing lead' })
        }
        knex('leads').insert({
            email,
            fullName,
            cellPhone,
            whatsapp,
            notes,
            region,
            salesMan,
            generateBy,
            relationship,
            genre,
            status,
            source,
            country,
            city,
            birthday,
            campaign,
            travelForecast
        }).then(() => {
            return res.json({ message: 'success', res: 'Lead registered with successo' })
        }).catch(err => {
            console.log(err)
            return res.json({ message: 'error', res: err })
        })

    },
    async update(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const validationValue = UpdateLeads(req.body);
        if (validationValue.message === 'error') {
            return res.json(validationValue);
        }
        const {
            id,
            email,
            fullName,
            cellPhone,
            whatsapp,
            notes,
            region,
            salesMan,
            generateBy,
            relationship,
            genre,
            status,
            source,
            country,
            city,
            birthday,
            campaign,
            travelForecast
        } = req.body;
        const valueExist = await knex('leads').where('id', id).select('*');
        if (valueExist.length === 0) {
            return res.json({ message: 'error', res: 'Not Existing lead' })
        }
        knex('leads').where('id', id).update({
            email,
            fullName,
            cellPhone,
            whatsapp,
            notes,
            region,
            salesMan,
            generateBy,
            relationship,
            genre,
            status,
            source,
            country,
            city,
            birthday,
            campaign,
            travelForecast
        }).then(() => {
            return res.json({ message: 'success', res: 'Lead updated with successo' })
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
        const countRows = await knex('leads').count('id', { as: 'rows' });
        try {
            const result = await
                knex('leads')
                    .limit(Number(limit))
                    .offset((Number(page) - 1) * Number(limit))
                    .orderBy('id', String(order))
                    .select('*');

            return res.json({ message: 'success', res: result, rows: countRows[0].rows })
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
                knex('leads')
                    .where("email", 'like', `%${search}%`)
                    .orWhere("fullName", 'like', `%${search}%`)
                    .orWhere("cellPhone", 'like', `%${search}%`)
                    .orWhere("whatsapp", 'like', `%${search}%`)
                    .orWhere("relationship", 'like', `%${search}%`)
                    .orWhere("notes", 'like', `%${search}%`)
                    .orWhere("genre", 'like', `%${search}%`)
                    .orWhere("status", 'like', `%${search}%`)
                    .orWhere("source", 'like', `%${search}%`)
                    .orWhere("country", 'like', `%${search}%`)
                    .orWhere("region", 'like', `%${search}%`)
                    .orWhere("city", 'like', `%${search}%`)
                    .orWhere("birthday", 'like', `%${search}%`)
                    .orWhere("campaign", 'like', `%${search}%`)
                    .orWhere("salesMan", 'like', `%${search}%`)
                    .orWhere("travelForecast", 'like', `%${search}%`)
                    .orWhere("generateBy", 'like', `%${search}%`)
                    .limit(Number(limit))
                    .offset((Number(page) - 1) * Number(limit))
                    .orderBy('id', String(order))
                    .select('*');
            return res.json({ message: 'success', res: result })

        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: error })
        }

    }
}