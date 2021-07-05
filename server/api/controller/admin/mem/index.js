const db = require('../../../model/database.js')

exports.query = (req, res) => {
    let params = req.body
    db.oneOrNone(
        `select * from member.user where email = $1`,[params.mail])
      .then((data) => {
          if (data){
              res.json({
                data: data,
                msg: '搜尋會員成功'
              })
            }
            else{
              res.json({
                msg: '會員不存在！'
              })
            }
      }).catch((err) => {
          console.log(err)
      });
  }
