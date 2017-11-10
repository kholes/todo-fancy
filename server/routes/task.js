const express = require('express')
const router = express.Router()
const controller = require('../controllers/task')
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/', controller.create)
router.put('/:id', controller.edit)
router.delete('/:id', controller.delete)
module.exports = router