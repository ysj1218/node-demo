function Register(container) {
	this.container = container;
	this.createDom();
	this.check();
	this.bindEvents();
}
Register.Template = `<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="registerModalLabel">注册</h4>
					</div>
					<!--表单内容-->
					<div class="modal-body">
					<div class="alert alert-danger hide" role="alert" id="register_tips"></div>
						<form>
							<div class="form-group">
								<label for="RegisterUser">用户名</label>
								<input type="email" class="form-control" id="RegisterUser" placeholder="请输入用户名">
							</div>
							<div class="form-group">
								<label for="RegisterPassword">密码</label>
								<input type="password" class="form-control" id="RegisterPassword" placeholder="请输入密码">
							</div>
							<div class="form-group">
								<label for="RegisterRePwd">确认密码</label>
								<input type="password" class="form-control" id="RegisterRePwd" placeholder="请再次输入密码">
							</div>
							<div class="form-group">
								<label for="RegisterEmail">邮箱</label>
								<input type="password" class="form-control" id="RegisterEmail" placeholder="请输入邮箱">
							</div>
						</form>
						<div class="alert alert-danger hide" role="alert" id="js-RegisterError">该用户已经注册!</div>
						<div class="alert alert-success hide" role="alert" id="js-RegisterSucc">恭喜你,注册成功!</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="js-registerBtn">注册</button>
					</div>
				</div>
			</div>
		</div>`;
$.extend(Register.prototype, {
	createDom: function() {
		//这样写不会和其他的组件冲突
		this.element = $("<div></div>").append(Register.Template);
		this.successElem = this.element.find("#js-RegisterSucc");
		this.errorElem = this.element.find("#js-RegisterError");
		this.errorTips = this.element.find("#register_tips");
		this.name = this.element.find("#RegisterUser");
		this.password = this.element.find("#RegisterPassword");
		this.repwd = this.element.find("#RegisterRePwd");
		this.email = this.element.find("#RegisterEmail");
		this.container.append(this.element);
		this.regExp = [false, false, false, false];
	},
	//当点击注册按钮时执行的函数
	bindEvents: function() {
		var submitBtn = this.element.find("#js-registerBtn");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		this.check();
		var num = 0;
		this.regExp.forEach(function(status, i) {
			if(status == true) {
				num += 1;
			}
		});
		console.log(num);
		if(num == 4) {
			this.errorTips.removeClass("hide").addClass("hide");
			$.ajax({
				url: "/api/user/register",
				type: "POST",
				data: {
					name: this.name.val(),
					password: this.password.val()
				},
				success: $.proxy(this.handleSubmitSucc, this),
				error: $.proxy(this.handleSubmitError, this)
			});
		} else {
			this.check();
			this.errorTips.addClass("hide").removeClass("hide").html("请输入");
		}

	},
	handleSubmitSucc: function(response) {
		//response.ret 代表服务器正确请求     data为true：注册成功
		if(response.ret && response.data) {
			this.successElem.removeClass("hide");
			setTimeout($.proxy(this.handleRegisterFinish, this), 1000);
		} else {
			this.errorElem.removeClass("hide");
			setTimeout($.proxy(this.handleRegisterError, this), 3000);
		}
	},
	handleSubmitError: function(res) {
		alert("请求失败");
	},
	handleRegisterFinish: function() {
		this.successElem.addClass("hide");
		$("#registerModal").modal("hide");
	},
	handleRegisterError: function() {
		this.errorElem.addClass("hide");
	},
	check: function() {
		this.name.on("blur", $.proxy(this.CheckuserName, this));
		this.password.on("blur", $.proxy(this.CheckuserPassword, this));
		this.repwd.on("blur", $.proxy(this.CheckuserrePwd, this));
		this.email.on("blur", $.proxy(this.CheckEmail, this));
	},
	CheckuserName: function() {
		if(this.name.val() == "") {
			this.errorTips.removeClass("hide").html("用户名不能为空!");
		} else {
			var reg = /^\w{6,26}$/;
			var str = this.name.val();
			if(str.match(reg)) {
				this.errorTips.addClass("hide");
				this.regExp[0] = true;
			} else {
				this.errorTips.removeClass("hide").html("用户名格式不正确!");
			}

		}
	},
	CheckuserPassword: function() {
		if(this.password.val() == "") {
			this.errorTips.addClass("hide").removeClass("hide").html("请输入密码!");
		} else {
			var reg = /^\w{6,26}$/;
			var str = this.password.val();
			if(str.match(reg)) {
				this.regExp[1] = true;
			} else {
				this.errorTips.addClass("hide").removeClass("hide").html("密码格式不正确，请重新输入");
			}
		}
	},
	CheckuserrePwd: function() {
		if(this.repwd.val() == "") {
			this.errorTips.addClass("hide").removeClass("hide").html("请输入确认密码!");
		} else {
			this.errorTips.removeClass("hide").addClass("hide");
			if(this.password.val() == this.repwd.val()) {
				this.regExp[2] = true;
				this.errorTips.removeClass("hide").addClass("hide");
			} else {
				this.errorTips.addClass("hide").removeClass("hide").html("两次密码不一致");
			}
		}
	},
	CheckEmail: function() {
		if(this.email.val() == "") {
			this.errorTips.addClass("hide").removeClass("hide").html("邮箱不能为空!");
		} else {
			var reg = /^\w+\@\w+$/;
			var str = this.email.val();
			if(str.match(reg)) {
				this.regExp[3] = true;
				this.errorTips.removeClass("hide").addClass("hide");
			} else {
				this.errorTips.addClass("hide").removeClass("hide").html("邮箱格式不正确，请重新输入");
			}
		}
	}
})