/*star code adapted from: https://p5js.org/examples/form-star.html 
Shapes tool which draws various shapes that can be filled or unfilled the canvas
User determines size and opacity using sliders*/
function Shapes() {

    //set name and icon to add to toolbox
    this.name = "shapes";
    this.icon = "/assets/rectangle.png"

    //create local variables
    var shapeType;
    var shapeSizeSlider;
    var shapeFill;
    var x;

    this.setup = function() {

        //create select box for type of shape to be drawn
        shapeType = createSelect();
        shapeType.parent("#dropdown");
        shapeType.option("Rectangle");
        shapeType.option("Square");
        shapeType.option("Circle");
        shapeType.option("Triangle");
        shapeType.option("Star");

        //create slider for size of shape 
        shapeSizeSlider = createSlider(5,200,50);
        shapeSizeSlider.parent("#sizeSlider");

        //create checkbox to create filled or unfilled shapes
        shapeFill = createCheckbox("fill", true);
        shapeFill.parent("checkbox");

        //create slider for stroke weight of shape 
        shapeStrokeSize = createSlider(1,10,2);
        shapeStrokeSize.parent("#stroke");

        //create slider for shape opacity
        shapeOpacity = createSlider(50,255,100);
        shapeOpacity.parent("#opacity")

        //initialize variable x
        x = 1;
    };


    this.draw = function(){

        //change shape's stroke weight according to slider value
        strokeWeight(shapeStrokeSize.value());
        
        //create local variable to hold current colour value with selected opacity
        opacityfill = color(colourPicker.value());
		opacityfill.setAlpha(shapeOpacity.value());
        //set stroke to variable containing colour and opacity
		stroke(opacityfill);
        
        //fill or unfill shape depending on checkbox 
        if(shapeFill.checked()==true)
            {
                //if shape fill is checked, fill the shape 
                //the same variable from earlier is used which contains colour and opacity
                opacityfill = color(colourPicker.value());
                opacityfill.setAlpha(shapeOpacity.value());
                fill(opacityfill);
            }
        //if shape fill is left unchecked, do not fill the shape
        else {noFill()}

        //create a variable to hold the user-selected shape size slider value 
        var shapeSize = shapeSizeSlider.value();

        //if mouse is pressed
        if(mouseIsPressed && this.mousePressOnCanvas(canvas)){

            //if rectangle is selected, draw a rectangle
            if(shapeType.selected()=="Rectangle") {
               rect(mouseX-(shapeSize/2),mouseY-(shapeSize/2),shapeSize,shapeSize/2)
            }
            //if square is selected, draw a square
            if(shapeType.selected()=="Square")
                {rect(mouseX-(shapeSize/2),mouseY-(shapeSize/2), shapeSize, shapeSize)
            }
            //if circle is selected, draw a circle
            if(shapeType.selected()=="Circle")  
                {ellipse(mouseX,mouseY,shapeSize)
            }
            //if triangle is selected, draw a triangle
            if(shapeType.selected()=="Triangle")
                {triangle(mouseX,mouseY-shapeSize/2,
                    mouseX-shapeSize/2,mouseY+shapeSize/2,
                    mouseX + shapeSize/2,mouseY+shapeSize/2)
            }
            //if star is selected, draw a star 
            //note that in this case, shape size increases the amount of "arms" the star has
            if(shapeType.selected()=="Star")
                    {
                        let angle = TWO_PI/(5*shapeSize/10);
                        let halfAngle = angle /2.0;
                        beginShape();
                        for (let a = 0; a < TWO_PI; a += angle) {
                          let sx = (mouseX + cos(a) * 70);
                          let sy = (mouseY + sin(a) * 70);
                          vertex(sx, sy);
                          sx = (mouseX + cos(a + halfAngle) * 30);
                          sy = (mouseY + sin(a + halfAngle) * 30);
                          vertex(sx, sy);
                        }
                        endShape(CLOSE);
                      
                    }
        }
    }

    //function to log whether the mouse press is on the canvas
    this.mousePressOnCanvas = function(canvas) {
        if(mouseX > 0 &&
            mouseX < (canvas.elt.offsetLeft +
            canvas.width) &&
            mouseY > canvas.elt.offsetTop &&
            mouseY < (canvas.elt.offsetTop +
            canvas.height - 20) 
            )   { 
                return true;
            }   
             return false;
            }

    //draw all the DOM elements into the opctions area using html divs
    this.populateOptions = function(){
        select(".options").html(
        "<div id='dropdown'></div><div id='sizeSlider'>Shape Size:</div><div id='checkbox'></div><div id='stroke'>Stroke Size:</div><div id='opacity'>Opacity:</div>" );
       
        
    }

    //remove all dom elements for this tool once it is unselected
    this.unselectTool = function(){
        select(".options").html();
        currentShape=[];
        loadPixels();
    }

}