const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const userModel = require("../models/users");
const { ErrorHandler } = require('../helpers/error')
const config = require("../config/Config")

class UserService{


    /**
   *
   * Get user by user employeeID and password
   *
   * @param  {object}   response
   * @param  {string}   employeeID
   * @return {object}
   */
  async getUserByCred(res, email, password) {
    return new Promise(async function (resolve, reject) {
      await userModel
        .findOne({
          email: email,
          status: 1,
        })
        .exec()
        .then(function (doc) {
          if (doc) {
            bcrypt.compare(password, doc.password, function (err, ress) {
              if (err) {
                resolve({
                  message: "Database error, Please try again",
                  status: false,
                });
              }
              if (ress) {
                resolve({ status: true, data: doc });
              } else {
                resolve({
                  message: config.messages.INVALID_CREDENTIALS,
                  status: false,
                });
              }
            });
          } else {
            resolve({
              message: config.messages.INVALID_CREDENTIALS,
              status: false,
            });
          }
        });
    });
  }

  /**
       *
       * Get All employee
       *
       * @param  {object}   response
       * @param  {string}   
       * @return {object}
       */
  async getAllEmployees(req,skip,limit,searchField,sortObj,status) {
      var searchObj = {};
      if (searchField && searchField.length > 0) {
          searchObj = {
              $or: [
                  { "name": { $regex: new RegExp(searchField, "i") } },
                  { "email": { $regex: new RegExp(searchField, "i") } },
              ],
              $and : [{
                "role": { $nin: [ 1 ] },
                "status": Number(status)
              }]
          };
      } else {
          searchObj = {
            "role": { $nin: [ 1 ] },
            "status": Number(status)
          };
      }
      try {
        var users = await userModel.find(searchObj).skip(skip).limit(Number(limit)).sort(sortObj)
        return users
      } catch (error) {
          var errorr = await ErrorHandler(error,"Error in getting all employees")
          return {
            status:false,
            message: errorr.message
          }
      }
  }


  /**
       *
       * Find Employee details to edit
       *
       * @param  {object}   response
       * @return {object}
       */
   async findEmployee(res) {
    return userModel.find({_id : mongoose.Types.ObjectId(res)});
  }
}

module.exports = new UserService();