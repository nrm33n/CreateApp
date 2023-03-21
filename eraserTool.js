//eraser tool, uses same functionality as freehand tool but draws in background colour
function EraserTool(){
    
    //add name and icon to add to toolbox
    this.name = "eraserTool";
    this.icon = "assets/eraser.png"

    //initialize variables
    var prevMouseX = -1;
    var prevMouseY = -1;

    //create eraser size slider 
    this.setup = function(){
        eraserSizeSlider = createSlider(1,50,10);
        eraserSizeSlider.parent(select(".options"));

    
    }

    //draw a line wherever mouse is pressed 
    this.draw = function(){
    
    //set stroke weight to equal eraser size slider value 
    strokeWeight(eraserSizeSlider.value());
        //if mouse is pressed, draw line from previous to current mouseX, mouseY
        if(mouseIsPressed){
            if(prevMouseX == -1)
            {
                prevMouseX = mouseX;
                prevMouseY = mouseY;
            }
            else{
                erase();
                line(prevMouseX,prevMouseY,mouseX,mouseY);
                prevMouseX = mouseX;
                prevMouseY = mouseY;
            }
        }
        else{
            prevMouseX = -1;
            prevMouseY = -1;
        }

    }

    //place eraser size slider in the options area 
    this.populateOptions = function(){
        select(".options").html(
            "<div id='eraserSize'>Eraser Size:</div>");
    }

    //remove slider once tool is unselected
    this.unselectTool = function(){
        select(".options").html("")
        noErase();
    }
}