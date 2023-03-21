/*Bubble code adapted from: https://p5js.org/examples/drawing-patterns.html
Tool to draw freehand. Includes two options: "classic", which draws a line from 
previous mouseX and mouseY to current mouseX and mouseY and "bubble", which draws
circles at each instance of mouseX and mouseY that change size depending on mouse speed.
*/

function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;


	//create input for stroke weight, opacity slider, and select for drawing type
	this.setup = function(){
		drawSize = createInput(5);
		drawSize.parent("#input");

		drawOpacity = createSlider(50,255,200);
		drawOpacity.parent("#brushOpacity");

		brushtype = createSelect();
		brushtype.parent("brushtype");
		brushtype.option("classic");
		brushtype.option("bubble");
		brushtype.selected("classic");
	}

	this.draw = function(){

		//change how big stroke is based on slider value
		strokeWeight(drawSize.value())

		//create variable opacityfill to hold current colour + opacity value from slider
		opacityfill = color(colourPicker.value());
		opacityfill.setAlpha(drawOpacity.value());
		//set stroke as opacity fill to include colour and alpha value from slider
		stroke(opacityfill);
		
		//if the brush selected is "classic"
		if(brushtype.value()=="classic"){
		//if the mouse is pressed
		{if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;

			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}}}

		//if the brush selected is "bubble"
		else if (brushtype.value() =="bubble"){
			//if mouse is pressed
			if(mouseIsPressed){
				//draw an ellipse at each instance of mouseX and mouseY
				//the size changes depending on mouse speed
				ellipse(mouseX,mouseY,abs(mouseX-pmouseX), abs(mouseY-pmouseY));
			}
		}

	};


	//creates slider for brush size
	this.populateOptions = function(){
		select(".options").html(
			"<div id=input>Brush Size: </div><div id='brushOpacity'>Opacity: </div><div id='brushtype'>Brush Type: </div>");
	
	};


	//clears the options area when a new tool is selected
	this.unselectTool = function() {
		//updatePixels();
		stroke(1);
		//clear options
		select(".options").html("");
	};

}