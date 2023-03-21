//Displays and handles the colour picker at the bottom left
function ColourPalette() {
	
	//creates the colour picker with selected colour and styles it with CSS
	this.setup = function() {
		colourPicker = createColorPicker("#ed255d");
		colourPicker.parent(select("#colour"));
		colourPicker.style("width", "200px");
		colourPicker.style("height", "100px");
	};

	//populate the colour palette area with the colour picker 
	this.populateOptions = function() {
		select(".colourPalette").html(
			"<div id='colour'></div>")
	};

	//make sure the correct values are called in console, set fill and stroke
	this.draw = function(){
		console.log(colourPicker.value())
		stroke(colourPicker.value());
		fill(colourPicker.value());

	}

	//call previous functions so they operate
	this.populateOptions();
	this.setup();

	//create selectedColour function to hold colourpicker value 
	this.selectedColour = colourPicker.value();
}