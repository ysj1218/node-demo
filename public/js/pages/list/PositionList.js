function PositionList(element) {
	this.element = element;
	this.tbody = this.element.find("tbody");
	this.getListData();
	this.bindEvents();
}
PositionList.Template = `
<% for(var i=0;i<list.length;i++) {%>
	<tr>
		<td><%= (i+1) %></td>
		<td><%= list[i].position %></td>
		<td><%= list[i].salary %></td>
		<td><%= list[i].company %></td>
		<td>
		<% if(list[i].logo){ %>
			<img style="width:100px; height:30px;" src="/uploads/<%= list[i].logo %>" />
		<% } else{ %>
			暂未上传
		<% } %>
		</td>
		<td><button type="button" class="btn btn-primary btn-xs updateBtn" data-toggle="modal" data-target="#UpdateModal">修改</button></td>
		<td><button type="button" id="<%= list[i]._id %>" class="btn btn-primary btn-xs delateBtn">删除</button></td>
	</tr>
<% } %>
`;

$.extend(PositionList.prototype, {
	getListData: function(page) {
		$.ajax({
			url: "api/position/getlist",
			data: {
				page: page || 1,
				count: 5
			},
			success: $.proxy(this.handleGetListSucc, this),
			error: $.proxy(this.handleGetListError, this)
		});
	},
	handleGetListSucc: function(res) {	
		//$(this)对PositionList对象的一层包装,在这层包装上触发change事件,携带了一个参数total
		$(this).trigger(new $.Event("change",{
			total:res.data.total
		}));
		var str = new EJS({
			text:PositionList.Template
		}).render({
			list:res.data.list
		});	
		this.tbody.html(str);
	},
	handleGetListError: function() {
		alert("请求失败");
	},
	changeList:function(page){
		if(page){
			this.nowPage = page;
		}
		$.ajax({
			url: "api/position/getlist",
			data: {
				page: page || this.nowPage,
				count: 5
			},
			success: $.proxy(this.handleChangeListSucc, this),
		});
	},
	handleChangeListSucc:function(res){
		var str = new EJS({
			text:PositionList.Template
		}).render({
			list:res.data.list
			
		});	
		this.tbody.html(str);
	},
	bindEvents:function(){
		this.element.on("click",".delateBtn",$.proxy(this.handleDelateClick,this));
		this.element.on("click",".updateBtn",$.proxy(this.handleUpdateClick,this));
	},
	handleDelateClick:function(e){
		var target = $(e.target);
		$.ajax({
			url:"api/position/delate",
			data:{
				id:target.attr("id")
			},
			success:$.proxy(this.handleDeleteSucc,this)
		});
	},
	handleDeleteSucc:function(res){
		if(res.ret && res.data){
			this.changeList();		
		}
	},
	handleUpdateClick:function(e){
		var target = e.target;
		var Uid = $(target).parent().next().children("button").attr("id");
		$.ajax({
			url:"api/position/update",
			data:{
				id:Uid
			},
			success:$.proxy(this.handleUpdateSucc,this),
			error:$.proxy(this.handleUpdateError,this)	
		});
	},
	handleUpdateSucc:function(res){
		var updatedata = res.data.list;
		var UpdateModel = $("#UpdateModal");
		this.updateMessage = new UpdateMessage(UpdateModel,updatedata);
		
	},
	handleUpdateError:function(){
		//alert("请求失败");
	}
});