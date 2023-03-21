/*Editable mosaic tool. Creates interesting filled shapes with background
colour showing when overlapped. Includes finish button for when editing is complete.
Multiple mosaics can be created over one another.*/
function MosaicTool(){

//add name and icon to add to toolbox
this.name = "mosaicTool"
this.icon = "assets/triangles.png"

//create initial array
var currentShape = [];

//set stroke weight, create finish button
this.setup = function() {
    strokeWeight(5);
    loadPixels();
    finishButton = createButton('Finish Mosaic');
    finishButton.parent(select(".options"));

    //load pixels into the mosaic when finished - no more editing
    finishButton.mousePressed(function() {
       draw();
        loadPixels();
        currentShape = [];
    })
   
};


this.draw = function() {
    
    updatePixels();

    
    if(this.mousePressOnCanvas(canvas) && mouseIsPressed){
        //if the mouse is pressed while it is on the canvas, push that mouseX, mouseY
        //position to the array and create the shape
        currentShape.push({
            x: mouseX,
            y: mouseY
        });
            //traverse the array, if the mouse is clicked within 20 pixels of 
            //a vertex of the shape, allow the user to move it around
            //creates the "editable" aspect of the shape.
            for(var i =0; i < currentShape.length; i++){
                if(dist(currentShape[i].x,
                    currentShape[i].y, mouseX, mouseY)< 20) {
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
            }
    }

    //start the shape using the pushed values from the array
    beginShape();
    for(var i = 0; i < currentShape.length; i++) {

            vertex(currentShape[i].x,
             currentShape[i].y);
                //set stroke and fill to the currently selected colours
                stroke(colourPicker.value());
                fill(colourPicker.value());
                //draw an ellipse at the vertex ends to distinguish them
                ellipse(currentShape[i].x,currentShape[i].y, 10);
    }
    endShape();


};

//function to log if the mouse is pressed on the canvas
this.mousePressOnCanvas = function(canvas) {
    if(mouseX > 0 &&
       mouseX < (canvas.elt.offsetLeft +
       canvas.width) &&
       mouseY > canvas.elt.offsetTop &&
       mouseY < (canvas.elt.offsetTop +
       canvas.height - 20) 
        ) {//mouse is pressed on canvas
            return true;
        }//mouse is not pressed on canvas
        return false;
    }

    //load the finish button into the options area
    this.populateOptions = function() {
        select(".options").html(
            "<div id='finishButton'></div");
    }

}