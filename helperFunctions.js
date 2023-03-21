function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvas to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});

	//event handler for the invert button. inverts the colours of the canvas
	select("#invert").mouseClicked(function(){
		
		//initialize with inverse variable false 
		inv=false;
		//if button is clicked, apply the invert function and set inv value to true
		this.draw=function(){
			filter(INVERT)
			inv=true;

		}
		//if invert button is clicked while invert is already on, turn it off 
		//allows user to toggle between on and off
		if(select("#invert").mouseClicked && inv==true)
		{
			inv=false;
			noFilter();
		}
		this.draw();
	});

	//event handler for the greyscale button. makes canvas greyscale
	select("#grey").mouseClicked(function(){
		//initialize grey variable as false
		gry=false;
		//if button is clicked, apply the greyscale function and set gry value to true
		this.draw=function(){
			filter(GRAY)
			inv=true;

		}
		//if greyscale button is clicked while gry is on, turn it off
		//allows user to toggle between greyscale and colour 
		if(select("#grey").mouseClicked && gry==true)
		{
			gry=false;
			noFilter();
		}
		this.draw();
	});
}