(function(){
  /**
   * Math extensions for decimal based rounding, flooring
   * and ceilings
   *
   * support: all around
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || 
       !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  Math.round10 = Math.round10 ||
    function(value, exp) {
      return decimalAdjust('round', value, exp);
    };

  // Decimal floor
  Math.floor10 = Math.floor10 || 
    function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };

  // Decimal ceil
  Math.ceil10 = Math.ceil10 ||
    function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  console.log( '3D Vis system setup complete!' );
})();

if( typeof jQuery !== 'undefined' )
{

(function($)
{
  /**
   * Object.defineProperty
   *
   * support:
   * IE     : 9
   * Chrome : 1
   * FF     : 1
   * Opera  : 1
   * Safari : 1
   */
  console.log('3D System setup...');
  Object.defineProperties = 
    Object.defineProperties || function( obj, properties )
    {
      for( propertyName in properties )
      {
        var property = properties[ propertyName ];

        if( typeof property['get'] !== 'undefined' )
          obj.__defineGetter__( propertyName, property.get );

        if( typeof property['set'] !== 'undefined' )
          obj.__defineSetter__( propertyName, property.set );
      }
    };

  Object.defineProperty =
    Object.defineProperty || function( obj, propertyName, descriptor )
    {
      if( typeof descriptor['get'] !== 'undefined' )
        obj.__defineGetter__( propertyName, descriptor['get'] );

      if( typeof descriptor['set'] !== 'undefined' )
        obj.__defineGetter__( propertyName, descriptor['set'] );
    }
    
  /**
   * Extend JQuery to retrieve ancestors
   */
  if( !$.fn.findAncestor )
  {
    $.fn.findAncestor = function( ancestor, cap )
    {
      cap = $( cap );
      var matchingElts = (typeof cap == 'undefined' )?
        matchingElts = $( ancestor ) : cap.find( ancestor );

      if( matchingElts.length == 0 ) return false;

      var test = this;
      while( test.length > 0 &&
        $.inArray( test[0], matchingElts ) < 0 )
        test = test.parent();

      return test.length == 0? false : test;
    }
  }
  
})(jQuery);

}
