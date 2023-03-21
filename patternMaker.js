/*creates a brownian motion on the canvas,
code adapted from: https://p5js.org/examples/simulate-brownian-motion.html
There is a slider to change the range of the random motion.
the drawing only occurs when mouse is pressed. */
function PatternMaker() {

    //add name and icon to add tool to toolbar 
    this.name="patternMaker";
    this.icon="./assets/tiles.png";

    //initialize variables and arrays
    let num = 900;
    let rangeSlider;

    let ax = [];
    let ay = [];

    this.setup = function(){

        //create slider for range 
        rangeSlider = createSlider(5,100,30);
        rangeSlider.parent(select(".options"))

        //for loop to decide where to begin the drawing from (center of canvas)
            for ( let i = 0; i < num; i++ ) {
                ax[i] = width / 2;
                ay[i] = height / 2;
              }
              frameRate(30);


    };

    this.draw = function(){

        //if mouse is pressed
        if(mouseIsPressed){
        // all elements pushed back to the left 
             for ( let i = 1; i < num; i++ ) {
             ax[i - 1] = ax[i];
             ay[i - 1] = ay[i];
            }

        // a new value is added to the end of each array within the 
        //range determined by the slider 
            ax[num - 1] += random(-rangeSlider.value(), rangeSlider.value());
            ay[num - 1] += random(-rangeSlider.value(), rangeSlider.value());

        // make sure none of the random points are off-canvas
            ax[num - 1] = constrain(ax[num - 1], 0, canvasContainer.size().width);
            ay[num - 1] = constrain(ay[num - 1], 0, canvasContainer.size().height);

         // connect the points using another for loop 
            for ( let j = 1; j < num; j++ ) {
             let val = j / num * 204.0 + 51;

             //drawn in currently selected colour 
            stroke(colourPicker.value());

            line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
            }
    }
};

//function to determine if the mouse was clicked on the canvas 
this.mousePressOnCanvas =function(canvas){
    if(mouseX > 0 &&
       mouseX < (canvas.elt.offsetLeft +
       canvas.width) &&
       mouseY > canvas.elt.offsetTop &&
       mouseY < (canvas.elt.offsetTop +
       canvas.height - 20) 
        ) {
            return true;
        }
        return false;
    }

    //draw the slider to the options area
    this.populateOptions = function(){
        select(".options").html(
            "<div id='rangeslider'>Range: </div>"
        )
    };

}