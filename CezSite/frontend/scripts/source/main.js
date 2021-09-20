;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	
	window.Global = window.Global || {};
	window.Helpers = window.Helpers || {};


	/* ------------------------------------------------------------ *\
		#FUNCTION DEFINITIONS
	\* ------------------------------------------------------------ */
	/**
	* Create a function that only can be called once every 400 ms.
	*
	* Example:
	* var df = debounce(function() {
	* 		... func body ...
	* }, 500)
	*
	* @public
	* @param  {function}
	* @param  {number}
	* @return {function}
	*/
	Helpers.debounce = function(fn, wait) {
		var timeout;

		return function() {
			var ctx = this, args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				fn.apply(ctx, args);
			}, wait || 100);
		};
	};
	/**
	* Get input form multiple fields, send ajax request with key phase parameter to backend and display result.
	*
	* @public
	* @return {Object} All public methods
	*/
	Helpers.autocomplete = (function() {
		var options = {
			$searchFields: null,
			$searchResults: null,
			url: null,
			classNames: {
				active: 'has-flag'
			}
		};


		function _init(url) {

			options.$searchFields = $('#js-search-field');
			options.$searchResults = $('.js-search-results');
			options.url = url;

			// stop execution when elements does missing
			if (!options.$searchFields.length || !options.$searchResults.length) {
				return;	
			}

			_handleEvents();
		}

		function _handleEvents() {
			// type and focus on field
			options.$searchFields.on('keyup focusin', function() {
				var currentValue = $(this).val();

				if (currentValue.length > 1) {
					_getSearchResultsDebounced(currentValue);
				} else {
					_clean();
				}
			});

			// click outside and esc press
			$doc.on('keyup touchstart', function(e) {
				var $target = $(e.target);
				var keyEsc = 27;

				if ((!$target.closest(options.$searchResults).length) || (e.keyCode == keyEsc)) {
					_clean();
				}
			});
		}

		var _getSearchResultsDebounced = Helpers.debounce(function(value) {
			_getSearchResults(value);
		}, 400);

		function _getSearchResults(query) {
			var q = query;

			$.ajax({
				url: options.url,
				type: 'POST',
				dataType: 'json',
				data: {query: q},
				success: function(result) {
					if (result.success) {
						_render(result);
					}
				}
			});
		}

		function _render(data) {
			_clean();

			options.$searchResults.each(function() {
				var $this = $(this);

				$this.addClass(options.classNames.active);
				$this.append(data.html);
			});
		}
		
		function _clean() {
			options.$searchResults.each(function() {
				var $this = $(this);

				$this.removeClass(options.classNames.active);
				$this.html('');
			});
		}
		
		return {
			init: function(url) {
				_init(url);
			}
		};
	})();


	// google map init via jquery object 
	// example: var map = $('#js-map').googleMap({});
	// map.init({ options });
	$.fn.googleMap = function () {
			var coords= [];
			var bounds=null;
			var _this = this;
			var marker;
			var locations = [];
			var map;
			var customPin = true;
			var pin = {
				src: $('#js-map').data('pin-url'),
				x: 20,
				y: 20
			};
			var tooltips = true;
			var config = {};
			var allMarkers = [];

			function _init(configuration) {
				config = $.extend(true, {}, config, configuration);

				_validateInput();
			}

			function _validateInput() {
				if (typeof google !== 'object') {
					console.error('Component.GoogleMap: Please link Google Maps API!');
					console.error('Component.GoogleMap: Stop execution!');
					return false;
				}
				if (!config.locations.length) {
					console.error('There are currently no locations!');


				}
				_cacheConfig();
			}

			function _cacheConfig() {
				locations = config.locations;
				if (typeof config.pin !== 'undefined') {
					pin = config.pin;
				}

				if (typeof config.customPin !== 'undefined') {
					customPin = config.customPin;
				}

				if (typeof config.tooltips !== 'undefined') {
					tooltips = config.tooltips;
				}

				_createMap();
			}

			function _createMap() {
				var mapStyles = [];
				var pinSize = new google.maps.Size(45, 70);
				var initCoords = [42.6983,23.3199];
				var mapSettings = {
					zoom: 15,
					center: new google.maps.LatLng(42.6983,23.3199),
					gestureHandling: 'cooperative',
					scrollwheel: false,
					styles: mapStyles,
					disableDefaultUI: false,
					panControl: true,
					zoomControl: true,
					mapTypeControl: true,
					scaleControl: true,
					streetViewControl: true,
					overviewMapControl: true,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				bounds = new google.maps.LatLngBounds();
				var infoWindow = null;
				var i;


				if (tooltips) {
					infoWindow = new google.maps.InfoWindow();
				}


				// Display a map on the page.
				map = new google.maps.Map(_this.get(0), mapSettings);
				_this.data('map',map);
				fillMarkers();
				return _this;
			}

			function _createMarker(location) {
				var latLng = new google.maps.LatLng(location[0], location[1]);
				var markerSettings = null;
				var marker = null;
				if (customPin) {
					markerSettings = {
						position: latLng,
						map: map,
						draggable:false,
						animation: google.maps.Animation.DROP,
						icon: {
							url: pin.src,
							scaledSize: new google.maps.Size(30, 40),
						},
						tooltips: true
					};
				} else {
					markerSettings = {
						position: latLng,
						map: map,
						animation: google.maps.Animation.DROP,
					};
				}

				marker = new google.maps.Marker(markerSettings);

				bounds.extend(latLng);

				return marker;
			}

			function fillMarkers(){
				if (locations.length > 1) {

					for (var i = 0; i < locations.length; i++) {
						var markr = _createMarker(locations[i]);
							var infoDiv = '<div class="map-tooltip">' + $('#address-'+(i+1)).html(); +'</div>';
						if (tooltips) {
							var infoWindow = null;
								infoWindow = new google.maps.InfoWindow();
							google.maps.event.addListener(markr, 'click', (function(mm, tt) {
							return function() {
							infoWindow.setContent(tt);
							infoWindow.open(map, mm);
							};})(markr, infoDiv));
						}
						allMarkers.push(markr);
					}

					// Automatically center the map fitting all markers on the screen. Ignore zoom 	from settings.
					if (locations.length > 1) {
						map.fitBounds(bounds);
					}
				} else if (locations[0]){
					var cLat = parseFloat(locations[0][0]);
					var cLng = parseFloat(locations[0][1]);
					var marker = _createMarker(locations[0]);
					allMarkers.push(marker);

					map.setCenter({lat: cLat,lng: cLng});
					map.setZoom(12);
				}
			}

			function _panTo(lat, lng) {
				// 	// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
				var boundsListener = google.maps.event.addListener(map, 'bounds_changed', function(event) {
					this.setZoom(5);
					google.maps.event.removeListener(boundsListener);
				});
				map.panTo({
					lat: Number(lat),
					lng: Number(lng)
				});
			}

			this.init = function (configuration) {
				_init(configuration);
			};
			return this;
	};



	//mobile-menu state
	function mobileMenu () {
		if($('#js-menu-trigger')) {
			$('#js-menu-trigger').on('click', function() {
				var target = $(this).data('active-target');
				$(target).toggleClass('visible');
				$(target + '.level-1').css('display','block');
			});
		}
	}

	// Change state for companies-details page elements
	function pageDetailsChangeState() {
		$('[id*="trigger"]').on('click',function() {

			var id = $(this).attr('id');
			var clazz ='.'+ id.replace(/trigger/i,'target');
			$(this).siblings().removeClass('has-flag');
			$(this).addClass('has-flag');
			$(clazz).siblings().removeClass('has-flag');
			$(clazz).addClass('has-flag');

		});
	}

	// Google map init for contacts page
	function googleMapInit() {
			if ($('#js-map').length) {
				var locations = [];
				var map = $('#js-map').googleMap();
				if($('.js-map-location')){
					$('.js-map-location').each(function() {
						locations.push([$(this).attr('data-lat'), $(this).attr('data-lng')]);
					});
				}
				map.init({
					customPin: true,
					locations: locations,
					tooltips: true
				});
			}
	}

	// Toggle accordion state.
	function accordionInit() {
		var $current = null;
		var $items = $('.js-accord-scope');

		function changeState($element) {
			$current = $element.closest('.js-accord-scope');

			$items.not($current).removeClass('has-flag');
			$current.toggleClass('has-flag');
		}

		$('.js-accord-trigger').on('click', function() {
			changeState($(this));
		});
	}

	// search form controller
	function searchFormControls () {
		$('#js-search-button').on('click', function(event) {
			$(this).css('display','none');
			if (document.body.clientWidth > 1023) {
				$('.level-1').css('display','none');
			}
			$('#js-search-form').css('display','block');
		});
		$('#js-search-close').on('click', function(event) {
			$('#js-search-button').css('display','inline-block');
			$('#js-search-form').css('display','none');
			$('.level-1').css('display','block');
		});
	}

	/* ------------------------------------------------------------ *\
		#EVENT BINDS
		\* ------------------------------------------------------------ */


		$doc.ready(function() {
		/**
		 * Inline external svg sprite to all pages
		 *
		 * plugin: svg4everybody
		 * https://github.com/jonathantneal/svg4everybody
		 * 
		 */
		var autocompleteUrl = $('#js-search-form').data('search-url');
		googleMapInit();
		svg4everybody();
		accordionInit();
		pageDetailsChangeState();
		searchFormControls();
		Helpers.autocomplete.init(autocompleteUrl);
		mobileMenu();

		/**
		 * All notifications configuration
		 *
		 * plugin: toastr
		 * https://github.com/CodeSeven/toastr
		 * 
		 */
		 toastr.options = {
		 	"closeButton": true,
		 	"debug": false,
		 	"newestOnTop": false,
		 	"progressBar": true,
		 	"positionClass": "toast-top-full-width",
		 	"preventDuplicates": false,
		 	"onclick": null,
		 	"showDuration": "300",
		 	"hideDuration": "1000",
		 	"timeOut": "10000",
		 	"extendedTimeOut": "1000",
		 	"showEasing": "swing",
		 	"hideEasing": "linear",
		 	"showMethod": "fadeIn",
		 	"hideMethod": "fadeOut"
		 };
		});
})(jQuery, window, document);