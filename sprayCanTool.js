/*Tool to simulate spray can by drawing several dots to canvas at one.
Improved from original template by adding sliders for spray radius, dot density,
dot size, and dot opacity. */
function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	this.setup = function(){
		//creates a slider to change the spray radius 
		sprayRadiusSlider = createSlider(5,50,40);
		sprayRadiusSlider.parent(select("#sprayRadius"));

		//creates a slider to change how many dots appear 
		dotDensitySlider = createSlider(5,20,10);
		dotDensitySlider.parent(select("#dotDensity"));

		//creates a slider to change how big the dots are 
		dotSizeSlider = createSlider(1,10,3);
		dotSizeSlider.parent(select("#dotSize"));

		//creates a slider to change opacity of dots drawn to screen
		dotOpacitySlider = createSlider(0,255,255);
		dotOpacitySlider.parent(select("#dotOpacity"))

	}

	this.draw = function(){

		//create a local variable to hold the currently selected colour and 
		//the alpha value received from the opacity slider
		opacityfill = color(colourPicker.value());
		opacityfill.setAlpha(dotOpacitySlider.value());
		//set that variable to stroke
		stroke(opacityfill);

		//change stroke weight depending on slider value
		strokeWeight(dotSizeSlider.value())
		var r = random(5,10);
		//if mouse is pressed, draw several dots to screen within the radius
		//determined by the spray radius slider
		if(mouseIsPressed){
			for(var i = 0; i < dotDensitySlider.value(); i++){

				point(random(mouseX-sprayRadiusSlider.value(), 
							 mouseX + sprayRadiusSlider.value()), 
					 random(mouseY-sprayRadiusSlider.value(), 
					  		 mouseY+sprayRadiusSlider.value()));
			}
		}

	};

	//draw all the DOM elements to the screen in the options area using HTML
	this.populateOptions = function(){
		select(".options").html(
			"<div id='sprayRadius'>Spray Radius:</div><div id='dotDensity'>Dot Density:</div><div id='dotSize'>Dot Size</div><div id='dotOpacity'>Dot Opacity</div>"
		)
	}
}