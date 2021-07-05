const db = require('../../model/database.js')

exports.login = (req, res) => {
  let params = req.body
  db.oneOrNone(
      `select name from admin.user where email = $1 and password = $2`,[params.account,params.password])
    .then((data) => {
        if (data){
            res.json({
              data: data,
              msg: '管理員核可成功'
            })
          }
          else{
            res.json({
              msg: '是管理員嗎？'
            })
          }
    }).catch((err) => {
        console.log(err)
    });
}