var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.isPass){
    res.send({
      StatusCode:200,
      data: req._result,
      Message:"验证成功"
    })
    return 
  }
  res.send({
    StatusCode:400,
    Message:"邮箱地址或密码不对"
  })
});

module.exports = router;
