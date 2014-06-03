(function()
{
  var defaults = {},

  SSPlot.View.SVGView = function( params )
  {
    var svgView = {},

    $el = $(params.canvas) || $('<div></div>'),

    el = $el[0],

    paper  = Raphael( el ),

    svg = paper.set();

    svgView.attributes = params;

    Object.defineProperties( svgView, {
      $el : { get : function(){ return $el; } },
      el : { get : function(){ return el; } },
      paper : { get : function(){ return paper; } },
      svg : { get : function(){ return svg; } },

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
          var index = svgView.svg.items.length;
          while( --index >= 0 )
          {
            if( svgView.node === element )
              return svgView;
          }

          return false;
        }
      }
    });

    return svgView;
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
    }
  },

  SSPlot.SVGView = {};
  Object.defineProperties({
    extend : function(){ return extend; }
  });

})(Raphael);
