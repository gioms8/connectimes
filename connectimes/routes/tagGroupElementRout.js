var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

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
        req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectTagGroupElement';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    } else if(type == 'delete'){
        //Category 리스트 조회
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출 정보 입력
          req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
          req.body.crud = 'delete';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'deleteTagGroupElement';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
      } else if(type == 'delete2'){
        //Category 리스트 조회
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출 정보 입력
          req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
          req.body.crud = 'delete';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'deleteTagGroupElement2';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
      } else if(type == 'update'){
        //Category 리스트 조회
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출 정보 입력
          req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
          req.body.crud = 'update';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'updateTagGroupElement';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
      } else if(type == 'insert'){
        //Category 리스트 조회
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출 정보 입력
          req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
          req.body.crud = 'insert';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'insertNewTagname';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
      } else if(type == 'insert2'){
        //Category 리스트 조회
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출 정보 입력
          req.body.mapper = 'TagGroupElementMapper';//mybatis xml 파일명
          req.body.crud = 'insert';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'insertNewTagGroup';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
      }
});

module.exports = router;