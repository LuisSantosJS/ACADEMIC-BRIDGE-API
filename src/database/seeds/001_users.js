
exports.seed = function (knex) {
    return knex('users').insert([
        {
            email: "dasilvasantosluisfelipe@gmail.com",
            password: "$2a$08$otr68DjxydTQKIpbnduuz.V.9Afp/C2nB3VPHyenOtc/fIFLlO/Iy",
            name:'Luis Santos',
            profile:'manager',
            type:'empresa'
        }
    ])
}

