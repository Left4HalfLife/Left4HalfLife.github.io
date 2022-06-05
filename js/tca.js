var activePage = "intro";
var allPages = [];

class Page{
	constructor(title, name, url){
		this.title = title;
		this.name = name;
		this.url = url;
	}
}

allPages.push(new Page("Introduction","intro","https://www.youtube.com/embed/_RIoiqgEkM0"));
allPages.push(new Page("SPEAKS","speaks","https://www.youtube.com/embed/bprtfIxcA1c"));
allPages.push(new Page("Drama","drama","https://www.youtube.com/embed/X-dvmMKfADg"));
allPages.push(new Page("Debating","debating","https://www.youtube.com/embed/EZQn-xIebRI"));
allPages.push(new Page("Creative Writing","creative_writing","https://www.youtube.com/embed/Akwm2UZJ34o"));

function navPage(page){

	var active = document.getElementsByClassName("nav_item_active")
	for (var i=0; i < active.length;i++){
		active[0].className = "nav_item";
	}
	document.getElementById(page).className="nav_item_active"
	console.log("active page: "+page);
	
	for (var i=0; i< allPages.length; i++){
		if (allPages[i].name === page){
			document.getElementById("embed_video").src = allPages[i].url;
		}
	}
}


function test(page){
	alert(page);
}