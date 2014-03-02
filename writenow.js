function preventBackspace(e) {
	var evt = e || window.event;

	if(evt) {
		var keyCode = evt.charCode || evt.keyCode;
		if (keyCode === 8) {
			if(evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		}
	}
}

function moveCursorToEnd(el) {

    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function decrementTimer(elt) {
	time = elt.getAttribute("data-time");
	if(--time > 0) {
		elt.setAttribute("data-time", time);
	}
	return time;
}

function drawTime(time,timer) {
		min = Math.floor(time/60);
		sec = time % 60;
		timer.textContent = ('0'+min).slice(-2) + ":" + ('0'+sec).slice(-2);
}

window.onload = function() {
	// get elements
	writenow = document.getElementById('writenow');
	timer = document.getElementById('timer');

	// preventBackspace
	writenow.onkeydown = function() {
		if(timer.dataset.time <= 0) writenow.disabled = true;

		preventBackspace();
		moveCursorToEnd(writenow);
		// Work around Chrome's little problem
    	window.setTimeout(function() {
        	moveCursorToEnd(writenow);
		},1);
	}

	// always write at the end
	writenow.onfocus = function() {
		moveCursorToEnd(writenow);
		// Work around Chrome's little problem
    	window.setTimeout(function() {
        	moveCursorToEnd(writenow);
    	}, 1);
	}

	// no pasting
	writenow.onpaste = function() { return false; }

	drawTime(timer.dataset.time, timer);
	setInterval(function(){
		time = decrementTimer(timer);
		drawTime(time, timer);
		if(time <= 0) writenow.disabled = true;
	}, 1000);
}

