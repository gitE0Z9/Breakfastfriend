const express = require('express')

var databases = require('./controller/interface')

var router = express.Router()

// Add databases Routes
router.use(databases)

module.exports = router