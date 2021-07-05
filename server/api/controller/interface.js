const express = require('express')
var user = require('./user')
var staff = require('./staff')
var admin = require('./admin')
var admin_mem = require('./admin/mem')

var router = express.Router()

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.put('/user/verify', user.verify)
router.post('/user/test', user.test)
router.post('/admin/login', admin.login)
router.post('/admin/mem', admin_mem.query)

module.exports = router
