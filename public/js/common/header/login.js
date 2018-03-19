function Login(container){
	this.container = container;
	this.createDom();
	this.bindEvents();
}
 Login.Template = `<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="loginModalLabel">登录</h4>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label for="loginuser">用户名</label>
								<input type="email" class="form-control" id="loginuser" placeholder="请输入用户名">
							</div>
							<div class="form-group">
								<label for="loginpassword">密码</label>
								<input type="password" class="form-control" id="loginpassword" placeholder="请输入密码">
							</div>
						</form>
						<div class="alert alert-danger hide" role="alert" id="js-loginError">用户名和密码错误,请重新输入!</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="js-loginBtn">登录</button>
					</div>
				</div>
			</div>
		</div>
 `;

$.extend(Login.prototype,{
	createDom : function(){
		this.element = $("<div><div>").append(Login.Template);
		this.container.append(this.element);
	},
	bindEvents:function(){
		var loginSubmitBtn = this.element.find("#js-loginBtn");
		loginSubmitBtn.on("click",$.proxy(this.handleSubmitBtn,this));
	},
	handleSubmitBtn:function(){
		var name = this.element.find("#loginuser").val();
		var password = this.element.find("#loginpassword").val();
		$.ajax({
			url:"api/user/login",
			type:"POST",
			data:{
				name:name,
				password:password
			},
			success:$.proxy(this.handleSubmitSucc,this),
			error: function(res){
				alert("请求失败");
			}
		});
	},
	handleSubmitSucc:function(res){
		if(res.ret && res.data.login){
			window.location.reload();
		}else{
			this.element.find("#js-loginError").removeClass("hide");
			setTimeout($.proxy(this.handleSubmitError,this),3000);
		}
	},
	handleSubmitError:function(){
		this.element.find("#js-loginError").addClass("hide");
	}
});
