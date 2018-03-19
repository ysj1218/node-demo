function Pagination(container){
	this.container = container;
	this.bindEvents();
}
Pagination.Template=`
	<% for(var i=0; i<count; i++) {%>
		<li><a href="javascript:void(0)"> <%= (i+1) %> </a></li>
	<% } %>
`;

$.extend(Pagination.prototype,{
	render:function(total){
		//total为数据总页数
		var str = new EJS({
			text:Pagination.Template
		}).render({
			count:total
		});
		this.container.html(str);
	},
	bindEvents:function(){
		this.container.on("click","li",$.proxy(this.handleClickPages,this));
	},
	handleClickPages:function(e){
		//var currentTarget = $(e.currentTarget);
		//console.log(currentTarget.find("a").html());
		var target = $(e.target);
		var pageNumber = parseInt(target.text(),10);
		$(this).trigger(new $.Event("change",{
			num : pageNumber
		}));
	}
});
