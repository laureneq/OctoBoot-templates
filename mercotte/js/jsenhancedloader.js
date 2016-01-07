var JSEnhancedLoader = function(params) {
	if(!document['body']) {
		var caller = arguments.callee;
		return setTimeout(function() { caller(params); }, 100);
	}

	var iframe = document['createElement']('iframe');
	iframe.id = params['placeholder'].id.replace(/^placeholder-/i, 'placeholder-iframe-');
	iframe.className = 'placeholder-iframe';
	iframe.style.width = params['placeholder'].style.width;
	iframe.style.height = params['placeholder'].style.height;
	iframe.frameBorder = '0';
	iframe.marginHeight = '0';
	iframe.marginWidth = '0';
	iframe.scrolling = 'no';
	params['placeholder']['appendChild'](iframe);

	var domainSrc;

	try {
		iframe['contentWindow']['document'].open();
	} catch(e) {
		domainSrc = "javascript:var d=" + 'document' + ".open();d.domain='" + document.domain + "';";
		iframe['src'] = domainSrc + "void(0);";
	}

	function html() {
		return [
			'<', 'body', ' onload="var d=', 'document', ";d.getElementsByTagName('" + params['tag'] + "')[0].",
			'appendChild', '(d.', 'createElement', "('script')).", 'src', "='",
			params['src'],
			'\'" style="margin:0px;padding:0px;"></', 'body', '>'
		].join('');
	};

	try {
		var d = iframe['contentWindow']['document'];
		d.write(html());
		d.close();
	} catch(e) {
		iframe['src'] = domainSrc + 'd.write("' + html().replace(/"/g, '\\"') + '");d.close();';
	}
};
