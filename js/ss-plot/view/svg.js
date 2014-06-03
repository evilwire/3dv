(function()
{
  var defaults = {},

  SSPlot.View.SVGView = function( params )
  {
    var svgView = {};
    svgView.attributes = params;

    Object.defineProperties( svgView, {
      get : { 
        get : function(){
          return function( propName )
          {
            if( typeof svgView.attributes[ propName ] 
              === 'undefined' )
              return null;

            return svgView.attributes[ propName ];
          }
        },
      },

      find : {
        get : function( element )
        {
          return element;
        }
      }
    })
  },

  setupEvent = function( _this, eventLabel, method )
  {
    var label = eventLabel.split(' '),
        obj = label[0],
        eventName = label[1];
    
    $(obj).on( eventName, function( event )
    {
      var target = _this.find( event.target );

      $.extend( event, {

      } );
      method.call( _this, event );
    });
  },

  setupMethods = function( _

  extend = function( svgSetup )
  {
    var params = $.extend( null, defaults, svgSetup );

    return function( params )
    {
      var svgBase = new SSPlot.View.SVGView( params ),

      events = svgSetup.events || {};

      // call initializer
      svgSetup.initialize.call( svgBase );

      // setup events
      for( eventLabel in events )
        setupEvent( svgBase, 
                    eventLabel, 
                    events[eventLabel] );

      // extend methods
      for( methodName in svgSetup )
      Object.defineProperties( svgBase,

    }
  },

  SSPlot.SVGView = {};
  Object.defineProperties({
    extend : function(){ return extend; }
  });

})(Raphael);
