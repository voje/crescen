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
	loadContent("./pages/dogodki.html");
});

function loadContent(content){
	$.get(content, function(data){
		$("#my_content").html(data);
	});
}

function loadDogodki(tip){
	$.get("./datoteke/dogodki/dogodki.json", function(dog){
		for(var i=0; i<dog["dogodki"].length; i++){
			if(!tip || dog["dogodki"][i]["tip"] == tip){
				var datum = dog["dogodki"][i]["datum"];
				var active = "";
				if(i == dog["dogodki"].length-1){
					active = "class = 'active'";
				}
				$("#d_dogodki ul").prepend("<li role='presentation'" + active + "><a href='#'>" + datum + "</a></li>");
			}
		}
		$("#d_dogodki ul li").first().addClass("active");
	}, "json");
}

function izberiDogodek(){

}