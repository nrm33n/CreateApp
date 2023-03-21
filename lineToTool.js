//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array. Improved by adding opacity and stroke weight sliders.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//initialize values
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//create sliders for stroke weight and opacity 
	this.setup = function(){
		strokeWeightSlider = createSlider(1,30,5);
		strokeWeightSlider.parent("#lineWeight");

		lineOpacitySlider = createSlider(0,255,255);
		lineOpacitySlider.parent("#lineOpacity");
	}; 

	//draws the line to the screen 
	this.draw = function(){

		//create opacity fill function to hold current colour and opacity slider value
		opacityfill = color(colourPicker.value());
		opacityfill.setAlpha(lineOpacitySlider.value());
		//set stroke to be opacity fill containing colour and slider alpha value
		stroke(opacityfill);

		strokeWeight(strokeWeightSlider.value());
		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	//creates slider for line weight
	this.populateOptions = function(){
		select(".options").html(
		"<div id='lineWeight'>Line Weight: </div><div id='lineOpacity'>Opacity:</div>");
		};
	
	//clears the options area when a new tool is selected
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	 };

}
