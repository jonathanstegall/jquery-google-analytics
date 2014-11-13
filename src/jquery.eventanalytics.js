// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "eventAnalytics",
    defaults = {
        'debug': false, // this can be set to true on page level options
		'on': 'click', // default event
		'label': function(selector) {
			return $(selector).attr('href'); // by default, put the href in the label, as most of these are still links
		},
		'form': {
			'selector': 'form',
			'category': 'Form',
			'action': 'Submit',
			'label': function() {
				return window.location.pathname;
			},
			'on': 'submit'
		},
		'search': {
			'selector': '#form-search',
			'category': 'Search Form',
			'action': 'Submit',
			'label': function(selector) {
				return $(selector).find("#q").val();
			},
			'on': 'submit'
		},
		'toggleSearch': {
			'selector': '.toggle-search',
			'category': 'Search Form',
			'action': 'Toggle (Mobile)',
			'label': function() {
				return window.location.pathname;
			}
		},
		//'file': {
			//'selector': 'a[href$=\'.ashx\']',
			//'category': 'File',
			//'action': 'Download'
		//},
		'external': {
			'selector': "a[href*='http://']:not([href*='"+location.hostname+"'])",
			'category': 'Link',
			'action': 'External'
		},
		'mailto': {
			'selector': "a[href^=\"mailto:\"]",
			'category': 'Link',
			'action': 'Email Address',
		}
    }; // end defaults

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    } // end constructor

    Plugin.prototype = {

        init: function() {

			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.options
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.options).

			if (this.options.debug === true) {
				this.debug(this.options);
				// return;
			}

			this.loadAnalytics(this.options);

        }, // init

		debug: function(message) {
			if (this.options.debug === true) {
				console.log(message);
			}
		}, // debug
			
		loadAnalytics: function(options) {
			//if (options.debug !== true) {
			var gaq = window._gaq;
			if (gaq) {	// is gaq object present?
				this.debug('we have analytics');									
				jQuery.each(options, function( key, value ) {
					this.debug('key is '+key+' and value is '+value);
					if (typeof value === 'object') {
						var onevent = options.on;
						var label = options.label($(this));
						var selector = value.selector;
						var category = value.category;
						var action = value.action;
						if (typeof value.on !== 'undefined') {
							onevent = value.on;
						}
						$(selector).on(onevent, function(event) {
							if (options.debug === true) {
								if (typeof value.label !== 'undefined') {
									label = value.label($(this));
								} else {
									label = options.label($(this));
								}
								this.debug('we did a '+onevent+' on the '+selector+' object which has the category '+category+' and action '+action+' and label '+label);
								_gaq.push(['_trackEvent', category, action, label]);
								return false; // do i actually need this?
							}
						});
					}
				}); // for each option
									
				// Set the context for our deferred callback.
				var that = this;

				// Push data to google. do we still need this or is it replaced by line 275?
				/* $.when(gaq.push(args)).done(
					function () {
						// Redirect the location - delayed so that any other page functionality has time to run.

						setTimeout(function () {
							var href = that.attr("href");

							if (href && href.indexOf("#") !== 0) {
								window.location = href;
							}

						}, 100);
					}
				);*/

			} else {
				this.debug("Google Analaytics _gaq is not defined");
			}

		}, // loadAnalytics

        yourOtherFunction: function(el, options) {
            // some logic
        } // yourOtherFunction
	
	}; // plugin.prototype

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );