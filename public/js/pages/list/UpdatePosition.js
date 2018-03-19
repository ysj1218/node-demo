function UpdateMessage(element, Origindata) {
	this.element = element;
	this.Origindata = Origindata;
	this.UPosition = this.element.find("#update_Position");
	this.USalary = this.element.find("#update_Salary");
	this.UCompany = this.element.find("#update_Company");
	this.logo = this.element.find("#up_logo");
	this.showData();
	this.bindEvents();
}

$.extend(UpdateMessage.prototype, {
	showData: function() {
		this.UPosition.val(this.Origindata.position);
		this.USalary.val(this.Origindata.salary);
		this.UCompany.val(this.Origindata.company);
		console.log(this.logo[0].files[0]);
	},
	bindEvents: function() {
		var SaveBtn = this.element.find("#SaveUpdateBtn");
		SaveBtn.on("click", $.proxy(this.handleSaveClick, this));
	},
	handleSaveClick: function() {
		var formData = new FormData();
		formData.append("id", this.Origindata._id);
		formData.append("position", this.UPosition.val());
		formData.append("salary", this.USalary.val());
		formData.append("company", this.UCompany.val());
		formData.append("logo", this.logo[0].files[0]);
		var data = {
			id: this.Origindata._id,
			position: this.UPosition.val(),
			salary: this.USalary.val(),
			company: this.UCompany.val()
		};
		$.ajax({
			url: "api/position/saveUpdateData",
			method:"POST",
			cache: false,
			data: formData,
			processData: false,
			contentType: false,
			success: $.proxy(this.handleUpdateSaveSucc, this),
			error: $.proxy(this.handleUpdateSaveError, this)
		});
	},
	handleUpdateSaveSucc: function(res) {
		if(res.ret && res.data) {
			this.element.modal("hide");
			window.location.reload();
		}
	},
	handleUpdateSaveError: function() {
		console.log("请求失败");
	}
});