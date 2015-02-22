$(document).ready(function(){
	$.get("header.html", function(data){
		$("#my_header").html(data);
	});
	$.get("footer.html", function(data1){
		$("#my_footer").html(data1);
	});
	$.get("nav.html", function(data1){
		$("#my_nav").html(data1);
	});
});

function loadContent(content){
	$.get(content, function(data){
		$("#my_content").html(data);
	});
}