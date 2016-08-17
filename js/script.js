var select = {
	navbar: $("#navbar"),
	hero: $("#hero"),
	hero_text: $("#hero-text"),
	hero_arrow: $("#hero-arrow"),
	recent_event: $("#recent-event"),
	conductor_img: $("#conductor-img"),
	content: $("#content"),
	footer: $("footer"),
	body: $("body")
};

var events_data = {};
var phone_mode = false;

function check_mobile() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		phone_mode = true;
		return true;
	}
	return false;
}

function display_event(id){
	event = events_data[id];
	//display header, video?, place, time?, poster?, commentary
	select.recent_event.append("<h2>"+ event.ime +"</h2>");	

	if(event.opis != "")
		select.recent_event.append("<p>"+ event.opis +"</p>");	

	if(event.videos.length != 0) {
		for (i in event.videos) {
			select.recent_event.append("<figure><iframe src='"+ event.videos[i] +"'/></figure>");
		}
	}

	if (event.img_album != "") {
		//todo: display album, fix album representation in dogodki.json
		select.recent_event.append("<figure><iframe id='flickr_album' src='"+event.img_album+"' scrolling='no' frameborder='0'style='position: relative; top:0; left:0;' ></iframe>");
	}

	if(event.kraj != "")
		select.recent_event.append("<p>"+ event.kraj +"</p>");	

	if(event.datum != "")
		select.recent_event.append("<p>"+ event.datum +"</p>");	

	if(event.img_plakat != "")
		select.recent_event.append("<figure><img src='"+ event.img_plakat +"'/></figure>");	

	if(event.besedilo != "")
		select.recent_event.append("<p>"+ event.besedilo +"</p>");	

	select.recent_event.append("<button id='button-all-events'>Vsi dogodki</button>");
}

function load_events_data(data){
	events_data = data;
	var keys = Object.keys(events_data);	
	var last_event_id = keys[keys.length - 1];
	//first run: display the last event on homepage
	display_event(last_event_id);
}

function load_header(data){
	var num = Math.floor(Math.random()*data.length);	//select a random image
	var im = data[num][0];
	var color = data[num][1];
	var base_color = "#FFF";
	select.hero.css("background-image", "url("+ im +")");
	select.content.css("background", color);
	select.content.css("background", "-webkit-linear-gradient("+base_color+", "+color+")");
	select.content.css("background", "-o-linear-gradient("+base_color+", "+color+")");
	select.content.css("background", "-moz-linear-gradient("+base_color+", "+color+")");
	select.content.css("background", "linear-gradient("+base_color+", "+color+")");
	select.footer.css("background-color", color);
}

function scroll_callback() {
	var y_pos = window.pageYOffset;
	if(y_pos > select.hero.height()){
		select.navbar.fadeIn("slow");
	}else{
		select.navbar.fadeOut("slow");
	}
	select.hero.css("top", y_pos * 0.7);
	select.hero_text.css("opacity", 30/y_pos);
	select.hero_text.css("top", -y_pos * 0.2);
	select.hero_arrow.css("top", -y_pos * 0.2);
	//select.conductor_img.css("top", -y_pos * 0.7);
}

$(document).ready(function() {
	console.log("greetings!");
	check_mobile();
	$.getJSON("./images/jumbotrons/headers.json", load_header);
	$.getJSON("./data/dogodki.json", load_events_data);
});

if (!check_mobile()) {
	console.log("Adding scroll listener.");
	window.addEventListener("scroll", scroll_callback);
}

function scroll_to_anchor(anchor_id) {
    var tag = $("#"+anchor_id+"");
    $('html,body').animate({scrollTop: tag.offset().top - 50},'slow');
}

$("#nav-recent-event").click(function() { scroll_to_anchor("recent-event"); });
$("#nav-conductor").click(function() { scroll_to_anchor("conductor"); });
$("#nav-contact").click(function() { scroll_to_anchor("contact"); });
$("#nav-orchestra").click(function() { scroll_to_anchor("orchestra"); });
$("#nav-choir").click(function() { scroll_to_anchor("choir"); });

//toggle CV language
$("#cv-slo-to-eng").click(function() { $("#cv-slo").hide(); $("#cv-eng").show(); return false; });
$("#cv-eng-to-slo").click(function() { $("#cv-eng").hide(); $("#cv-slo").show(); return false; });

//list all events (binding to outer element, since button was dynamic)
//build thumbnail from inside out
select.recent_event.on("click", "#button-all-events", function(){
	select.recent_event.empty();
	select.recent_event.append("<h2>Vsi dogodki</h2>");
	var row = $("<div id='event-thumbnails' class='row'></div>");
	for(event in events_data) { //event is key
		var im = $("<a href='#'><figure class='event-thumbnail' id='"+ event +"'><img src="+ events_data[event]["img_plakat"] +"/></figure></a>");
		var di = $("<div class='col-md-6'></div>");
		di.append(im);
		row.prepend(di);
	}
	select.recent_event.append(row);
	scroll_to_anchor("recent-event");
});

select.recent_event.on("click", ".event-thumbnail", function(){
	select.recent_event.empty();
	display_event($(this).attr("id"));
	scroll_to_anchor("recent-event");
	return false;
});
