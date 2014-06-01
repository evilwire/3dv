var __PointMouseOverStyle = {
  r : 10,
  fill : '#3ae'
},

__PointStyle = {
  r : 4,
  'stroke-width': 0,
  fill: '#555'
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
  _radius = __PointStyle.r,
  _viewInstance = null,
  pointObj = {},

  render = function(){
    console.log( _x );
    console.log( _y );

    _viewInstance = 
      __canvas.circle( _x, _y, _radius );
    _viewInstance.attr( __PointStyle );
    
    _viewInstance.mouseover( function( event )
    {
      var anim = Raphael.animation( 
        __PointMouseOverStyle,
        100, '<>');

      _viewInstance.animate( anim );
    });

    _viewInstance.mouseout( function( event )
    {
      var anim = Raphael.animation( 
        __PointStyle, 100, '<>');

      _viewInstance.animate( anim );
    });
  };
  
  if( Object.defineProperties )
  {
    Object.defineProperties( pointObj,
    {
      viewInstance : { get : function(){ return _viewInstance; } },
      render : { get : function(){ return render; } }
    } );
    return pointObj;
  }
  
  pointObj = {
    get viewInstance(){ return _viewInstance; },
    get render(){ return render; }
  };
  return pointObj;
}
