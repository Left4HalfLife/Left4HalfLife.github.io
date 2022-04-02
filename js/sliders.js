const position = { x: 0, y: 0 };
var boxes = [];
var active = -1;
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}` //https://stackoverflow.com/a/3627747

interact('.dropzone').dropzone({
  accept: '.draggable',
  overlap: 0.60,
  ondrop: function (event) {
	 //console.log(event.target + " append child " + event.relatedTarget);
  }
});

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
    }),
//	interact.modifiers.snap({
//      targets: [ { x: window.innerWidth/2, y: window.innerHeight * 0.4} ],
//      relativePoints: [
//        { x: 0 , y: 0  },
//        { x: 0 , y: 1  },   
//        { x: 1 , y: 1  },   
//		{ x: 1 , y: 0  }    
//      ]
//    })
  ]
});

//function openNav() {
//  document.getElementById("side").style.width = "50px";
//}

//function closeNav() {
//  document.getElementById("side").style.width = "0px";
//}

var colorPicker = new iro.ColorPicker('#picker', {
	width: 250,
	borderWidth: 1,
	borderColor: "#ffffff",
});

colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  //console.log(color.hexString);
  document.getElementById("de_colour").style.color = color.hexString;
  if (active > -1){
	  if (boxes[active] != null){  
		boxes[active].style.backgroundColor = color.hexString;
	  }
  }
});

function setActiveBox(boxID) {
	boxNumberOnly = boxID.substring(3);
	//console.log(boxNumberOnly);
	active = parseInt(boxNumberOnly);
	//console.log("ACTIVE BOX #", active);
	colorPicker.color.hexString = (rgba2hex((boxes[active].style.backgroundColor)));	
}

function checkBoxes(){
	console.log(boxes);
	console.log("current active box: " + "#" + active)
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
	//console.log("SUMMONING JUTSU");
	document.getElementById("add_box").onclick = null;
	setTimeout(function(){
		document.getElementById("add_box").onclick = function(){new DivObject()};
	},200);
	
  this.div = document.createElement("div");
  document.getElementById("de_workspace").appendChild(this.div);
  this.div.className="draggable";
  this.div.style.position = "absolute";
  this.div.style.textAlign = "center";
  var randomColour = "#" + Math.floor(Math.random()*16777215).toString(16); //https://css-tricks.com/snippets/javascript/random-hex-color/
  console.log(randomColour);
  while (randomColour.length < 7 ){
	  randomColour += "0"; //rng occasionally generates 5 digits 
  }
  //console.log(randomColour);
  this.div.style.backgroundColor = randomColour;
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
  colorPicker.color.hexString = randomColour;
}

function getTranslate(transformString){
	var strip = transformString.replace(/[a-z]/gi, '');
	var split = strip.split(",");
	var x = split[0].substring(1);
	var y = split[1].substring(1,split[1].length-1);
	return [parseInt(x),parseInt(y)];
}