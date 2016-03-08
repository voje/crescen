$(document).ready(function(){
	console.log("ready!");
	//dogodki
	loadPills();

	//dirigent
	$.get("./datoteke/zivljenjepis/cv_slo.txt", function(text){
		$("#dirigent_cv_slo").text(text);
	}, 'text');
	$.get("./datoteke/zivljenjepis/cv_eng.txt", function(text){
		$("#dirigent_cv_eng").text(text);
	}, 'text');

	//orkester
	$.get("./datoteke/zgodovina.txt", function(text){
		$("#ork-zgodovina").html(text);
	}, 'html');

	//mpz
	$.get("./datoteke/mpz.txt", function(text){
		$("#mpz-zgodovina").html(text);
	}, 'html');

	//media
	$.getJSON("../datoteke/videi.json", function(data){
		for(var i=0; i<data.length; i++){
			var url = data[i]["url"];
			$("#videos_row").append("<iframe class='col-md-6' style='padding-top:5px; padding-bottom:5px' src='" + url + "' width='50%' height='400' frameborder='0' allowfullscreen></iframe>");
		}
	});

	//navbar handler
	$(".nav-selection").on("click", function(){
		$(".nav-selected").removeClass("nav-selected");
		$(this).addClass("nav-selected");
	});

});

//handle pills
var selectedPill = null;
$(document).on("click", "#d_dogodki ul li", function(){
	console.log("pill click");
	if($("#d_dogodki ul li").first().hasClass("active")){
		$("#d_dogodki ul li").first().removeClass("active");
	}
	if(selectedPill != null){
		selectedPill.removeClass("active");
	}
	$(this).addClass("active");
	selectedPill = $(this);

	izberiDogodek($(this).attr("id"));

});

function showContent(id){
	console.log("showing " + id);
	$("#my_content > *").hide();
	$("#"+id).show();
}

function loadPills(tip){
	console.log("loading pills");
	id = -1;
	$.get("./datoteke/dogodki/dogodki.json", function(dog){
		for(var i=0; i<dog["dogodki"].length; i++){
			if(!tip || dog["dogodki"][i]["tip"] == tip){
				var datum = dog["dogodki"][i]["datum"][0].split(",")[0];
				var ime = dog["dogodki"][i]["ime"];
				$("#d_dogodki ul").prepend("<li role='presentation' id='" + dog["dogodki"][i]["id"] + "'><a href='#dog_naslov'><p>"+datum+"</p><p>"+ime+"</p></a></li>");
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