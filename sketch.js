//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;


var c;

//create global functions to be accessed throughout the program
let canvasContainer;
let colourPicker;

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	canvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	canvas.parent("content");

	

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new StampTool());
	toolbox.addTool(new MosaicTool());
	toolbox.addTool(new Shapes());
	toolbox.addTool(new PatternMaker());
	toolbox.addTool(new Spirograph());
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");	
	};

	
}


