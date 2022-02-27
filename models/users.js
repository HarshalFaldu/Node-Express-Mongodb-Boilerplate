let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    role: Number,
    name: String,
    email: String,
    password:String,
    status: Number
},
{timestamps: true}
)

module.exports = mongoose.model("users",userSchema)