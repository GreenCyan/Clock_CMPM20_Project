var CLOCK_DELAY = 1000;

// Clock to keep track of time
// Minutes represented by seconds
// Executes endFunction at end of timer
function Clock(startSec, stopSec, endObject, endFunction) {
	TextBox.call(this, "0:00");
	
	// starting time
	this.startHour = Math.floor(startSec / 60);
	this.startMin = startSec % 60;
	// stopping time
	this.stopHour = Math.floor(stopSec / 60);
	this.stopMin = stopSec % 60;
	
	this.endOb = endObject;
	this.endFunc = endFunction;
	
	if (this.startMin >= 10) {
		this.text = this.startHour + ":" + this.startMin;
	} else {
		this.text = this.startHour + ":0" + this.startMin;
	}
	
	
	//a second represented in milliseconds
	this.delay = CLOCK_DELAY;
	
	this.counting = null;
	if (startSec < stopSec) {
		this.counting = function () {
			if (this.delay <= 0) {
				this.startMin++;
				if (this.startMin >= 60) {
					this.startMin %= 60;
					this.startHour++;
				}
				return true;
			} return false;
		}
	} else {
		this.counting = function () {
			if (this.delay <= 0) {
				this.startMin--;
				if (this.startMin < 0) {
					this.startMin += 60;
					this.startHour--;
				}
				return true;
			} return false;
		}
	}
	
	this.pauseClock = function() {
		this.update = null;
	};
	
	this.startClock = function() {
		this.update = function(d) {
			if (this.counting()) {
				this.delay = CLOCK_DELAY;
			} else {
				this.delay -= (d*MSPF);
				return;
			}
			if (this.startMin >= 10) {
				this.text = this.startHour + ":" + this.startMin;
			} else {
				this.text = this.startHour + ":0" + this.startMin;
			}
			if (this.startHour == this.stopHour && this.startMin == this.stopMin) {
				this.pauseClock();
				this.endFunc.call(this.endOb);
			}
		};
	};
};

Clock.prototype = Object.create(TextBox.prototype);
Clock.prototype.constructor = Clock;
