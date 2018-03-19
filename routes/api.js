var express = require('express');

var router = express.Router();
const userController = require("../controller/user.js");
const positionController = require("../controller/position.js");
const upload = require("../utills/uploadimg.js");

//用户相关的路由
router.post("/user/register",userController.register);
router.post("/user/login",userController.login);
router.get("/user/isLogin",userController.isLogin);
router.get("/user/Logout",userController.Logout);

//职位相关的路由
router.post("/position/add",upload.single('logo'),positionController.add);  //应用single方法解析logo成服务器可以直接使用的数据。
router.get("/position/delate",positionController.delateElem);
router.get("/position/update",positionController.updateMess);
router.post("/position/saveUpdateData",upload.single('logo'),positionController.saveUpdateData);
router.get("/position/getlist",positionController.getlist);



module.exports = router;
