
var library_name;
var bg_colour;
var library;
var world = [];
var stage_obj_map = [];
var selected_object;

//block dealing with loading from JSON
function buildWorld(){
	generateRandomWorld(20);
}

function getSelectedObject(){
  return selected_object;
}

function setLibrary(lib){
    library = lib;
}
function getEvalWorld(){
  var scope = [];
    for(var i = 0; i < stage_obj_map.length; i++){
      var attr = stage_obj_map[i]._attributes;
      var obj = {
	type:world[i].type,
	x:attr.x,
	y:attr.y,
	colour:attr.fillColor
      }
      scope[i] = obj;      
    }
    
    return scope;
}

function generateRandomWorld(size){
  for (var i = 0; i < size; i++)
	{	
	  var type = parseInt(""+(Math.random() * 3));
	  var x = Math.random()*400+100;
	  var y = Math.random()*400+100;
	  addObject(type,x,y,50,50, color('white').randomize());
	}
}

//Passing null for x->height will make it use the default values.
function addObject(obj_index, x, y, width, height, colour){
    var lib_obj = library[obj_index];
    //Change the objects values based on parameters.
    if(x != null)
      lib_obj.x = x;
    if(y != null)
      lib_obj.y = y;
    if(width != null)
      lib_obj.width = width;
    if(height != null)
      lib_obj.height = height;
    if(colour != undefined)
      lib_obj.colour = colour;
    
    var index = world.length;
    world[index] = lib_obj;
    stage_obj_map[index] = createBonsaiShape(lib_obj);
    
}

function createBonsaiShape(obj){
  if(obj.image == "\\poly")
      return bonsaiPoly(obj);
  else
    return bonsaiImage(obj);//TODO!!!!
}

function bonsaiPoly(obj){ //What does this method do?
  var sides = getValue(obj, "Sides");
  var myPoly,x,y;
  if(sides <= 2){
    myPoly = new Circle(obj.x,obj.y,obj.width/2);
  }else if(sides == 4){
    myPoly = new Rect(obj.x, obj.y, obj.width, obj.height);
  }else{
    myPoly = new Polygon(obj.x,obj.y,obj.width/2,sides);
  }
  
  myPoly.addTo(stage);
  myPoly.fill(color(obj.colour))
  .stroke('#000', 2)
  .on('multi:pointerdown', function(e){
      x = this.attr('x'); 
      y = this.attr('y');
      myPoly.addTo(myPoly.parent); 
    })
  .on('multi:drag', function(e){
    this.attr({
	x: x + e.diffX,
	y: y+ e.diffY
      });
   })
  .on("pointerdown", function(e){
    console.log(selected_object);
    if(!(selected_object === undefined))
      selected_object.stroke("#000", 2);
    this.stroke("#FFF", 2);
    selected_object = this;
    
  }); 
  
  return myPoly;
}

function getValue(obj, key){ //What value is this referring to?
  var index = obj.field_key.indexOf(key);
  if(index < 0)
    return null;
  return obj.field_vals[index];
}

function moveObj(obj, x, y){
    var index = world.indexOf(obj);
    stage_obj_map[index].moveBy(x,y);
}

//creates a bitmap from an image that may not be a bitmap from the start - Bonsai requires a picture to be a bitmap to draw onto the svg canvas. The bitmap is then drawn at x,y on the screen
function drawImage(inputPath, xIn, yIn){
  
  new Bitmap(inputPath, function(err) {
  if (err) return;
  this.attr({
    y: yIn,
    x: xIn
  });
  stage.addChild(this);
 
});
 
   
  
}
  
