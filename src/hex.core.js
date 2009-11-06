/**
 * hex.core.js
 */
(function(){

var
	version = '0.1',
	undefined,
	window = this,
	join = Array.prototype.join,
	slice = Array.prototype.slice,
	has = Object.prototype.hasOwnProperty,
	hex = window.hex = {};

/**
 * Anonymous function used in constructing objects from prototypes.
 */
function anonymous(){};

/**
 * Extend one object with the properties of any other object(s).
 * @param obj The object to extend.
 * @param args Additional arguments - the objects from which to copy properties.
 * @return The object which was extended.
 */
var extend = hex.extend = function extend( obj /*, args ... */ ) {
	var args = slice.call(arguments, 1);
	for (var i=0, l=args.length; i<l; i++) {
		var other = args[i];
		if (!other) continue;
		for (var k in other) {
			if (has.call(other, k)) obj[k] = other[k];
		}
	}
	return obj;
};

extend(hex, {
	
	/**
	 * Creates a new object with the specified prototypal parent, exteded by provided additional object arguments.
	 * @param parent The prototypal parent object.
	 * @param args Any number of additonal arguments (optional).
	 * @return A new object with the prototypal parent set, extended by the provided args.
	 */
	create: function create( parent /*, args ... */ ) {
		if (!parent) throw "no parent supplied";
		var args = slice.call(arguments, 1);
		anonymous.prototype = parent;
		var obj = new anonymous();
		if (!args.length) return obj;
		args.unshift(obj);
		return extend.apply(undefined, args);
	},
	
	/**
	 * Key method, for making a key string out of scalar parameters.
	 * @param args Any number of scalar arguments.
	 * @return A string containing the arguments concatenated by a separator.
	 */
	key: function key( /* args ... */ ) {
		return join.call(arguments, ',');
	},
	
	/**
	 * Determines the real on-screen position of a DOM element.
	 * @see http://www.quirksmode.org/js/findpos.html
	 * @param elem The DOM element to inspect.
	 * @return An object with x and y properties to represent the position.
	 */
	position: function position( elem ) {
		var left = elem.offsetLeft, top = elem.offsetTop;
		while (elem = elem.offsetParent) {
			left += elem.offsetLeft;
			top += elem.offsetTop;
		}
		return { x: left, y: top };
	},
	
	/**
	 * Retrieves the computed style of a given DOM element.
	 * @see http://www.quirksmode.org/dom/getstyles.html
	 * @param elem The DOM element to inspect.
	 * @param property The CSS property to look up.
	 * @return The computed style value.
	 */
	style: function style( elem, property ) {
		var value;
		if (elem.currentStyle) {
			value = elem.currentStyle[property];
		} else if (window.getComputedStyle) {
			value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(property);
		}
		return value;
	},
	
	version: version
	
});

})();

