const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbtodo')
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
let userSchema = new Schema({
    username:{ 
        type: String, 
        minlength: 3, 
        unique: true,
        required: [true, "username required"]
    },
    password: {
        type: String, 
        minlength: 6,
        required: [true, "password required"]
    },
    salt:String,
    role:String
})
let User = mongoose.model('User', userSchema)
module.exports = User