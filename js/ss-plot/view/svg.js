(function()
{
  SSPlot.SVGView = function( params )
  {
    var svgView = {},

    paper = params.paper,

    $el = $( paper.canvas ).parent(),

    el = $el[0],

    svg = paper.set();

    svgView.attributes = params;

    Object.defineProperties( svgView, 
    {
      $el : { get : function(){ return $el; } },
      el : { get : function(){ return el; } },
      paper : { get : function(){ return paper; } },
      svg : { get : function(){ return svg; } },

      model : {
        get : function()
        {
          if( typeof svgView.attributes[ 'model' ] 
              == 'undefined' )
            return null;

          return svgView.attributes[ 'model' ];
        }
      },

      get : { 
        get : function(){
          return function( propName )
          {
            if( typeof svgView.attributes[ propName ] 
              == 'undefined' )
              return null;

            return svgView.attributes[ propName ];
          }
        },
      },

      find : {
        get : function()
        {
          return function( element )
          {
            if( typeof element == 'string' )
              element = $el.find( element )[0] || false;

            if( !element ) return false;

            var index = svgView.svg.items.length;
            while( --index >= 0 )
            {
              if( svgView.node === element )
                return svgView;
            }
            return false;
          }
        }
      }
    });

    return svgView;
  },

  __setupEvent = function( _this, eventLabel, method )
  {
    var label = eventLabel.split(' '),
        obj = label[0],
        eventName = label[1];

    $( _this.paper.canvas ).on( eventName, function( event )
    {
      var target = $( event.target ),
          eventTarget = target.findAncestor( obj, _this.$el );
      
      if( !eventTarget )
        return;

      // TODO: figure out a fast way to find the raphael
      // wrapper
      $.extend( event, { 
        target : eventTarget, 
      } );

      method.call( _this, event );
    });
  },

  extend = function( svgSetup )
  {
    var defaults = $.extend( null, svgSetup.defaults, {}),
        initialize = svgSetup.initialize || function(){},
        events = $.extend(null, svgSetup.events, {});

    delete svgSetup['defaults'];
    delete svgSetup['events'];

    return function( params )
    {
      var svgBase = new SSPlot.SVGView( params ),
          params = $.extend( null, defaults, svgSetup );


      // call initializer
      initialize.call( svgBase );

      // setup events
      for( eventLabel in events )
      {
        __setupEvent( svgBase, 
                    eventLabel, 
                    events[eventLabel] );
      }

      // extend methods
      for( methodName in svgSetup )
        (function( methodName )
        {
          Object.defineProperty( svgBase, methodName,
          { 
            get : function()
            { 
              return svgSetup[ methodName ]; 
            }
          });
        })( methodName );

      return svgBase;
    }
  },

  Object.defineProperties( SSPlot.SVGView, {
    extend : { get : function(){ return extend; } }
  });

})(Raphael);
