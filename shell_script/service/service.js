const bcrypt = require("bcrypt");
const DemoModuleNameModel = require("../models/demoModelNameForService.js");
const mongoose = require("mongoose");

class DemoService {
  /**
   *
   * Add new DemoModuleName
   *
   * @param  {object}   response
   * @param  {string}   data
   * @return {object}
   */
  async addDemoModuleName(res, data) {
    var newData = await DemoModuleNameModel.create({
      name: data.name,
      name_normalised: data.name_normalised,
      email: data.email,
      phone: data.phone,
      status: data.status,
    });
    return newData;
  }

  /**
   *
   * Find DemoModuleName to edit
   *
   * @param  {object}   response
   * @return {object}
   */
  async editDemoModuleName(id) {
    return DemoModuleNameModel.findOne({ _id: mongoose.Types.ObjectId(id) });
  }

  /**
   *
   * Update DemoModuleName
   *
   * @param  {object}   response
   * @param  {string}   data
   * @return {object}
   */
  async updateDemoModuleName(id, data) {
    var updateEmp = await DemoModuleNameModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          name: data.name,
          name_normalised: data.name_normalised,
          email: data.email,
          phone: data.phone,
          status: data.status,
        },
      }
    );
    return updateEmp;
  }

  /**
   *
   * Get All DemoModuleName
   *
   * @param  {object}   response
   * @param  {string}
   * @return {object}
   */
  async getDemoModuleName(req, skip, limit, searchField, sortObj, status) {
    var searchObj = {};
    if (searchField && searchField.length > 0) {
      searchObj = {
        $or: [
          { name: { $regex: new RegExp(searchField, "i") } },
          { name_normalized: { $regex: new RegExp(searchField, "i") } },
          { email: { $regex: new RegExp(searchField, "i") } },
          { phone: { $regex: new RegExp(searchField, "i") } },
        ],
        $and: [
          {
            status: Number(status),
          },
        ],
      };
    } else {
      searchObj = {
        status: Number(status),
      };
    }
    var allData = DemoModuleNameModel.find(searchObj)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));
    return allData;
  }

  /**
   *
   * Delete DemoModuleName
   *
   * @param  {object}   response
   * @param  {string}
   * @return {object}
   */
  async deleteDemoModuleName(id) {
    var deleteEmp = await DemoModuleNameModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { status: 2 } }
    );
    return deleteEmp;
  }
}

module.exports = new DemoService();
