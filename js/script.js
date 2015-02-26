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
				var datum = dog["dogodki"][i]["datum"];
				$("#d_dogodki ul").prepend("<li role='presentation' id='" + dog["dogodki"][i]["id"] + "'><a href='#my_content'>" + datum + "</a></li>");
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
	$("#dog_naslov h2").html(dogodek["ime"] + " <small>" + podatki + "</small");
	var img_plakat = dogodek["img_plakat"];
	$("#dog_plakat").html("<img class='img-responsive' src='"+img_plakat+"'>");
	$("#dog_besedilo").text(dogodek["besedilo"]);
	$("#dog_album").html(dogodek["img_album"]);
}