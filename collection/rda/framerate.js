'use strict';

var frameRateContainer = void 0;

var showFramerate = function showFramerate() {
	frameRateContainer.innerHTML = floor(frameRate());
};

var setupGUI = function setupGUI() {
	var body = document.querySelector('body');
	frameRateContainer = document.createElement('div');
	frameRateContainer.classList.add('framerate');
	body.appendChild(frameRateContainer);
};