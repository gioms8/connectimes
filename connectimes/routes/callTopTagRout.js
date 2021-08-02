var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let jwt = require("jsonwebtoken");
let secretObj = require("../ignorefile/jwt");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res, next) => {
    var type = req.query.type;
    if(type == 'list'){
      //Category 리스트 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출 정보 입력
        req.body.mapper = 'CallTopTagMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectTopTag';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }else if(type == "decoded"){
        try {
          let token4 = req.body.token4;
          let decoded4 = jwt.verify(token4, secretObj.secret);
          res.send({"token4":decoded4});
          
        } catch (error) {
          res.send(error)
        }
      }
});

module.exports = router;