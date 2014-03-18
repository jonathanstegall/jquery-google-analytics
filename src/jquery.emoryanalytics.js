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
    var pluginName = "emoryAnalytics",
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
						},
						'toggleNav': {
							'selector': '.toggle-nav',
							'category': 'Main Navigation',
							'action': 'Toggle (Mobile)',
							'label': function() {
								return window.location.pathname;
							}
						},
						'mainNav': {
							'selector': '#main-nav a',
							'category': 'Main Navigation',
							'action': 'Click'
						},
						'utilityNav': {
							'selector': '#emory-wide div a',
							'category': 'Utility Navigation',
							'action': 'Click',
						},
						'footerNav': {
							'selector': '#footLinks a',
							'category': 'Footer Navigation',
							'action': 'Click',
						},
						'subNav': {
							'selector': '#sub-nav a',
							'category': 'Sub Navigation',
							'action': 'Click',
							'label': 'url'
						},
						'breadcrumbNav': {
							'selector': '.breadcrumbs a',
							'category': 'Breadcrumb Navigation',
							'action': 'Click',
						},
						'rslide': {
							'selector': '.slides .rslides li a',
							'category': 'Slideshow / Hero',
							'action': 'Click Image',
						},
						'rslideArrowNext': {
							'selector': '.slides .callbacks_nav.next',
							'category': 'Slideshow / Hero',
							'action': 'Click Arrow',
							'label': 'Next'
						},
						'rslideArrowPrev': {
							'selector': '.slides .callbacks_nav.prev',
							'category': 'Slideshow / Hero',
							'action': 'Click Arrow',
							'label': 'Previous'
						},
						'rslideNumber': {
							'selector': '.slides .rslides_tabs li a',
							'category': 'Slideshow / Hero',
							'action': 'Click Number',
							'label': 'text (1, 2, 3)'
						},
						'rslideRandom': {
							'selector': '.slides .randomizer li a',
							'category': 'Random Hero',
							'action': 'Click Image',
						},
						'heroBlueBarImage': {
							'selector': '.slides .rslides li a',
							'category': 'Emory Blue Bar Slideshow',
							'action': 'Click Hero Image',
						},
						'heroBlueBarLink': {
							'selector': '.slides .exploreEmory div a',
							'category': 'Emory Blue Bar Slideshow',
							'action': 'Click Blue Bar Link',
							'label': 'text'
						},
						'heroBlueBarInfo': {
							'selector': '.slides #slides div a',
							'category': 'Emory Blue Bar Slideshow',
							'action': 'Click Info Box link',
						},				
						'azList': {
							'selector': '#letter-filter a',
							'category': 'A-Z List',
							'action': 'Click',
							'label': 'text'
						},
						'audienceNav': {
							'selector': '.guides-list a',
							'category': 'Audience Navigation',
							'action': 'Click',
						},
						'quickLink': {
							'selector': '.quick-links a',
							'category': 'Quick Links',
							'action': 'Click',
						},
						'callout': {
							'selector': '.callouts-list li > a',
							'category': 'Callout',
							'action': 'Click',
						},
						'feature': {
							'selector': '.feature a',
							'category': 'Feature',
							'action': 'Click',
						},
						'profile': {
							'selector': '.profile a',
							'category': 'Profile',
							'action': 'Click',
						},
						'testimonial': {
							'selector': '.testimonial a',
							'category': 'Testimonial',
							'action': 'Click',
						},
						'newsWidget': {
							'selector': '.emory-feed a',
							'category': 'Emory News Feed',
							'action': 'Click',
						},
						'socialIcon': {
							'selector': '.social-icons-list a',
							'category': 'Social Media Icons',
							'action': 'Click',
						},
						'calendar': {
							'selector': '.trumba a',
							'category': 'Trumba Calendar',
							'action': 'Click',
							'label': 'text'
						},
						'rssFeed': {
							'selector': '.news-feed a',
							'category': 'Misc News Feed',
							'action': 'Click',
						},
						'tab': {
							'selector': '.nav-tabs li a',
							'category': 'Tabs',
							'action': 'Click',
							'label': 'text'
						},
						'accordion': {
							'selector': '.accordion a.accordion-toggle',
							'category': 'Accordions',
							'action': 'Click',
							'label': 'text'
						}
        };

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
    }

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
              if (gaq) {	
									this.debug('we have analytics');									
									jQuery.each(options, function( key, value ) {
										//console.log('key is '+key+' and value is '+value);
										if (typeof value === 'object') {
											var onevent = options.on;
											var label = options.label($(this));
											var selector = value.selector;
											var category = value.category;
											var action = value.action;
											if (typeof value.on !== 'undefined') {
												onevent = value.on;
											}
											$(selector).on(onevent, function(event){
												if (options.debug === true) {
													if (typeof value.label !== 'undefined') {
														label = value.label($(this));
													} else {
														label = options.label($(this));
													}
													console.log('we did a '+onevent+' on the '+selector+' object which has the category '+category+' and action '+action+' and label '+label);
													_gaq.push(['_trackEvent', category, action, label]);
													return false; // do i actually need this?
												}
											});
										}
									});
									
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
          
				},

        yourOtherFunction: function(el, options) {
            // some logic
        } // yourOtherFunction
    };

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