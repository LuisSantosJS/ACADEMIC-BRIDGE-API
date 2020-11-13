

function UpdateLeads(form) {
    const {
        id,
        email,
        fullName,
        country,
    } = form;
    if (!email) {
        return { message: 'error', res: 'Missing the email' }
    }
    if (!id) {
        return { message: 'error', res: 'Missing the id' }
    }
    if (!fullName) {
        return { message: 'error', res: 'Missing the fullName' }
    }
    if (!country) {
        return { message: 'error', res: 'Missing the country' }
    }
    return { message: 'success', res: '' }
}
module.exports = UpdateLeads;