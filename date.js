window.onload = function() {

	// some cool stuff
	var docFragment = document.createDocumentFragment();
	var dateArray = [];
	var lenght = 10;
	var table = document.querySelector('.dateTable');

	/**
	* Elegant way to create multilanguage variables
	*/
	var weekDayRus = [];
	weekDayRus[0]="Вс";
	weekDayRus[1]="Пн";
	weekDayRus[2]="Вт";
	weekDayRus[3]="Ср";
	weekDayRus[4]="Чт";
	weekDayRus[5]="Пт";
	weekDayRus[6]="Сб";

	var monthRus = []
	monthRus[0] = "Январь";
	monthRus[1] = "Февраль";
	monthRus[2] = "Март";
	monthRus[3] = "Апрель";
	monthRus[4] = "Май";
	monthRus[5] = "Июнь";
	monthRus[6] = "Июль";
	monthRus[7] = "Август";
	monthRus[8] = "Сентябрь";
	monthRus[9] = "Октябрь";
	monthRus[10] = "Ноябрь";
	monthRus[11] = "Декабрь";

	/**
	* Awesome randomizer for different usage
	*/
	function randomizer(minValue, maxValue) {
		var rand = minValue + Math.random()*(maxValue - minValue + 1); // Math.random() gives number from interval [0,1) so we need to increase value 
		rand = Math.floor(rand); 
		//rand = rand^0; // some another stylish way to round
		return rand;
	}

	/**
	* Let's check my awesome randomizer
	* @param iterations {number}    how many random numbers create
	*/
	function probabilityControl(iterations) {
		var x = y = 0;
		for (var i = 0; i < iterations; i++) {
			(randomizer(1, 2) == 1) ? x++ : y++;
		}
		x = x*100/iterations;
		y = y*100/iterations;
		dx = Math.round(Math.abs(x - 50)*100)/100; // let's round it to 0.01
		console.log(x + "% vs. " + y + "%");
		if (dx >= 1) {
			console.error("Shit! dx=" + dx + "%");
		} else {
			console.warn("Fucking dx=" + dx + "%");
		}
	}
	probabilityControl(2000);

	/**
	 * creates my super nodes
	 * @param inputDate {string}	date object
	 * @returns {HTMLElement}		<div class="dateRow" data-item="Sun Dec 08 2013 00:00:00 GMT+0300 (Калининградское время (зима))">Вс. 08, Декабрь 2013, до НГ - [24]</div>
	 */
	function createDateNode(inputDate) {
		var newDiv = document.createElement('div');
		newDiv.className = 'dateRow';
		newDiv.setAttribute("data-item", inputDate);

		var text = weekDayRus[inputDate.getDay()] + ". ";

		var day = inputDate.getDate();
	
		text += (day < 10) ? "0" : "";
		text += day + ", ";
		text += monthRus[inputDate.getMonth()] + " ";
		text += inputDate.getFullYear() + ", до НГ - [";

		var beforeNY = Math.round( (1388534400000 - inputDate.getTime())/86400000 ); // .getTime() gives in ms!

		text += beforeNY + "]";

		newDiv.innerHTML = text;
		return newDiv;
	}

	/**
	 * Fill table with array data && crate array if it is not exist
	 */
	function fillTable() {
		var node;
		for (var i = 0; i < lenght; i++) {
			if (!dateArray || dateArray.length < lenght) { // creating new array only if it was not created before
				var randomDay = randomizer(1, 31); // generate day 
				var randomMonth = randomizer(0, 11); // generate month
				dateArray[i] = new Date(2013, randomMonth, randomDay);
			}
			node = createDateNode(dateArray[i]);
			docFragment.appendChild(node);
		};

		table.innerHTML = "";
		table.appendChild(docFragment); // twice .appendChild() ? hmm... ok!
	}
	fillTable(); // onload call

	// I'm tired to comment, so guess by youself what's below :)

	document.querySelector('.sort-month').addEventListener('click', function(e) {
		function sortFun(i, ii) {
			if (i.getMonth() > ii.getMonth()) {
				return 1;				
			} else if (i.getMonth() < ii.getMonth()) {
				return -1;
			} else {
				return 0;
			}
		}
		dateArray.sort(sortFun);
		fillTable();
		e.preventDefault();
	});

	document.querySelector('.sort-weekday').addEventListener('click', function(e) {
		function sortFun(i, ii) {
			if (i.getDay() > ii.getDay()) {
				return 1;				
			} else if (i.getDay() < ii.getDay()) {
				return -1;
			} else {
				return 0;
			}
		}
		dateArray.sort(sortFun);
		fillTable();
		e.preventDefault();
	});

	document.querySelector('.sort-beforeNYday').addEventListener('click', function(e) {
		function sortFun(i, ii) {
			if (Math.round( (1388534400000 - i.getTime())/86400000 ) > Math.round( (1388534400000 - ii.getTime())/86400000 )) {
				return 1;				
			} else if (Math.round( (1388534400000 - i.getTime())/86400000 ) < Math.round( (1388534400000 - ii.getTime())/86400000 )) {
				return -1;
			} else {
				return 0;
			}
		}
		dateArray.sort(sortFun);
		fillTable();
		e.preventDefault();
	});








};

