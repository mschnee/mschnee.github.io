(function(w, d){
	var levelBlocks = [
		// 0
		   0, 
		// 1,   2,     3,     4,    5,    6,    7,   8,     9	   10
		   0, 300,   600,  1100, 1700, 2300, 4200, 6000, 7350, 9930,
		//     11,    12,    13,    14,    15,    16,    17,    18,    19,    20,
			11800, 15600, 19600, 23700, 26400, 30500, 35400, 40500, 45700, 51000,
		//     21,
			56600, 63900, 71400, 79100, 87100, 95200, 109800, 124800, 140200, 155900, 162500, 
		//	   31,
		   175900, 189600, 203500, 217900, 232320, 249900, 267800, 286200, 304900,
        //     41
		   324000, 340200, 356800, 373700, 390800, 408200, 437600, 467500, 498000, 529000
	];
	var content, currentLevelInput, targetLevelInput, currentExpInput, expPerLeveInput, expNeededOutput, turninsOutput, hqTurninsOutput;
	
	var init = function() {
		var content = d.createElement("div");
		currentLevelInput = d.querySelector("input[name='currentLevel']");
		targetLevelInput = d.querySelector("input[name='targetLevel']");
		currentExpInput = d.querySelector("input[name='currentExp']");
		expPerLeveInput = d.querySelector("input[name='expPerLeve']");

		expNeededOutput = d.querySelector("#resultXp");
		turninsOutput = d.querySelector("#leveCount");
		hqTurninsOutput = d.querySelector("#leveHqCount");
		initBindings();

		updateCalculations();
	};

	var initBindings = function() {
		currentLevelInput.addEventListener("keydown", currentLevelKeyDown, true);
		targetLevelInput.addEventListener("keydown", targetLevelKeyDown, true);
		currentExpInput.addEventListener("keydown", currentExpKeyDown, true);
		expPerLeveInput.addEventListener("keydown", currentExpPerLeveKeyDown, true);
	}

	var currentLevelKeyDown = function(event) {
		event.stopPropagation();
		var constraintResult = numericInputConstraint(currentLevelInput, event);
		if ( constraintResult === true ){
			setTimeout(updateCalculations,1);
			return true;
		} else if (constraintResult === false ) {
			event.preventDefault();
			return constraintResult;
		}

		event.preventDefault();
		currentLevelInput.value = constraintResult;

		if( targetLevelInput.value <= constraintResult ) {
			targetLevelInput.value = constraintResult < targetLevelInput.getAttribute("max") ? 
				parseInt(constraintResult, 10)+1 : cons
		}
		updateCalculations();
		return false;
	}

	var targetLevelKeyDown = function(event) {
		event.stopPropagation();
		var constraintResult = numericInputConstraint(targetLevelInput, event);
		if ( constraintResult === true ){
			setTimeout(updateCalculations,1);
			return true;
		} else if (constraintResult === false ) {
			event.preventDefault();
			return constraintResult;
		}

		event.preventDefault();
		targetLevelInput.value = constraintResult;
		updateCalculations();
		return false;
	}

	var currentExpKeyDown = function(event) {
		event.stopPropagation();
		var constraintResult = numericInputConstraint(currentExpInput, event);
		if ( constraintResult === true ){
			setTimeout(updateCalculations,1);
			return true;
		} else if (constraintResult === false ) {
			event.preventDefault();
			return constraintResult;
		}

		event.preventDefault();
		currentExpInput.value = constraintResult;
		updateCalculations();
		return false;
	}

	var currentExpPerLeveKeyDown = function(event) {
		event.stopPropagation();
		var constraintResult = numericInputConstraint(expPerLeveInput, event);
		if ( constraintResult === true ){
			setTimeout(updateCalculations,1);
			return true;
		} else if (constraintResult === false ) {
			event.preventDefault();
			return constraintResult;
		}

		event.preventDefault();
		expPerLeveInput.value = constraintResult;
		updateCalculations();
		return false;
	}

	var updateCurrentXpConstraint = function() {
		currentExpInput.setAttribute("max", 
			levelBlocks[targetLevelInput.value]
		);
		if (currentExpInput.value > levelBlocks[targetLevelInput.value]) {
			currentExpInput.value = 0;
		}
	}

	var updateCalculations = function() {
		
		var currentLevel = parseInt(currentLevelInput.value, 10);
		var targetLevel = parseInt(targetLevelInput.value, 10);
		var expPerLeve = parseInt(expPerLeveInput.value, 10);

		if( targetLevel <= currentLevel) {
			expNeededOutput.innerHTML = "0";
			return;
		}
		if ( targetLevel > levelBlocks.length ) {
			return;
		}
		if( !expPerLeve || isNaN(expPerLeve) ) {
			turninsOutput.innerHTML = "...";
			hqTurninsOutput.innerHTML = "...";
			return;
		}
		var neededXp = levelBlocks[currentLevel] - currentExpInput.value;
		for (var l = currentLevel+1; l <= targetLevel && l < levelBlocks.length; l++) {
			neededXp += levelBlocks[l];
		}
		expNeededOutput.innerHTML = neededXp;

		
		var levesNecessary = neededXp / expPerLeve;
		turninsOutput.innerHTML = Math.max( Math.ceil(levesNecessary), 1);
		hqTurninsOutput.innerHTML = Math.max(Math.ceil(levesNecessary / 2), 1)

	}

	/**
	 *	Metafunction.
	 *	Will return true, false, or a new string value
	 */
	var numericInputConstraint = function(element, event) {
		switch (event.which) {
			case 8:
			case 9:
			case 13:
			case 27:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 39:
			case 45:
			case 46:
			return true;
		}
		var newValInt;
		var curValStr = element.value;
		var min = parseInt(element.getAttribute("min"), 10); 
		var max = parseInt(element.getAttribute("max"), 10);
		if (event.which == 38) {
			newValInt = curValStr? parseInt(curValStr, 10)+1: 1;
		} else if (event.which == 40) {
			newValInt = curValStr? parseInt(curValStr, 10)-1: 1;
		} else {
			var strVal = String.fromCharCode(event.which);
			
			if ( ! /^\d/.test(strVal)) {
				return false;
			}

			// get the caret position, min attribute and max attribute
			var caretPos = element.selectionStart || 0;
			

			// assemble a new value string
			var newValStr = curValStr.substr(0, caretPos) + strVal + curValStr.substr(caretPos);
			if (newValStr.substr(0, 1) === "0") {
				return false;
			}

			newValInt = parseInt(newValStr, 10);	
		}
		
		if(element.hasAttribute("max")) {
			if (newValInt >= min && newValInt <= max) {
				return newValInt;
			}
		} else {
			if (newValInt >= min) {
				return newValInt;
			}
		}
		return false;
	}

	d.addEventListener("DOMContentLoaded", init);
})(window, document)

