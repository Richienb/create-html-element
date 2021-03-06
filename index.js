'use strict';
const stringifyAttributes = require('stringify-attributes');
const htmlTags = require('html-tags/void');
const {htmlEscape} = require('escape-goat');

const voidHtmlTags = new Set(htmlTags);

module.exports = options => {
	options = {
		name: 'div',
		attributes: {},
		html: '',
		...options
	};

	if (options.html && options.text) {
		throw new Error('The `html` and `text` options are mutually exclusive');
	}

	const content = options.text ? htmlEscape(options.text) : options.html;
	let result = `<${options.name}${stringifyAttributes(options.attributes)}>`;

	if (!voidHtmlTags.has(options.name)) {
		result += `${content}</${options.name}>`;
	}

	return result;
};
