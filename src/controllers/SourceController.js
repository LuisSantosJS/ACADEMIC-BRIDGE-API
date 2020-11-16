
const knex = require('../database/connection');
const ValidateToken = require('../jwt/validate');
const KeySecret = 'secreto';
module.exports = {
    async indexAll(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const countRows = await knex('selectOptionSource').count('id', { as: 'rows' });
        try {
            const result = await knex('selectOptionSource').select('*');
            res.json({ message: 'success', res: result, rows: countRows })
        } catch (error) {
            res.json({ message: 'error', err: error })
        }
    },
    async indexSource(req, res) {
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
        const countRows = await knex('selectOptionSource').count('id', { as: 'rows' });
        try {
            const result = await knex('selectOptionSource')
                .limit(Number(limit))
                .offset((Number(page) - 1) * Number(limit))
                .orderBy('id', String(order))
                .select('*');
            return res.json({ message: 'success', data: result, rows: countRows })
        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: 'An error occurred while fetching source options', data: error })
        }
    },
    async deleteSource(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { id } = req.body;
        const valueExist = await knex('selectOptionSource').where('id', id).select('*');
        if (valueExist.length === 0) {
            return res.json({ message: 'error', res: 'Nonexistent source' })
        }
        knex('selectOptionSource').where('id', id).delete().then(() => {
            return res.json({ message: 'success', res: 'Source successfully deleted' })
        }).catch(err => {
            return res.json({ message: 'error', res: err });
        })

    },
    async createSource(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { name, channel } = req.body;
        if (!name) {
            return res.json({ message: 'error', res: 'Missing Name' })
        }
        // if (!channel) {
        //     return res.json({ message: 'error', res: 'Missing channel' })
        // }
        const valueExist = await knex('selectOptionSource').where('name', name).select('*');
        if (valueExist.length !== 0) {
            return res.json({ message: 'error', res: 'Source already created or existing' })
        }

        knex('selectOptionSource').insert({
            name: name
        }).then((ress) => {
            return res.json({ message: 'success', res: 'Source created with succeso', data: ress[0] })
        }).catch(err => {
            return res.json({ message: 'error', res: 'An error occurred while creating source', data: err })
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
            return res.json({ message: 'error', res: 'Missing search (query)' })
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
        const countRows = await knex('selectOptionSource').count('id', { as: 'rows' });
        try {
            const result = await
                knex('selectOptionSource')
                    .where("name", 'like', `%${search}%`)
                    .orWhere("id", 'like', `%${search}%`)
                    .limit(Number(limit))
                    .offset((Number(page) - 1) * Number(limit))
                    .orderBy('id', String(order))
                    .select('*');
            return res.json({ message: 'success', res: result, rows: countRows })
        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: error })
        }


    }

}

