//负责用户操作相关的业务逻辑
const PositionModel = require("../model/position.js");

const add = (req, res) => {
	//接收formdata数据，必须依靠multer中间件，可以帮助我们解析formdata请求发送的数据（express的中间件），同时完成图片上传的功能。
	const {position,salary,company} = req.body;
	const logo = req.file.filename;
	PositionModel.savePosition(
		{position,salary,company,logo},
		() => {
			res.json({
				ret: true,
				data: true
			})
		}
	)
}
const delateElem = (req, res) => {
	const {id} = req.query;
	PositionModel.delate(id,
		() => {
			res.json({
				ret: true,
				data: true
			})
		}
	)
}
const updateMess = (req,res)=>{
	const {id} = req.query;
	PositionModel.Findupdate(id,(results)=>{
		res.json({
			ret:true,
			data:{
				list:results
			}
		})
	});
}
const saveUpdateData = (req,res)=>{
	const {id, position, salary, company } = req.body;
	const logo = req.file.filename;
	PositionModel.saveUpdate({ id, position, salary, company, logo},(results)=>{
		res.json({
			ret:true,
			data:true
		});
	});
}

const getlist = (req, res) => {
	const {
		page,
		count
	} = req.query;
	PositionModel.findAll((results) => {
		const totalPage = Math.ceil(results.length / count); //一共有多少页
		PositionModel.findPageList(
			{page,count},
			(results) => {
				res.json({
					ret: true,
					data: {
						list: results,
						total: totalPage
					}
				});
			});
	});
}

module.exports = {
	add,
	getlist,
	delateElem,
	updateMess,
	saveUpdateData
};