const Joi = require('joi')

module.exports = {
    DemoModuleName: Joi.object({
        name: Joi.string().required(),
        name_normalised: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        status: Joi.string().required()
    })
}