

function CreateLeads(form) {
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
    if (!relationship) {
        return { message: 'error', res: 'Missing the relationship' }
    }
    if (!campaign) {
        return { message: 'error', res: 'Missing the campaign' }
    }
    if (!responsible) {
        return { message: 'error', res: 'Missing the responsible' }
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
    if (!record) {
        return { message: 'error', res: 'Missing the record' }
    }
    return { message: 'success', res: '' }
}
module.exports = CreateLeads;