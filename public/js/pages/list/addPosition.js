/*添加职位相关的操作：填写信息后点击保存按钮，向服务器发送请求，并将填写的职位信息发送给服务器，服务器作出响应，将结果传给前端*/

function AddPosition(element) {
	this.element = element;
	this.PositionElem = this.element.find("#Position");
	this.SalaryElem = this.element.find("#Salary");
	this.CompanyElem = this.element.find("#Company");
	this.logoElem = this.element.find("#logo");
	this.bindEvents();
}

$.extend(AddPosition.prototype, {
	bindEvents: function() {
		var SubmitBtn = this.element.find("#SaveMessBtn");
		SubmitBtn.on("click", $.proxy(this.handleSaveBtnClick, this));
	},
	handleSaveBtnClick: function() {
		var formData  = new FormData();
		formData.append("position",this.PositionElem.val());
		formData.append("salary",this.SalaryElem.val());
		formData.append("company",this.CompanyElem.val());
		formData.append("logo",this.logoElem[0].files[0]);
		var data = {
			position: this.PositionElem.val(),
			salary: this.SalaryElem.val(),
			company: this.CompanyElem.val()
		};
		/*解决xss攻击*/
		/*data.position = data.position.replace(/</g,"&lt;");
		data.position = data.position.replace(/>/g,"&gt;");
		data.salary = data.salary.replace(/</g,"&lt;");
		data.salary = data.salary.replace(/>/g,"&gt;");
		data.company = data.company.replace(/</g,"&lt;");
		data.company = data.company.replace(/>/g,"&gt;");*/
		
		
		if(data.position == "" || data.salary == "" || data.company == "") {
			this.element.find("#Position_Tips").removeClass("hide").css("color", "red");
			setTimeout($.proxy(this.handleCheckPosition, this), 3000);
		} else {
			this.element.find("#Position_Tips").addClass("hide").css("color", "");
			$.ajax({
				url: "api/position/add",
				method:"POST",
				cache:false,
				data: formData,
				processData:false,
				contentType:false,
				success: $.proxy(this.handlePositionSucc, this),
				error: $.proxy(this.handlePositionError, this)
			});
		}
	},
	handlePositionSucc: function(res) {
		if(res.ret && res.data) {
			window.location.reload();
		} else {
			this.handlePositionError();
		}
	},
	handlePositionError: function() {
		alert("请求失败");
	},
	handleCheckPosition: function() {
		this.element.find("#Position_Tips").addClass("hide");
	}
})