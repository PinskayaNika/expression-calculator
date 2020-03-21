function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let str = '';
    let l = 0;
    let r = 0;
    str = expr.replace(/\s/g, '');
    let len = 0;
    len = str.length;
    //alert(len);
    for (let i = 0; i < len; i++) {
		if ( str[i] == '(' ) {
        	l = l + 1;
      } else if (str[i] == ')') {
			r = r + 1;
		}    	
		if ( str[i] == '/' && str [i+1] == '0') {
        	throw("TypeError: Division by zero.");
            return;
    	}
      
    }
	if (l != r) {
        	throw("ExpressionError: Brackets must be paired");
            return;
   }
	
	let s_out = "";
	var stack = [];
	priority = {"(" : 0,
				")" : 1,
				"+" : 1,
				"-" : 1,
				"*" : 2,
				"/" : 2};
	
	for (i = 0; i < expr.length; i++){
		switch (expr[i]) {
			case "(" : stack.push("("); break;
			case ")" : if (stack[stack.length-1] != "(") {
//							alert ("ExpressionError: Brackets must be paired"); 
							throw ("ExpressionError: Brackets must be paired");
						}
						stack.pop();
						break;
			}
		}
	if (stack.length != 0) {
//		alert ("ExpressionError: Brackets must be paired"); 
		throw("ExpressionError: Brackets must be paired.") ;
	}	
	stack=[];

	let expr1 = '';
    if (expr.length == 3) {
    	for(let j = 0;j< expr.length; j++) {
    		expr1 = expr1 + expr[j] + " ";
    	}
     	//alert(expr1);
    	expr = expr1;
    }
	for (i = 0; i < expr.length; i++){
		//console.log(i, expr[i], stack);
			
		switch (expr[i]) {
			case "(" : stack.push("("); break;
			case ")" : while (stack[stack.length-1] != "(") {
								s_out = s_out + stack.pop() + ",";
							}
						stack.pop();
						break;
						
			case "+" : 
			case "-" :
			case "*" :
			case "/" :	if (priority[stack[stack.length-1]] >= priority[expr[i]]) {
								while (priority[stack[stack.length-1]] >= priority[expr[i]]) {
									s_out = s_out + stack.pop() + ",";
								}
							}
						stack.push(expr[i]);
						break;			
			case " " : if (s_out[s_out.length-1] != "," && s_out.length != 0) {
								s_out = s_out + ",";
							}
						 break;
			default : s_out = s_out + expr[i]; break;
		}

	}	
	if (s_out[s_out.length-1] != "," && s_out.length != 0) {
		s_out = s_out + ",";
	}
	
	while (stack.length > 0) {
		
		s_out = s_out + stack.pop();
		if (stack.length > 0) s_out = s_out + ",";
	}
	//console.log(expr);
	//console.log(s_out);
	
	stack=[];
	n1 = 0;
	n2 = 0;
	let arr_out = s_out.split(",");

	for (i = 0; i < arr_out.length; i++) {
		switch (arr_out[i]) {
			case "+" : 	n2 = parseFloat(stack.pop());
					n1 = parseFloat(stack.pop());
					stack.push(n1 + n2);
					//console.log(stack, arr_out[i]);
					break;
			case "-" : n2 = parseFloat(stack.pop());
					n1 = parseFloat(stack.pop());
					stack.push(n1 - n2);
					//console.log(stack, arr_out[i]);
					break;
			case "*" : n2 = parseFloat(stack.pop());
					n1 = parseFloat(stack.pop());
					stack.push(n1 * n2);
					//console.log(stack, arr_out[i]);
					break;
			case "/" : n2 = parseFloat(stack.pop());
					if (n2 == 0) {
						//alert ("Division by zero");
						throw("TypeError: Division by zero.")
					}
					n1 = parseFloat(stack.pop());
					stack.push(n1 / n2);
					//console.log(stack, arr_out[i]);
					break;
			default : stack.push(arr_out[i]); break;
		}
 	} 
	//alert (stack);
	//alert (Number(stack).toFixed(4));   //4 digits after dot
	return Number(stack);//.toFixed(4));   //4 digits after dot

}

module.exports = {
    expressionCalculator
}
