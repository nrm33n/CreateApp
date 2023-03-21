/*Image credit: 
heart.png: https://www.pngegg.com/en/png-wwcar
star.png: https://www.pngall.com/aesthetic-star-png/download/73457
kirby.png: https://www.stickpng.com/img/games/kirby/kirby
rosie.png: https://www.stickpng.com/img/games/animal-crossing/animal-crossing-rosie
Stamp tool that can draw one or many images to the canvas. One of 
four images can be chosen from a dropdown menu and size can be changed using a slider.
*/
function StampTool(){

    //icon and name so tool can be added to toolbox
    this.icon = "./assets/heart.png";
    this.name = "stampTool";

    //create initial variables;
    var heart;
    var star;
    var stampSizeSlider;

    //preload stamp images
    this.preload = function(){
        heart = loadImage('./assets/heart.png');
        star = loadImage('./assets/star.png');
        kirby = loadImage('./assets/kirby.png');
        rosie = loadImage('./assets/rosie.png');
    };


    this.setup = function(){
        //create stamp size slider 
        stampSizeSlider = createSlider(5,50,20);
        stampSizeSlider.parent("#stampSize");

        //create checkbox to determine if one or more stamps will be drawn
        stampAmount = createCheckbox("draw multiple", false);
        stampAmount.parent("#stampAmount");
        
        //create select box for type of stamp
        stampOptions = createSelect();
        stampOptions.parent("#stampType");
        stampOptions.option('heart');
        stampOptions.option('star');
        stampOptions.option('kirby');
        stampOptions.option('rosie');
      
    };

    this.draw = function(){

        //variables to change the stamp size 
        var stampSize = stampSizeSlider.value();
        var stampX = mouseX - stampSize/2;
        var stampY = mouseY - stampSize/2;


    //if option for multiple stamps to be drawn is checked
    if (stampAmount.checked() == true) {
            //and if mouse is pressed
       if(mouseIsPressed ) 
       {    //draw multiple 
           for (var i =0; i < 1; i++)
           {
            //draw multiple stamps according to slider amount 
            var stampSize = stampSizeSlider.value();
            var stampX = random((mouseX - stampSize/2)-20, 
            (mouseX - stampSize/2)+20);
            var stampY = random((mouseY - stampSize/2)-20,
            (mouseY - stampSize/2)+20);
            
            //draw mulitple heart stamps if heart selected
            if(stampOptions.value() == "heart")
           { image(heart, stampX, stampY, stampSize, stampSize); }

           //draw multiple star stamps if star selected
            else if(stampOptions.value()=="star")
            { image(star, stampX,stampY, stampSize,stampSize);}

            //draw multiple kirby stamps if kirby selected
            else if(stampOptions.value() == "kirby")
            { image(kirby, stampX,stampY, stampSize,stampSize);}

            //draw multiple rosie stamps if rosie selected
            else if(stampOptions.value() == "rosie")
            { image(rosie, stampX, stampY, stampSize, stampSize);}
       }
     }
    }
    
    //if only one stamp is to be drawn
    else if (stampAmount.checked() !==true){
        //and if mouse is pressed
        if(mouseIsPressed){

        //use these local variables to determine stamp size
        var stampSize = stampSizeSlider.value();
        var stampX = (mouseX - stampSize/2)
        var stampY = mouseY - stampSize/2
        
        //draw heart stamp is heart selected
        if(stampOptions.value() == "heart")
       { image(heart, stampX, stampY, stampSize, stampSize); }

       //draw star stamp if star selected
        else if(stampOptions.value()=="star")
        { image(star, stampX,stampY, stampSize,stampSize)}
        
        //draw kirby stamp if kirby selected
        else if(stampOptions.value()=="kirby")
        { image(kirby, stampX, stampY, stampSize, stampSize *1.15)}

        //draw rosie stamp if rosie selected
        else if(stampOptions.value() =="rosie")
        { image(rosie, stampX, stampY, stampSize, stampSize *2);}
    }}

    };
    //add all DOM elements to the options area
    this.populateOptions = function(){
        select(".options").html(
        "<div id='stampSize'>Stamp Size:</div><div id='stampType'></div><div id='stampAmount'></div>");  
        }


    //clears the options area when a new tool is selected
    this.unselectTool = function() {
            //updatePixels();
            //clear options
            select(".options").html("");
        };

}