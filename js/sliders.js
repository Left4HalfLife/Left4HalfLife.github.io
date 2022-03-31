const position = { x: 0, y: 0 };
var boxes = [];
var active = -1;

interact('.draggable').draggable({	
  listeners: {
    start (event) {
      //console.log(event.type, event.target)
	  //console.log(position.x);
	  position.x = getTranslate(event.target.style.transform)[0];
	  position.y = getTranslate(event.target.style.transform)[1];
    },
    move (event) {

    position.x += event.dx;
	
	position.y += event.dy;
     event.target.style.transform =
	  `translate(${position.x}px, ${position.y}px)`

	},
	end (event){
		//console.log(position.x,position.y);
		//console.log(event.target.getBoundingClientRect().top,event.target.getBoundingClientRect().left);
		//console.log(getTranslate(event.target.style.transform));
	}
  },
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent'
    })
  ]
})

function openNav() {
  document.getElementById("side").style.width = "50px";
}

function closeNav() {
  document.getElementById("side").style.width = "0px";
}

function setActiveBox(boxID) {
	boxNumberOnly = boxID.substring(3);
	//console.log(boxNumberOnly);
	active = parseInt(boxNumberOnly);
	console.log("ACTIVE BOX #", active);
}

function checkBoxes(){
	console.log(boxes);
}

function deleteBox(){
  if (!boxes.length){
	console.log("no boxes!");
  }
  if (active > -1){
	boxes[active].remove();
	boxes[active] = null;
	console.log(boxes);
	active = -1;
  }
}

DivObject = function(){
	console.log("SUMMONING JUTSU");
	document.getElementById("add_box").onclick = null;
	setTimeout(function(){
		document.getElementById("add_box").onclick = function(){new DivObject()};
	},200);
	
  this.div = document.createElement("div");
  document.getElementById("de_workspace").appendChild(this.div);
  this.div.className="draggable";
  this.div.style.position = "absolute";
  this.div.style.textAlign = "center";
  this.div.style.backgroundColor = "#" + ((1<<24)*Math.random() | 0).toString(16); //https://stackoverflow.com/a/5365036
  this.div.style.transform = "translate(0px, 0px)"

  var textbox = document.createElement("textarea");
  this.div.appendChild(textbox);
  textbox.style.backgroundColor = "rgba(0, 0, 0, 0)";
  textbox.style.border = "0px";
  textbox.style.resize = "none";
  textbox.style.padding = "0px";
  textbox.style.margin = "0px";
  textbox.style.marginTop = "5%";
  textbox.style.rows = "4";
  textbox.style.color = "#ffffff"
  textbox.style.width = "90%";
  textbox.style.height = "80%";
  textbox.style.overflow = "hidden";
  textbox.style.display = "inline-block";
  textbox.style.verticalAlign = "middle";
  textbox.spellcheck = false;

  if (!boxes.length){
	active = 0;
  }
  else{
	active=boxes.length; 
  }
  boxes.push(this.div);  
  this.div.id = "box"+active;
  const thisBoxID = this.div.id;
  this.div.addEventListener("click",function() {setActiveBox(thisBoxID)});
}

function getTranslate(transformString){
	var strip = transformString.replace(/[a-z]/gi, '');
	var split = strip.split(",");
	var x = split[0].substring(1);
	var y = split[1].substring(1,split[1].length-1);
	return [parseInt(x),parseInt(y)];
}