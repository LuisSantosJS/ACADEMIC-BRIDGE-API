

function CreateLeads(form) {
    const {
        email,
        name,
        cellPhone,
        whatsapp,
        facebook,
        reference,
        observation,
        genre,
        status,
        group,
        source,
        country,
        state,
        city,
        birthday,
        travelForecast,
        record,
    } = form;
    if (!email) {
        return { message: 'error', res: 'Missing the email' }
    }
    if (!name) {
        return { message: 'error', res: 'Missing the name' }
    }
    if (!cellPhone) {
        return { message: 'error', res: 'Missing the cellPhone' }
    }
    if (!whatsapp) {
        return { message: 'error', res: 'Missing the whatsapp' }
    }
    if (!facebook) {
        return { message: 'error', res: 'Missing the facebook' }
    }
    if (!reference) {
        return { message: 'error', res: 'Missing the reference' }
    }
    if (!observation) {
        return { message: 'error', res: 'Missing the observation' }
    }
    if (!genre) {
        return { message: 'error', res: 'Missing the genre' }
    }
    if (!status) {
        return { message: 'error', res: 'Missing the status' }
    }
    if (!group) {
        return { message: 'error', res: 'Missing the group' }
    }
    if (!source) {
        return { message: 'error', res: 'Missing the source' }
    }
    if (!country) {
        return { message: 'error', res: 'Missing the country' }
    }
    if (!state) {
        return { message: 'error', res: 'Missing the state' }
    }
    if (!city) {
        return { message: 'error', res: 'Missing the city' }
    }
    if (!birthday) {
        return { message: 'error', res: 'Missing the birthday' }
    }
    if (!travelForecast) {
        return { message: 'error', res: 'Missing the travelForecast' }
    }
    if (!record) {
        return { message: 'error', res: 'Missing the record' }
    }
    return { message: 'success', res: '' }
}
module.exports = CreateLeads;