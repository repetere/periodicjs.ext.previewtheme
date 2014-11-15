(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var themelistrows,
	addPreviewButton = function (docEl) {
		var previewbutton = document.createElement('a'),
			previewbuttonstyle = '_pea-color-default',
			previewbuttonthemename = docEl.children[0].querySelector('a').getAttribute('data-themename');

		if (window.previewtheme && window.previewtheme === previewbuttonthemename) {
			previewbuttonstyle = '_pea-color-warn';
			previewbuttonthemename = 'initial';
		}
		previewbutton.innerHTML = 'preview';
		previewbutton.setAttribute('class', '_pea-button ' + previewbuttonstyle + ' _pea-dialog-delete');
		previewbutton.setAttribute('data-successfunction', 'previewNewTheme');
		previewbutton.setAttribute('data-href', '/p-admin/previewtheme/switchtheme/' + previewbuttonthemename);
		//data-href="/item/what-your-hands-reveal-about-your-health/delete"

		docEl.children[1].appendChild(previewbutton);
	};

window.previewNewTheme = function () {
	window.location.reload();
};

window.addEventListener('load', function () {
	themelistrows = document.querySelectorAll('#installed-theme-tablebody tr');
	if (window.ajaxDeleteButtonListeners) {
		if (themelistrows) {
			for (var z = 0; z < themelistrows.length; z++) {
				addPreviewButton(themelistrows[z]);
			}
		}
		window.ajaxDeleteButtonListeners();
	}
}, false);

},{}]},{},[1]);
