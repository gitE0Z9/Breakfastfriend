const db = require('../../model/database.js')
const mail = require('../../credentials/mail.js')

exports.register = (req, res) => {
  let params = req.body
  db.none(
      `insert into member.user(name,email,password) values ($1,$2,$3)`,[params.name,params.email,params.password])
    .then((data) => {
        res.json({
          msg: '註冊成功'
        })
        mail.verify(params.email,params.email)
    }).catch((err) => {
      res.json({
        msg: '信箱已被註冊'
      })
    });
}

exports.login = (req, res) => {
  let params = req.body
  db.oneOrNone(
      `select id, name, state from member.user where email = $1 and password = $2`,[params.email,params.password])
    .then((data) => {
      if (data){
        res.json({
          data: data,
          msg: '登入成功'
        })
      }
      else{
        res.json({
          msg: '登入失敗'
        })
      }
    }).catch((err) => {
      console.log(err)
    });
}

exports.verify = (req, res) => {
  let params = req.body
  db.none(
      `update member.user set state = 'untested' where id = $1`,[params.id])
    .then((data) => {
      if (data){
        res.json({
          data: data,
          msg: '驗證成功'
        })
      }
    }).catch((err) => {
      console.log(err)
    });
}

exports.test = (req, res) => {
  let params = req.body
  db.none(
      `insert into member.test(id,sex,year,toward,job,C,D1,D2,O,E,S1,S2,A,P1,P2,N,F1,F2) 
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        [params.id,params.sex,params.year,params.toward,params.job,params.result].flat())
    .then((data) => {
        res.json({
          msg: '測驗完成'
        })
    }).then(()=>{
      db.none(
        "update member.user set state='activate' where id=$1",[params.id])
    }).catch((err) => {
      res.json({
        msg: '測驗儲存失敗'
      })
    });

}