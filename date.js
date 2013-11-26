







(function() {



	function randomizer(minValue, maxValue) {
		var rand = minValue + Math.random()*(maxValue+1-minValue); 
		//rand = rand^0; // some another way to round
		rand = Math.floor(rand); 
		return rand;
	}

	function probabilityControl(iterations) {
		var x = y = 0;
		for (var i = 0; i <= iterations; i++) {
			if (randomizer(1, 2) == 1) {
				x++;
			} else {
				y++;
			}
		}
		console.log(x, "% vs. ", y, "%")
	}

probabilityControl(1000)

})()

