
var library_name;
var bg_colour;
var library;
var world = [];
var stage_obj_map = [];
var selected_object;
var Colour = {
  red:4280549631,
  green:1355315455,
  blue:8388607,
  orange:4289003775,
  yellow:4294377727,
  purple:3664828159,
  brown:3430359807,
  black:255,
  white:4294967295
};

stage.on('message', handleMessage);

//block dealing with loading from JSON
function buildWorld(){
	generateRandomWorld(5);
}

function handleMessage(message) {
    console.log('message', message);
    if (message === 'getworldforeval'){
        //TODO process world to be what is expected.
        stage.sendMessage('evalworld', updateWorld());
    }
}

stage.on('message:addobject', function(data){
  addObject(data.type, data.x, data.y, data.width, data.height, data.colour);
  
});

function getSelectedObject(){
  return selected_object;
}

function getColours(){
 return Colour; 
}
function setLibrary(lib){
    library = lib;
}
function updateWorld(){
    var updatedWorld = [];
    var item;
    if(stage_obj_map.length != world.length)
	console.log("Something is wrong. Error in world mapping");
    for(var i = 0; i < stage_obj_map.length; i++){
	item = {};
	item.x = stage_obj_map[i]._attributes.x;
	item.y = stage_obj_map[i]._attributes.y;
	item.colour = stage_obj_map[i]._attributes.fillColor;
	item.type = world[i].type;
	updatedWorld.push(item);
	console.log('from world', item);
    }
    
    world = updatedWorld;
    console.log('updated', world);
    
    return updatedWorld;
}

function generateRandomWorld(size){
  for (var i = 0; i < size; i++)
	{	
	  var type = parseInt(""+(Math.random() * 3));
	  var types = ["Rectangle","Circle","Triangle"]; //TODO change/remove
	  var x = Math.random()*400+100;
	  var y = Math.random()*400+100;
	  var colour_list = Object.keys(Colour);
	  var colour = Colour[colour_list[parseInt(""+Math.random()*colour_list.length)]];
	  addObject(types[type],x,y,50,50, colour);
	}
}

//Passing null for x->height will make it use the default values.
function addObject(obj_type, x, y, width, height, colour){
    var lib_obj = null;
    var i;
    var lib;
    for(i = 0; i < library.length; i++){
      if(library[i].type == obj_type){
	lib = library[i];
	var lib_obj = {type: lib.type, colour: lib.colour, image: lib.image,
	  x: lib.x, y: lib.y, width: lib.width, height: lib.height, field_key: lib.field_key, field_vals: lib.field_vals};
	break;
      }
    }
    if(lib_obj == null)
      return;
    //Change the objects values based on parameters.
    if(x != undefined)
      lib_obj.x = x;
    if(y != undefined)
      lib_obj.y = y;
    if(width != undefined)
      lib_obj.width = width;
    if(height != undefined)
      lib_obj.height = height;
    if(colour != undefined)
      lib_obj.colour = colour;
    
    console.log('libobj', lib_obj);
    
    var index = world.length;
    world.push(lib_obj);
    stage_obj_map.push(createBonsaiShape(lib_obj));
    
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
  
