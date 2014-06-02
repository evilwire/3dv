var __PointHoverStyle = {
  r : 10,
  fill : '#3ae'
},

__PointStyle = {
  r : 4,
  'stroke-width': 0,
  fill: '#555'
},

__LineStyle = {
  'stroke-dasharray' : '. ',
  'stroke-width' : 1,
  'stroke-opacity' : .3, 
  'stroke' : '#555'
},

__LineHoverStyle = {
  'stroke-opacity' : 1, 
},

__TextStyle = {
    'font-family' : 'open sans',
    'font-size' : 12,
    'font-weight' : '300',
    'opacity' : 1
},

__TextHoverStyle = {
  'font-weight' : '400',
  'font-size' : 15,
  'opacity' : .5,
}

function Camera( params )
{
  // private variables
  var _orientation = params.orientation,
      /// private direction - where the camera is looking

      _position = params.position,
      /// private position - where the camera is located

      _apperture = params.apperture;
      /// private apperture - how 'wide' the camera can see

  // getters
  var orientation = function() { return _orientation; },
      position = function() { return _position; },
      apperture = function() { return _apperture; };

  // mutators
  var move = function( vector )
    { 
      _position = _position.add( vector ); 
    },

  rotate = function( matrix )
    {
      _orientation = _orientation.rotate( matrix );
    };

  // if we have Object.defineProperties - latest support for
  // object initialization
  if( Object.defineProperties )
  {
    var cameraObj = {};

    // initialize a using defineProperties
    Object.defineProperties( cameraObj, {
      // accessors:
      orientation : { get : orientation },
      position : { get : position },
      apperture : { get : apperture },

      // mutators
      move : { 
        get : function(){ 
          return move;
        } 
      },

      rotate : { 
        get : function(){ 
          return rotate; 
        } 
      }
    } );

    return cameraObj;
  }

  // otherwise, do some set/get 
  return {
    get orientation(){ return _orientation; },
    get position(){ return _position; },
    get apperture(){ return _apperture; },
    get move(){ return move; },
    get rotate(){ return rotate; }
  };
}

function Orientation( params )
{
  var _direction = params.direction.getUnit(),
      _vertical = params.vertical.getUnit(),
      _horizontal = _vertical.cross( _horizontal ),
      direction = function(){ return _direction; },
      vertical = function(){ return _vertical; },
      horizontal = function(){ return _horizontal; },

      rotate = function( matrix ) {
        var newDirection = matrix.actOn( _direction ),
            newVertical = matrix.actOn( _vertical );
        return new Orientation( {
          direction : newDirection,
          vertical : newVertical
        } );
      };
  if( Object.defineProperties )
  {
    var orientationObj = {};
    Object.defineProperties( orientationObj, {
      direction : { get : direction },
      vertical : { get : vertical },
      horizontal : { get : horizontal },
      rotate : { get : function(){ return rotate; } }
    } );
    return orientationObj;
  }

  return {
    get direction(){ return _direction; },
    get vertical(){ return _vertical; },
    get horizontal(){ return _horizontal; },
    get rotate(){ return rotate; }
  };
}

/**
 * @depends Raphael
 * 
 */
function SVGOutput( params )
{
  var outputObj = {},

  canvas = Raphael( params.canvas, '100%', '100%' ),
  
  drawMethods = {
    'point' : function( point )
    {
      // convert the point to a 2D point

      // create the point
      var c = new SVGPoint({
      });

      // render the circle
    }
  },

  draw = function( shape )
  {
    var drawMethod = drawMethods[shape.type];
    drawMethod.call( outputObj, shape );
  }

  return outputObj;
}

function SVGPoint( params )
{
  var __canvas = params.canvas,
  _x = params.x, 
  _y = params.y, 

  _pointStyle = 
    $.extend( {}, __PointStyle, 
      params.style ),

  _pointHoverStyle = 
    $.extend( {}, __PointHoverStyle, 
      params.hoverStyle ),

  _radius = _pointStyle.r,

  _viewInstance = null,

  pointObj = {},

  toString = function()
  {
    return String(Math.round(_x)) + " " + 
      String(Math.round(_y));
  },

  render = function(){
    _viewInstance = 
      __canvas.circle( _x, _y, _radius );
    _viewInstance.attr( _pointStyle );
    
    _viewInstance.mouseover( function( event )
    {
      var anim = Raphael.animation( 
        _pointHoverStyle,
        100, '<>');

      _viewInstance.animate( anim );
    });

    _viewInstance.mouseout( function( event )
    {
      var anim = Raphael.animation( 
        _pointStyle, 100, '<>');

      _viewInstance.animate( anim );
    });
  };
  
  if( Object.defineProperties )
  {
    Object.defineProperties( pointObj,
    {
      viewInstance : { get : function(){ return _viewInstance; } },
      render : { get : function(){ return render; } },
      toString : { get : function(){ return toString; } }
    } );
    return pointObj;
  }
  
  pointObj = {
    get viewInstance(){ return _viewInstance; },
    get render(){ return render; },
    get toString(){ return toString; }
  };
  return pointObj;
}

function SVGLine( params )
{
  var __canvas = params.canvas,
  _start = params.start, 
  _end = params.end, 
  _viewInstance = null,

  _lineStyle = 
    $.extend( {}, __LineStyle,
      params.style ),

  _lineHoverStyle = 
    $.extend( {}, __LineHoverStyle,
      params.hoverStyle ),
  
  render = function(){
    var pathStr = 'M' + _start.toString() + 'L' + _end.toString();
    _viewInstance = __canvas.path( pathStr );
    _viewInstance.attr( _lineStyle );

    _viewInstance.mouseover( function( event )
    {
      var anim = Raphael.animation( 
        _lineHoverStyle,
        100, '<>');

      _viewInstance.animate( anim );
    });

    _viewInstance.mouseout( function( event )
    {
      var anim = Raphael.animation( 
        _lineStyle, 100, '<>');

      _viewInstance.animate( anim );
    });
  },

  lineObj = {};

  if( Object.defineProperties )
  {
    Object.defineProperties( lineObj,
    {
      viewInstance : { get : function(){ return _viewInstance; } },
      render : { get : function(){ return render; } }
    } );
    return lineObj;
  }
  
  lineObj = {
    get viewInstance(){ return _viewInstance; },
    get render(){ return render; }
  };

  return lineObj;
}

function SVGText( params )
{
  var __canvas = params.canvas,
  _x = params.x,
  _y = params.y,
  _text = params.text,
  _viewInstance = null,

  _textStyle = 
    $.extend( {}, __TextStyle,
      params.style ),

  _textHoverStyle = 
    $.extend( {}, __TextHoverStyle,
      params.hoverStyle ),
  
  render = function(){
    _viewInstance = __canvas.text( _x, _y, _text );

    _viewInstance.attr( _textStyle );

    _viewInstance.mouseover( function( event )
    {
      var anim = Raphael.animation( 
        _textHoverStyle,
        100, '<>');

      _viewInstance.animate( anim );
    });

    _viewInstance.mouseout( function( event )
    {
      var anim = Raphael.animation( 
        _textStyle, 100, '<>');

      _viewInstance.animate( anim );
    });
  },

  lineObj = {};

  if( Object.defineProperties )
  {
    Object.defineProperties( lineObj,
    {
      viewInstance : { get : function(){ return _viewInstance; } },
      render : { get : function(){ return render; } }
    } );
    return lineObj;
  }
  
  lineObj = {
    get viewInstance(){ return _viewInstance; },
    get render(){ return render; }
  };

  return lineObj;
}
