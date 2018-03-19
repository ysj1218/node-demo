function Header(container,page){
	this.container = container;
	this.page = page||"index";
	this.createDom();
	this.bindEvents();
	this.createRegister();
	this.createLogin();
	this.getLoginStatus();
}
Header.Template = `<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
     			 	</button>
					<a class="navbar-brand" href="#">xxxxxx</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li <% if(page == 'index'){ %> class="active"<% } %> >
							<a href="/">首页</a>
						</li>
						<li <% if(page == 'list'){ %> class="active"<% } %> >
							<a href="/list.html">列表页</a>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right" id="UserloginArea">
						<li data-toggle="modal" data-target="#registerModal">
							<a href="#">注册</a>
						</li>
						<li data-toggle="modal" data-target="#loginModal">
							<a href="#">登录</a>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right hide" id="UserlogoutArea">
						<li>
							<a href="#" id="js-UserLogin"></a>
						</li>
						<li id="UserLogoutBtn">
							<a href="#">退出</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>`;
$.extend(Header.prototype,{
	createDom : function(){
		var html = new EJS({text:Header.Template}).render({
			page:this.page
		});
		this.element = $("<div></div>").append(html);
		this.UserloginArea = this.element.find("#UserloginArea");
		this.UserlogoutArea = this.element.find("#UserlogoutArea");
		this.UserLogoutBtn = this.element.find("#UserLogoutBtn");
		this.container.append(this.element);
	},
	createRegister : function(){
		this.register = new Register(this.container);
	},
	createLogin : function(){
		this.login = new Login(this.container);
	},
	getLoginStatus:function(){
		$.ajax({
			url:"/api/user/isLogin",
			success:$.proxy(this.handleLoginSucc,this)
		})
	},
	handleLoginSucc:function(res){
		if(res.ret && res.data.login){
			this.UserlogoutArea.removeClass("hide");
			this.UserloginArea.addClass("hide");
			$("#js-UserLogin").html("欢迎"+res.data.Uname);		
		}
	},
	bindEvents:function(){
		this.UserLogoutBtn.on("click",$.proxy(this.handleLogoutBtn,this));
	},
	handleLogoutBtn:function(){
		$.ajax({
			url:"api/user/Logout",
			success:$.proxy(this.handleLogoutSucc,this)
		});
	},
	handleLogoutSucc:function(res){
		if(res.ret && res.data.logout){
			window.location.reload();
		}
	}
});
