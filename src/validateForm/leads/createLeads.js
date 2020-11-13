

function CreateLeads(form) {
    const {
        email,
        fullName,
        country,
    } = form;
    if (!email) {
        return { message: 'error', res: 'Missing the email' }
    }
    if (!fullName) {
        return { message: 'error', res: 'Missing the fullName' }
    }
    if (!country) {
        return { message: 'error', res: 'Missing the country' }
    }
    return { message: 'success', res: '' }
}
module.exports = CreateLeads;