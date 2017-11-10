const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
let todo = require('./routes/todo')
let user = require('./routes/user')
let task = require('./routes/task')
let login = require('./routes/login')
app.use('/login', login)
app.use('/users', user)
// app.use('/tasks', task)
app.use('/todos', todo)
app.use((req,res) => {
    res.status(404).send("<h3>Oop's..page not found ?</h3>")
})
app.listen(3000, () => {
    console.log('Ready on port 3000')
})