const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbtodo');
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
let todoSchema = new Schema({
    date: Date,
    task: String,
    status: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
})
let Todo = mongoose.model('Todos', todoSchema)
module.exports = Todo