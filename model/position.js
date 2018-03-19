//引入数据库连接
const mongoose = require("../utills/database.js");

const Position = mongoose.model('position', {
	position: String,
	salary: String,
	company: String,
	logo:String
});
//保存数据
const savePosition = (positionInfo, succCb) => {
	const position = new Position(positionInfo);
	position.save().then(() => {
		succCb();
	});
}

const findAll = (succCb) => {
	Position.find({}).then((result) => {
		succCb(result);
	});
}
const delate = (id, succCb) => {
	Position.findByIdAndRemove(id).then((result) => {
		succCb(result);
	});
}

const findPageList = (listInfo, succCb) => {
	const {
		count,
		page
	} = listInfo;
	Position.find({}).limit(Number(count)).skip((page - 1) * count).then((result) => {
		succCb(result);
	});
}

const Findupdate = (id, succCb) => {
	Position.findById(id).then((result) => {
		succCb(result);
	});
}
const saveUpdate = (positionInfo, succCb) => {
	Position.update(
		{_id: positionInfo.id}, 
		positionInfo).then((result) => {
		succCb(result);
	});
}
module.exports = {
	savePosition,
	findAll,
	findPageList,
	delate,
	Findupdate,
	saveUpdate
}