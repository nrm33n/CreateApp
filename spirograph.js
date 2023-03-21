/* Code adapted from: https://p5js.org/examples/simulate-spirograph.html
Automatically draws a spirograph in the center of the canvas with a slider for 
user controlled speed. There is also a checkbox to toggle trace functionality and 
an opacity slider. it is drawn in the currently selected colour*/

function Spirograph(){
  //add name and icon to add to toolbox
    this.name= "spirograph";
    this.icon="/assets/spirograph.png"

    //create intial variables
    let NUMSINES; 
    let sines; //array holds the current angles
    let rad; //initial radius for central sine
    
    let fund; 
    let ratio = 1;  
    
    let traceCheck;
    let fundSlider;
    let opacitySlider;

    this.setup= function() {

        //create slider to control speed of central sine
        fundSlider = createSlider(1, 10, 5);
        fundSlider.parent(select("#fundSlider"));

        //create checkbox for whether trace function is on or off
        traceCheck = createCheckbox("trace", true);
        traceCheck.parent(select("#traceCheck"));

        //create opacity slider 
        opacitySlider = createSlider(20,100,80);
        opacitySlider.parent(select("#opacityslider"));
         
      rad = height / 4; // middle circle radius
          
         //the number of sines drawn to the screen
         NUMSINES = 15;
         sines = new Array(NUMSINES);
 
       for (let i = 0; i<sines.length; i++) {
         sines[i] = PI; // for all sines, start them north facing 
       }
     }
   

    this.draw = function() {

      //controls speed drawn to screen, need very small numbers so divid by 1000
        fund = (fundSlider.value()/1000);

      //if trace is unchecked
      if (traceCheck.checked() == false) {
        updatePixels();//if trace is false, clear screen between frames
        noFill(); 
        opacityfill = color(colourPicker.value());
		    opacityfill.setAlpha(opacitySlider.value());
		    stroke(opacityfill);
      }

      push(); // transformation matrix begin
      translate(canvasContainer.size().width / 2, canvasContainer.size().height / 2); //start from middle of canvas


      for (let i = 0; i < sines.length; i++) {
        let dotrad = 0; //radius for the dots in each circle
        

        //if tracing is true
        if (traceCheck.checked() == true) {

        //set fill and stroke to a local variable containing the selected colour
        //and the opacity value from the slider 
        opacityfill = color(colourPicker.value());
		    opacityfill.setAlpha(opacitySlider.value());
		    stroke(opacityfill);
        fill(opacityfill);

        //set the dot radius 
        dotrat = 5.0 * (1.0 - float(i) / sines.length); 
        }

        let radius = rad / (i + 1);
        rotate(sines[i]); // rotate circle
        if (traceCheck.checked() == false) ellipse(0, 0, radius * 2, radius * 2); // if no trace, draw the sine
        push(); 
        translate(0, radius); 
        if (traceCheck.checked() == false) ellipse(0, 0, 5, 5); // draw small circle
        if (traceCheck.checked()==true) ellipse(0, 0, dotrad, dotrad); // if trace, draw with dotradius value
        pop(); 
        translate(0, radius); // translate for next sine
        // update angle with regards to "fund" fundamental value from slider
        sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; 
      }
    
      pop(); //final spirograph
    
    }
    
    //add all DOM elements to the options area
    this.populateOptions = function(){
        select(".options").html(
          "<div id='fundSlider'>Speed:</div><div id='traceCheck'></div><div id='opacityslider'>opacity</div>"

        )
    };

}
