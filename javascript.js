
var expArray = [];
var count = 0;

function add(ex){
	//create a new element
	var word = document.getElementById('textbox1').value;
	//var element = document.createElement("input");

	//Create Labels
	var expressionDiv = document.createElement("div");
	var div2 = document.createElement("div");  
	expressionDiv.innerHTML = word;
	div2.innerHTML = ' - ';
	expressionDiv.id = count++;
	div2.id = div.id.toString() + 'b';
	expArray.push(div.id);

	//add styling to expression div
	expressionDiv.style.fontWeight = "normal";
	expressionDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
	expressionDiv.style.padding = "0.5%";
	expressionDiv.style.margin =  "0.5%";
	expressionDiv.style.background = "#0390B2";
	expressionDiv.style.color= "#FFFFFF";
	expressionDiv.style.width = "100%";
	expressionDiv.style.fontSize = "large";

	div2.style.width = "18%";
	div2.style.background = "#0390B2";
	div2.style.color= "#FFFFFF";

	var lineBreak = document.createElement("br");

	// 'foobar' is the div id, where new fields are to be added
	var foo = document.getElementById("foobar");
	//foo.style.display = "table-row";
	expressionDiv.style.display = "table-cell";
	div2.style.display = "table-cell";

	//Append the element in page
	foo.appendChild(expressionDiv);
	foo.appendChild(div2);
	foo.appendChild(lineBreak);

}

function go(){
	for (id in expArray){
		console.log(id);
		var expressionDiv = document.getElementById(id);


		var expr = expressionDiv.innerHTML.toString();

		console.log(expr.toString());

		var parsedTree = parse(expr.toString());

		console.log(parsedTree);

		var eval = evaluate(parsedTree, 
				{p:{x: 1, y: 2}}
			);

		console.log(eval, parsedTree);
		var div2 = document.getElementById(expressionDiv.id.toString()+'b');
		div2.style.fontSize = "large";

		if(eval){
		div2.innerHTML = "true";
		div2.style.background = "#009933";
		div2.style.paddingLeft = "10px";
		div2.style.paddingRight = "10px";

		}
		else {
			div2.innerHTML = " false";
			div2.style.background = "#FF5C5C";
			div2.style.paddingLeft = "7px";
			div2.style.paddingRight = "7px";
		}	
		
	}
}

function button(operator){
	//insert operator into expression box
	var currentExp = document.getElementById('textbox1').value;
	console.log(currentExp);
	if(operator=='and'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value = "\u2227";
		}
		else{
			document.getElementById('textbox1').value = currentExp + "\u2227";
		}
	}
	else if (operator=='or'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value = "\u2228";
		}
		else{
			document.getElementById('textbox1').value = currentExp + "\u2228";
		}
	}
	else if (operator =='not'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value = "¬";
		}
		else{
			document.getElementById('textbox1').value = currentExp + '¬';
		}
	}
	else if (operator == 'dot'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value = '.';
		}
		else{
			document.getElementById('textbox1').value = currentExp + '.';
		}
	}
	else if (operator == 'for all'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value = "\u2200";
		}
		else{
			document.getElementById('textbox1').value = currentExp + "\u2200";
		}
	}
	else if (operator == 'there exists'){
		if(currentExp=="Input expression"){
			document.getElementById('textbox1').value ="\u2203";
		}
		else{
			document.getElementById('textbox1').value = currentExp + "\u2203";
		}
	}
	else if(operator == 'clear'){
		document.getElementById('textbox1').value = "";
	}
	else {
		document.getElementById('textbox1').value = currentExp;
	}


}
