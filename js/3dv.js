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

}

function Matrix( params )
{
  var _matrix = params.matrix;

  var mult = function( vector )
  {
    var row = [_matrix[0][0] * vector.index(1) +
               _matrix[0][1] * vector.index(2) +
               _matrix[0][2] * vector.index(3),

               _matrix[1][0] * vector.index(1) +
               _matrix[1][1] * vector.index(2) +
               _matrix[1][2] * vector.index(3),

               _matrix[2][0] * vector.index(1) +
               _matrix[2][1] * vector.index(2) +
               _matrix[2][2] * vector.index(3)];
    return new Vector({ vector : row });
  }
}

(function( MatrixMethods )
{
  if( Object.defineProperties )
  {

  }
  else
  {
  }
})({
  Projection : function( unitVector )
  {
    var u1 = unitVector.index(1),
        u2 = unitVector.index(2),
        u3 = unitVector.index(3),
        u11 = u1 * u1, u12 = u1 * u2, u13 = u1 * u3,
        u22 = u2 * u2, u23 = u2 * u3, u33 = u3 * u3,

    rows = [[ u11, u12, u13 ],
            [ u12, u22, u23 ],
            [ u13, u23, u33 ]];
    return new Matrix({ matrix: rows });
  },

  PerpendicularProjection : function( unitVector )
  {
    var u1 = unitVector.index(1),
        u2 = unitVector.index(2),
        u3 = unitVector.index(3),
        u11 = u1 * u1, u12 = u1 * u2, u13 = u1 * u3,
        u22 = u2 * u2, u23 = u2 * u3, u33 = u3 * u3,

    rows = [[ 1 - u11, u12, u13 ],
            [ u12, 1 - u22, u23 ],
            [ u13, u23, 1 - u33 ]];
    return new Matrix({ matrix: rows });
  },

  YZRotation : function( yAngle, zAngle )
  {
    var cy = Math.cos( yAngle ),
        sy = Math.sin( yAngle ),
        cz = Math.cos( zAngle ),
        sz = Math.sin( zAngle ),

    rows = [[cy * cz, -sz, -sy * cz],
            [cy * sz,  cz, -sy * sz],
            [sy     ,   0, cz      ]];
    return new Matrix( { matrix: rows } );
  },
  
  Rotation : function( vector, angle )
  {

  }
})

function Vector( params )
{
  var _vector = params.vector,
      _length = Math.sqrt( _vector[0] * _vector[0] +
                           _vector[1] * _vector[1] +
                           _vector[2] * _vector[2] ),
      _xyLength = Math.sqrt( _vector[0] * _vector[0] +
                             _vector[1] * _vector[1] ),
      _azimuth,
      _elevation;

  /// accessors
  var index = function( index )
  {
    if( --index < 0 || index > 2 ) return false;

    return _vector[index];
  },

  length = function()
  {
    return _length;
  },

  azimuthAngle = function()
  {
    if( _azimuth !== undefined )
      return _azimuth;

    var cr = _vector[0] / _xyLength,
        sr = _vector[1] / _xyLength;

    if( isNaN(cr) || cr > 1 || cr < -1 )
      return NaN;

    _azimuth = Math.acos( cr );
    if( Math.asin( sr ) < 0 )
      _azimuth = 2 * Math.PI - _azimuth;

    return _azimuth;
  },

  elevationAngle = function()
  {
    if( _elevation !== undefined )
      return _elevation;

    return _elevation = Math.asin( _vector[2] / _length );
  },

  isZero = function()
  {
    return _length === 0;
  },

  getUnit = function()
  {
    if( isZero() ) return false;

    return scale( 1 / _length );
  },

  /// generators
  scale = function( scalar )
  {
    return new Vector( {
      vector : [ this.index(1) * scalar,
                 this.index(2) * scalar,
                 this.index(3) * scalar ]
    } );
  },

  add = function( vector )
  {
    return new Vector( { 
      vector : [ this.index(1) + vector.index(1),
                 this.index(2) + vector.index(2),
                 this.index(3) + vector.index(3) ]
    } );
  },

  /// ops
  dot = function( vector )
  {
    return this.index(1) * vector.index(1) +
           this.index(2) * vector.index(2) +
           this.index(3) * vector.index(3);
  };

  if( Object.defineProperties )
  {
    var vectorObj = {};
    Object.defineProperties( vectorObj,
    {
      index : { get : function(){ return index; } },
      length : { get : length },
      azimuthAngle : { get : azimuthAngle },
      elevationAngle : { get : elevationAngle },
      isZero : { get : function(){ return isZero; } },
      getUnit : { get : function(){ return getUnit; } },
      scale : { get : function(){ return scale; } },
      add : { get : function(){ return add; } },
      dot : { get : function(){ return dot; } }
    } );
    return vectorObj;
  }

  return {
    get index(){ return index; },
    get length(){ return _length },
    get azimuthAngle() { return azimuthAngle(); },
    get elevationAngle() { return elevationAngle(); },
    get isZero() { return isZero() },
    get getUnit() { return getUnit() },
    get scale(){ return scale; },
    get add(){ return add; },
    get dot(){ return dot; }
  };
}

function Renderer( params )
{

}

$(document).ready( function( event )
{
   var canvas = $('.canvas')[0],
       paper = Raphael(canvas, '100%', '100%' );

   triangle = paper.path('M10 10 L100 100L190 10Z');
   triangle.attr( { 
     stroke : 'transparent', 
     fill   : '#000', 
     'fill-opacity': '.3' 
   } );

   var vector = new Vector({ vector: [1, 2, 1] });
   console.log( vector.azimuthAngle );

} );
