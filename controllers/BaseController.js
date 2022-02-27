/**
 * This class will be extended by all other controllers
 */
class BaseController {
    constructor() {
        this.mongoose = require('mongoose')
        this.Joi = require('joi')
        this.commonFunction = require("../helpers/CommonFunction")
        this.bcrypt = require('bcrypt')
        this.logger = require("../helpers/Logger")
        this.helperResponse = require('../helpers/HelperResponse')
    }
}

module.exports = BaseController;