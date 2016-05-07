var navbar = $("#navbar");
var hero = $("#hero");
var hero_text = $("#hero_text");

function scroll_callback(){
	var y_pos, jumbotron, header_text;
	y_pos = window.pageYOffset;
	if(y_pos > hero.height()){
		navbar.fadeIn("slow");
	}else{
		navbar.fadeOut("slow");
	}
	hero.css("top", y_pos * 0.7);
	hero_text.css("opacity", 30/y_pos);
	hero_text.css("top", -y_pos * 0.2);
}

$(document).ready(function(){
	console.log("greetings!");
});

window.addEventListener("scroll", scroll_callback);
