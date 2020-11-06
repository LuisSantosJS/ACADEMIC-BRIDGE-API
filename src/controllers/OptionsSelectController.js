
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
    async indexSource(req,res){
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
