function sum(n){
	if (n==0) { // base case
	     return 0;
	} else { //recursive case
		return sum(n-1) + n;
	}	
}

//example:
//	sum(4) => 4 + 3 + 2 + 1 + 0 = 10
