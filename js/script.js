$(document).ready(function(){
	console.log("hello");
});

function scroll_callback(){
	var y_pos, jumbotron, header_text;
	y_pos = window.pageYOffset;
	$("#hero").css("top", y_pos * 0.7);
	$("#hero_text").css("opacity", 30/y_pos);
	$("#hero_text").css("top", -y_pos * 0.2);
}

window.addEventListener("scroll", scroll_callback);
