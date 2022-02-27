let mongoose = require('mongoose')
let DemoModelName = new mongoose.Schema({
    name : String,
    name_normalised : String,
    email: String,
    phone : String,
    status : {
      type : Number,
      default: 1
    },//0 = inactive,1=active,2=deleted
    deletedAt: {type : Date}
  }, { timestamps: true })

module.exports = mongoose.model("DemoTableName",DemoModelName)