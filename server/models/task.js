const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbtodo')
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
let taskSchema = new Schema({
    name: String
})
let Task = mongoose.model('Task', taskSchema)
module.exports = Task