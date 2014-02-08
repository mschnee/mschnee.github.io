(function(w, d)) {
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
	}
	d.addEventListener("DOMContentLoaded", init);
} (window, document)
