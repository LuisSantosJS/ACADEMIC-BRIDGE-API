

function CreateLeads(form) {
    const {
        email,
        firstName,
        lastName,
        cellPhone,
        whatsapp,
        notes,
        region,
        salesMan,
        generateBy,
        relationship,
        genre,
        status,
        group,
        source,
        country,
        city,
        birthday,
        campaign,
        category,
        travelForecast
    } = form;
    if (!email) {
        return { message: 'error', res: 'Missing the email' }
    }
    if (!firstName) {
        return { message: 'error', res: 'Missing the firstName' }
    }
    if (!lastName) {
        return { message: 'error', res: 'Missing the lastName' }
    }
    if (!whatsapp) {
        return { message: 'error', res: 'Missing the whatsapp' }
    }
    if (!region) {
        return { message: 'error', res: 'Missing the region' }
    }
    if (!cellPhone) {
        return { message: 'error', res: 'Missing the cellPhone' }
    }
    if (!relationship) {
        return { message: 'error', res: 'Missing the relationship' }
    }
    if (!campaign) {
        return { message: 'error', res: 'Missing the campaign' }
    }
    if (!travelForecast) {
        return { message: 'error', res: 'Missing the travelForecast' }
    }
    if (!notes) {
        return { message: 'error', res: 'Missing the notes' }
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
    if (!generateBy) {
        return { message: 'error', res: 'Missing the generateBy' }
    }
    if (!city) {
        return { message: 'error', res: 'Missing the city' }
    }
    if (!birthday) {
        return { message: 'error', res: 'Missing the birthday' }
    }
    if (!salesMan) {
        return { message: 'error', res: 'Missing the salesMan' }
    }
    if (!category) {
        return { message: 'error', res: 'Missing the category' }
    }
    return { message: 'success', res: '' }
}
module.exports = CreateLeads;