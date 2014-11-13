options = {
    'debug': false, // this can be set to true on page level options
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