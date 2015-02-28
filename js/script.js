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

//loads content selected in navbar - default: Dogodki
function loadContent(content){
	$.get(content, function(data){
		$("#my_content").html(data);
	});
}

function loadPills(tip){
	id = -1;
	$.get("./datoteke/dogodki/dogodki.json", function(dog){
		for(var i=0; i<dog["dogodki"].length; i++){
			if(!tip || dog["dogodki"][i]["tip"] == tip){
				var datum = dog["dogodki"][i]["datum"][0].split(",")[0];
				var ime = dog["dogodki"][i]["ime"];
				$("#d_dogodki ul").prepend("<li role='presentation' id='" + dog["dogodki"][i]["id"] + "'><a href='#my_content'><p>"+datum+"</p><p>"+ime+"</p></a></li>");
				id = dog["dogodki"][i]["id"];
			}
		}
		$("#d_dogodki ul li").first().addClass("active");
		izberiDogodek(id);
	}, "json");
}

//load event content from dogodki.json into #my_content
function izberiDogodek(id){
	console.log("izbira: " + id);
	$.get("./datoteke/dogodki/dogodki.json", function(dog){
		var dogodki = dog["dogodki"];
		for(i in dogodki){
			if(id == dogodki[i]["id"]){
				fillMyContent(dogodki[i]);
			}
		}
	}, "json");
}

//funkcija dobi objekt iz datoteke dogodki.json in ga vstavi v #my_content
function fillMyContent(dogodek){
	var podatki = dogodek["datum"] + ", ob " + dogodek["ura"] + ", " + dogodek["kraj"];
	console.log(podatki);
	$("#dog_naslov h2").html(dogodek["ime"] + "<br><small>" + dogodek["opis"] + "</small");
	$("#dog_kraj_datum").html("<p>"+dogodek["kraj"]+"</p>");
	for(i in dogodek["datum"]){
		$("#dog_kraj_datum").append("<p>"+dogodek["datum"][i]+"</p>");
	}
	$("#dog_plakat").html(dogodek["img_plakat"]);
	$("#dog_besedilo").html(dogodek["besedilo"]);
	$("#dog_album").html(dogodek["img_album"]);
	$("#dog_videos").empty();
	for(i in dogodek["videos"]){
		var video_url = dogodek["videos"][i];
		var video_html = "<div class='col-md-6'><div class='embed-responsive embed-responsive-4by3' style='margin-top: 10px'><iframe width='560' height='315' src='"+video_url+"' frameborder='0' allowfullscreen></iframe></div></div>";
		$("#dog_videos").append(video_html);
	}
}