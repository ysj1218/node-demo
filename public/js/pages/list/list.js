function Page(){
	this.container = $("#headercontainer");
}
$.extend(Page.prototype,{
	init:function(){
		this.createHeader();
		this.createAddPosition();
		this.createPogination();
		this.createPositionList();
	},
	//header功能(header公共目录下common->header.js)
	createHeader:function(){
		this.header = new Header(this.container,"list");
	},
	//添加职位
	createAddPosition:function(){
		var AddModal = $("#AddPositionModal");
		this.addPosition = new AddPosition(AddModal);
	},
	createPositionList:function(){
		var TableList = $("#Position_List");
		this.PositionList = new PositionList(TableList);
		//列表组件一旦监听到数据有变化(添加数据时) 就执行handleListChange，里面执行pagination里面的render方法，对页面进行渲染。
		$(this.PositionList).on("change",$.proxy(this.handleListChange,this));
	},
	createPogination:function(){
		var Pgcontainer = $("#pagination");
		this.pagination = new Pagination(Pgcontainer);
		$(this.pagination).on("change",$.proxy(this.handlePageChange,this));
	},
	handleListChange:function(e){
		this.pagination.render(e.total);
	},
	handlePageChange:function(e){
		this.PositionList.changeList(e.num);
	}
});
var page = new Page();
page.init();
