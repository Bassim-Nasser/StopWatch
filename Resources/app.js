var win = Ti.UI.createWindow ({
	backgroundColor: '#ffffff',
	layout: 'vertical'
});

var timeview = Ti.UI.createLabel ({
	top:0,
	width: '100%',
	height: '30',
	backgroundColor: '#1C1C1C'
});

var label = Ti.UI.createLabel1 ({
	color: '#404040',
	text: 'Ready?',
	height: Ti.UI.SIZE,
	textAlign: 'center',
	verticalAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {
		fontSize: '55sp',
		fontWeight: 'bold'
	}
});

timeView.add(lable1);
win.add(timeView);

//win.open();

var StopWatch = require('stopwatch');
var stopwatch = new StopWatch(stopwatchListener, 10);

function stopwatchListener(watch) {
	labe.text = watch.toString();
}


var buttonsView = Ti.UI.createView({
	width: '100%',
	height: '10%',
	layout: 'horizontal'
});

var buttonStart = Ti.UI.createButton({
	title: 'Go',
	color: '#C0BFBF',
	width: '50%',
	height: Ti.UI.FILL,
	backgroundColor: '#727F7F',
	font: {
		fontSize: '25sp',
		fontWeight: 'bold'
	}
	
});

var buttonStop = Ti.UI.createButton({
	title: 'Stop',
	color: '#C0BFBF',
	width: '50%',
	height: 'Ti.UI.FILL',
	backgroundColor: '#404040',
	font: {
		fontSize: '25sp',
		fontWeight: 'bold'
	}
});

buttonsView.add(buttonStop);
buttonsView.add(buttonStart);
win.add(buttonsView);

buttonStart.addEventListener( 'click', function(e) {
	StopWatch.Start();
});
buttonStop.addEventListener( 'click', function(e) {
	StopWatch.stop();
	label.text = 'Ready?';
});


StopWatch = function(listener, resolution) {
this.startTime = 0;
this.stopTime = 0;
this.started = false;
this.listener = (listener != undefined ? listener : null); 

this.onehour = 1000 * 60 * 60;
this.onemin = 1000 * 60;
this.onesec = 1000;
};

StopWatch.prototype.start = function() {
var delegate = function(that, method) { return function() { return method.call(that); }; };
if (!this.started) {
this.startTime = new Date().getTime();
this.stopTime = 0;
this.started = true;
this.tickInterval = setInterval(delegate(this, this.onTick), this.tickResolution);
}
};

StopWatch.prototype.stop = function() {
if (this.started) {
this.stopTime = new Date().getTime();
this.started = false;
if (this.tickInterval != null)
clearInterval(this.tickInterval);
}
};
StopWatch.prototype.reset = function() {
this.totalElapsed = 0;
// * if watch is running, reset it to current time
this.startTime = new Date().getTime();
this.stopTime = this.startTime;
};
StopWatch.prototype.restart = function() {
this.stop();
this.reset();
this.start();
};

StopWatch.prototype.setElapsed = function(hours, mins, secs) {
this.reset();
this.totalElapsed = 0;
this.totalElapsed += hours * this.onehour;
this.totalElapsed += mins * this.onemin;
this.totalElapsed += secs * this.onesec;
this.totalElapsed = Math.max(this.totalElapsed, 0); 
};

Stopwatch.prototype.toString = function() {
var zpad = function(no, digits) {
no = no.toString().slice(0, 2);
while(no.length < digits)
no = '0' + no;
return no;
};
};

Stopwatch.prototype.setListener = function(listener) {
this.listener = listener;
};

Stopwatch.prototype.onTick = function() {
if (this.listener != null) {
this.listener(this);
}
};
module.exports = StopWatch;

