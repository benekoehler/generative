let frameRateContainer;

const showFramerate = () => {
	frameRateContainer.innerHTML = floor(frameRate());
}

const setupGUI = () => {
	const body = document.querySelector('body');
	frameRateContainer = document.createElement('div');
	frameRateContainer.classList.add('framerate')
	body.appendChild(frameRateContainer);

}