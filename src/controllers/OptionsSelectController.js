
const knex = require('../database/connection');
const ValidateToken = require('../jwt/validate');
const KeySecret = 'secreto';
module.exports = {
    async indexGroup(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        try {
            const result = await knex('selectOptionGroup').select('*');
            return res.json({ message: 'success', data: result })
        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: 'An error occurred while fetching group options', data: error })

        }
    },
    async createGroup(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { name } = req.body;
        if(!name){
            return res.json({message:'error', res: 'Missing Name'})
        }
        const valueExist = await knex('selectOptionsGroup').where('name', name).select('*');
        if (valueExist.length !== 0) {
            return res.json({ message: 'error', res: 'Group already created or existing' })
        }

        knex('selectOptionsGroup').insert({
            name: name
        }).then(() => {
            return res.json({ message: 'success', res: 'Group created with succeso' })
        }).catch(err => {
            return res.json({ message: 'error', res: 'An error occurred while creating group', data: err })
        })
    },
    async deleteGroup(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }
        const { id } = req.body;
        const valueExist = await knex('selectOptionsGroup').where('id', id).select('*');
        if (valueExist.length === 0) {
            return res.json({ message: 'error', res: 'Nonexistent group' })
        }
        knex('selectOptionsGroup').where('id', id).delete().then(() => {
            return res.json({ message: 'success', res: 'Group successfully deleted' })
        }).catch(err => {
            return res.json({ message: 'error', res: err });
        })

    },
    async indexSource(req, res) {
        const token = req.headers['x-access-token'];
        const value = ValidateToken(token, KeySecret).message;
        if (value === 'error') {
            return res.status(200).json({ message: 'error', res: 'Failed to authenticate' })
        }


        try {
            const result = await knex('selectOptionSource').select('*');
            return res.json({ message: 'success', data: result })
        } catch (error) {
            console.log(error)
            return res.json({ message: 'error', res: 'An error occurred while fetching source options', data: error })
        }
    }
}

