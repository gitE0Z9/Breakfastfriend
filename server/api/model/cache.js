const redis= require('redis')
var client=redis.createClient(6379,'redis',{})

client.on('error', function (err) {
    console.log('Redis 錯誤 :', err)
})
  
client.on('connect', function () {
    console.log('Redis連接成功')
})

module.exports = client

