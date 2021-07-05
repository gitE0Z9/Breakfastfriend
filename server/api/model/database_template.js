const promise = require('bluebird')

var options = {
    promiseLib: promise
}

var pg = require("pg-promise")(options)

var connection = ""

var db = pg(connection)

module.exports = db



