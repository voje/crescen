var select = {
	navbar: $("#navbar"),
	hero: $("#hero"),
	hero_text: $("#hero-text"),
	hero_arrow: $("#hero-arrow"),
	recent_event: $("#recent-event")	
};

var events_data = {};

function display_event(id){
	event = events_data[id];
	//display header, video?, place, time?, poster?, commentary
	select.recent_event.append("<h2>"+ event.ime +"</h2>");	

	if(event.opis != "")
		select.recent_event.append("<p>"+ event.opis +"</p>");	

	if(event.videos.length != 0)
		for(i in event.videos){
			select.recent_event.append("<figure><iframe src='"+ event.videos[i] +"'/></figure>");
		}

	if(event.kraj != "")
		select.recent_event.append("<p>"+ event.kraj +"</p>");	

	if(event.datum != "")
		select.recent_event.append("<p>"+ event.datum +"</p>");	

	if(event.img_plakat != "")
		select.recent_event.append("<figure><img src='"+ event.img_plakat +"'/>");	

	if(event.besedilo != "")
		select.recent_event.append("<p>"+ event.besedilo +"</p>");	
}

function load_events_data(data){
	events_data = data;
	var keys = Object.keys(events_data);	
	var last_event_id = keys[keys.length - 1];
	//first run: display the last event on homepage
	display_event(last_event_id);
}

function load_header(data){
	var im = data[1][0];
	select.hero.css("background-image", "url("+ im +")");
}

function scroll_callback(){
	var y_pos, jumbotron, header_text;
	y_pos = window.pageYOffset;
	if(y_pos > select.hero.height()){
		select.navbar.fadeIn("slow");
	}else{
		select.navbar.fadeOut("slow");
	}
	select.hero.css("top", y_pos * 0.7);
	select.hero_text.css("opacity", 30/y_pos);
	select.hero_text.css("top", -y_pos * 0.2);
	select.hero_arrow.css("top", -y_pos * 0.2);
}

$(document).ready(function(){
	console.log("greetings!");
	$.getJSON("./images/jumbotrons/headers.json", load_header);
	$.getJSON("./data/dogodki.json", load_events_data);
});

window.addEventListener("scroll", scroll_callback);

function scroll_to_anchor(anchor_id){
    var tag = $("#"+anchor_id+"");
    $('html,body').animate({scrollTop: tag.offset().top - 50},'slow');
}

$("#nav-recent-event").click(function(){ scroll_to_anchor("recent-event"); });
$("#nav-contact").click(function(){ scroll_to_anchor("contact"); });

