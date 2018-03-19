function Page(){
	this.container = $("#headercontainer");
}
$.extend(Page.prototype,{
	init : function(){
		this.createHeader();
	},
	createHeader : function(){
		this.header = new Header(this.container,"index");
	}
});

var page = new Page();
page.init();
