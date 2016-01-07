/*
	http://davidwalsh.name/lazyload
*/
/* lazyload */

function base64_decode(input) {
	var keyStr = 'ABCDEFGHIJKLMNOP'
							 + 'QRSTUVWXYZabcdef'
							 + 'ghijklmnopqrstuv'
							 + 'wxyz0123456789+/'
							 + '=';
	var output = '';
	var chr1, chr2, chr3 = '';
	var enc1, enc2, enc3, enc4 = '';
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = '';
		enc1 = enc2 = enc3 = enc4 = '';
	} while (i < input.length);

	return unescape(output);
}

var LazyLoad = new Class({

	Implements: [Options,Events],

	/* additional options */
	options: {
		range: 200,
		image: '/wp-content/plugins/mootools-image-lazy-loading/'+'blank.gif',
		resetDimensions: false,
		elements: 'img',
		container: window
	},

	/* initialize */
	initialize: function(options) {

		/* vars */
		this.setOptions(options);
		this.container = $(this.options.container);
		this.elements = $$(this.options.elements);
		this.containerHeight = this.container.getSize().y;
		this.start = -1;

		/* find elements remember and hold on to */
		this.elements = this.elements.filter(function(el) {
			/* reset image src IF the image is below the fold and range */
			if(el.getPosition(this.container).y > this.containerHeight + this.options.range) {
				el.store('oSRC',el.get('src')).set('src',this.options.image);
				if(this.options.resetDimensions) {
					el.store('oWidth',el.get('width')).store('oHeight',el.get('height')).set({'width':'','height':''});
				}
				return true;
			}
		},this);
		//alert('Deferring loading of ' + this.elements.length + ' elements');

		//this.elements.push($('placeholder-sidebar-ad'));
		this.elements.push($('placeholder-sidebar-video'));
		this.elements.push($('placeholder-sidebar-video-2'));
		this.elements.push($('placeholder-sidebar-video-3'));
		this.elements.push($('placeholder-sidebar-video-english'));
		this.elements.push($('placeholder-sidebar-chroniques'));
		var blogbang = $('placeholder-single-blogbang');
		if (blogbang) this.elements.push(blogbang);
		var addthis = $('placeholder-single-addthis');
		if (addthis) this.elements.push(addthis);
		var subscribebox = $('subscribebox2');
		if (subscribebox) this.elements.push(subscribebox);
		this.elements.push($('placeholder-footer-video'));

		/* create the action function */
		var action = function() {
			var cpos = this.container.getScroll().y;
			if(cpos > this.start) {
				this.elements = this.elements.filter(function(el) {
					if((this.container.getScroll().y + this.options.range + this.containerHeight) >= el.getPosition(this.container).y) {
						switch (el.tagName.toLowerCase())
						{
							case 'div':
								var params = base64_decode(el.getElementsByTagName('span')[0].title).split('|');

								el.style.border = '0px';
								el.style.background = 'none';

								switch (params[0])
								{
									case 'ul':
										Socialite.load(el);
										break;
									case 'div':
										var s = document.createElement('script');
										s.src = params[2];
										s.type = 'text/javascript';
										el.appendChild(s);
										break;
									case 'iframe':
										JSEnhancedLoader({placeholder: el, src: params[2], tag: 'body'});
										break;
								}
								break;
							case 'img':
								if(el.retrieve('oSRC')) { el.set('src',el.retrieve('oSRC')); }
								if(this.options.resetDimensions) {
									el.set({
										width: el.retrieve('oWidth'),
										height: el.retrieve('oHeight')
									});
								}
								this.fireEvent('load',[el]);
								break;
						}
						return false;
					}
					return true;
				},this);
				this.start = cpos;
			}
			this.fireEvent('scroll');
			/* remove this event IF no elements */
			if(!this.elements.length) {
				this.container.removeEvent('scroll',action);
				this.fireEvent('complete');
			}
		}.bind(this);

		action();

		/* listen for scroll */
		this.container.addEvent('scroll',action);
	}
});