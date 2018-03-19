//引入数据库连接
const mongoose = require("../utills/database.js");

//创建一张表，名字为users,表中有name和password（如果没有users表，创建一张users表，如果有直接使用）
const User = mongoose.model('user',{
	name:String,
	password:String
});
//保存数据
const saveUser = (userInfo,succCb)=>{
	const user = new User(userInfo);
	//user.save(function(err){
	//	if(err){
	//		console.log(err);
	//	}else{
	//		console.log("注册成功");
	//	}
	//});
	//向表里存储数据，如果存储成功，调用succCb()方法，否则调用errCb()方法
	user.save().then(()=>{
		succCb();
	})
}
const findOneUser = (userInfo,succCb)=>{
	User.find(userInfo).then((result)=>{
		succCb(result);
	})
}
module.exports = {
	saveUser,
	findOneUser
}
