const createElement = (tagName: string, className?: string) => {
	const element = document.createElement(tagName);

	if (className) element.classList.add(className);

	return element;
};

const createButton = (text: string, className?: string) => {
	const button = createElement('button', className);

	button.textContent = text;

	return button;
};

export { createElement, createButton };
