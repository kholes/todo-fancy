const express = require('express')
const router = express.Router()
const controller = require('../controllers/login')
const tools = require('../helper/tools')
router.post('/', controller.login)
// router.post('/fb', controller.loginFB)
router.post('/cekToken', tools.isLogin)
module.exports = router