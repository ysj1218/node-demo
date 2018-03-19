//负责用户操作相关的业务逻辑
const UserModel = require("../model/user.js");
//node核心模块 :crypto加密
const crypto = require("crypto");

const register = (req, res) => {
	const {name,password} = req.body; //post来的数据都在req.body里面

	//在数据库中查找是否有该用户
	UserModel.findOneUser({name}, (result) => {
		if(result.length > 0) {
			res.json({
				ret: true,
				data: false
			});
		} else {
			//加密
			const hash = crypto.createHash("sha256"); //sha256算法的名字
			hash.update(password);
			//saveUser中传入三个参数，（存储的用户信息，存储成功的回调，存储失败的回调）
			UserModel.saveUser({
				name,
				password: hash.digest('hex') //加密后的密码 是不可逆的，不能还原(加密的过程是单向的)
			}, () => {
				//注册成功，给前端返回json数据  相当于v层
				res.json({
					ret: true,
					data: true
				})
			});
		}
	});
}

const login = (req, res) => {
	const {
		name,
		password
	} = req.body; //post来的数据都在req.body里面
	//加密
	const hash = crypto.createHash("sha256"); //sha256算法的名字
	hash.update(password);
	//在数据库中查找是否有该用户
	UserModel.findOneUser({
		name,
		password: hash.digest('hex')
	}, (result) => {
		if(result.length > 0) {
			req.session.login = true;
			req.session.Loginname = name;
			res.json({
				ret: true,
				data: {
					login: true
				}
			});
		} else {
			res.json({
				ret: true,
				data: {
					login: false
				}
			})
		}
	});
}

const isLogin = (req, res) => {
	if(req.session.login){
		res.json({
			ret:true,
			data:{
				login:true,
				Uname:req.session.Loginname
			}
		})
	}else{
		res.json({
			ret:true,
			data:{
				login:false
			}
		});
	}
}


const Logout = (req, res) => {
	req.session.login = null;
	res.json({
		ret:true,
		data:{
			logout:true
		}
	});
}

module.exports = {
	register,
	login,
	isLogin,
	Logout
};