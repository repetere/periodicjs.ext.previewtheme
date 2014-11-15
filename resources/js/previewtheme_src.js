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
