(function(){
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
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

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

function Matrix( params )
{
  var _matrix = params.matrix,

  actOn = function( vector )
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
  },

  getEntry = function( i, j )
  {
    return _matrix[i - 1][j - 1];
  },

  mult = function( matrix )
  {
    return new Matrix({
      matrix : [[ matrix.getEntry( 1, 1 ) * _matrix[0][0] +
                  matrix.getEntry( 2, 1 ) * _matrix[0][1] +
                  matrix.getEntry( 3, 1 ) * _matrix[0][2],

                  matrix.getEntry( 1, 2 ) * _matrix[0][0] +
                  matrix.getEntry( 2, 2 ) * _matrix[0][1] +
                  matrix.getEntry( 3, 2 ) * _matrix[0][2],

                  matrix.getEntry( 1, 3 ) * _matrix[0][0] +
                  matrix.getEntry( 2, 3 ) * _matrix[0][1] +
                  matrix.getEntry( 3, 3 ) * _matrix[0][2]],

                [ matrix.getEntry( 1, 1 ) * _matrix[1][0] +
                  matrix.getEntry( 2, 1 ) * _matrix[1][1] +
                  matrix.getEntry( 3, 1 ) * _matrix[1][2],

                  matrix.getEntry( 1, 2 ) * _matrix[1][0] +
                  matrix.getEntry( 2, 2 ) * _matrix[1][1] +
                  matrix.getEntry( 3, 2 ) * _matrix[1][2],

                  matrix.getEntry( 1, 3 ) * _matrix[1][0] +
                  matrix.getEntry( 2, 3 ) * _matrix[1][1] +
                  matrix.getEntry( 3, 3 ) * _matrix[1][2]],

                [ matrix.getEntry( 1, 1 ) * _matrix[2][0] +
                  matrix.getEntry( 2, 1 ) * _matrix[2][1] +
                  matrix.getEntry( 3, 1 ) * _matrix[2][2],

                  matrix.getEntry( 1, 2 ) * _matrix[2][0] +
                  matrix.getEntry( 2, 2 ) * _matrix[2][1] +
                  matrix.getEntry( 3, 2 ) * _matrix[2][2],

                  matrix.getEntry( 1, 3 ) * _matrix[2][0] +
                  matrix.getEntry( 2, 3 ) * _matrix[2][1] +
                  matrix.getEntry( 3, 3 ) * _matrix[2][2]]]
    });
  },

  transpose = function()
  {
    return new Matrix( {
       matrix : [[_matrix[0][0], _matrix[1][0], _matrix[2][0]],
                 [_matrix[0][1], _matrix[1][1], _matrix[2][1]],
                 [_matrix[0][1], _matrix[1][2], _matrix[2][2]]]
    } );
  }

  if( Object.defineProperties )
  {
    var matrixObj = {};
    Object.defineProperties( matrixObj, {
      actOn : { get : function(){ return actOn; } },
      transpose : { get : function(){ return transpose; } }
    } );
    return matrixObj;
  }

  return {
    get actOn(){ return actOn; },
    get transpose(){ return transpose; }
  };
}

(function( MatrixMethods )
{
  if( Object.defineProperties )
  {
    var staticMethods = {};
    for( methodName in MatrixMethods )
    {
      (function()
      {
        var method = MatrixMethods[methodName];
        staticMethods[methodName] = 
          { get : function(){ return method; } }
      })();
    }

    Object.defineProperties( Matrix, staticMethods );
  }
  else
    for( methodName in MatrixMethods )
      Matrix[methodName] = MatrixMethods[methodName];
})({
  Identity: function()
  {
    return new Matrix({ matrix: [[1, 0, 0],
                                 [0, 1, 0],
                                 [0, 0, 1]] });
  },

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



    rows = [[ 1 - u11, -u12, -u13 ],
            [ -u12, 1 - u22, -u23 ],
            [ -u13, -u23, 1 - u33 ]];
    return new Matrix({ matrix: rows });
  },

  XRotation : function( angle )
  {
    var c = Math.cos( angle ),
        s = Math.sin( angle );

    return new Matrix({ matrix : [[ 1, 0,  0],
                                  [ 0, c, -s],
                                  [ 0, s,  c]] });
  },
  
  YRotation : function( angle )
  {
    var c = Math.cos( angle ),
        s = Math.sin( angle );

    return new Matrix({ matrix : [[ c, 0, -s],
                                  [ 0, 1,  0],
                                  [ s, 0,  c]] });

  },

  ZRotation : function( angle )
  {
    var c = Math.cos( angle ),
        s = Math.sin( angle );

    return new Matrix({ matrix : [[ c, -s, 0],
                                  [ s,  c, 0],
                                  [ 0, 0,  1]] });
  },

  YZRotation : function( yAngle, zAngle )
  {
    var cy = Math.cos( yAngle ),
        sy = Math.sin( yAngle ),
        cz = Math.cos( zAngle ),
        sz = Math.sin( zAngle ),

    rows = [[cy * cz, -sz, -sy * cz],
            [cy * sz,  cz, -sy * sz],
            [     sy,   0,       cy]];
    return new Matrix( { matrix: rows } );
  },
  
  Rotation : function( vector, angle )
  {
    var azimuth = vector.azimuthAngle,
        elevation = vector.elevationAngle,
        c = Math.cos( angle ),
        s = Math.sin( angle );

        return Matrix.YZRotation( elevation, azimuth )
           .mult( new Matrix({ 
             matrix : [[ 1, 0,  0],
                       [ 0, c, -s],
                       [ 0, s,  c]] } ) )
           .mult( Matrix.YZRotation( -elevation, -azimuth ) );
    
  }
})

/**
 * @convention: everything is rounded at 10 precisions.
 *
 */
function Vector( params )
{
  var _vector = params.vector.slice(0),
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
    return Math.round10(_length, -10);
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
    return Math.round10(_length, -10) == 0.0;
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
      vector : [ index(1) * scalar,
                 index(2) * scalar,
                 index(3) * scalar ]
    } );
  },

  add = function( vector )
  {
    return new Vector( { 
      vector : [ index(1) + vector.index(1),
                 index(2) + vector.index(2),
                 index(3) + vector.index(3) ]
    } );
  },

  /// ops
  dot = function( vector )
  {
    return Math.round10( index(1) * vector.index(1) +
                         index(2) * vector.index(2) +
                         index(3) * vector.index(3), -10);
  },

  approxEq = function( vector )
  {
    return Math.round10( index(1) - vector.index(1), -10 ) == 0.0 &&
           Math.round10( index(2) - vector.index(2), -10 ) == 0.0 &&
           Math.round10( index(3) - vector.index(3), -10 ) == 0.0;
  },

  cross = function( vector )
  {
    var i1 = index(1), i2 = index(2), i3 = index(3),
        v1 = vector.index(1), v2 = vector.index(2), v3 = vector.index(3);

    return new Vector( {
      vector : [ i2 * v3 - i3 * v2,
                 i3 * v1 - i1 * v3,
                 i1 * v2 - i2 * v1 ]
      } );
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
      dot : { get : function(){ return dot; } },
      approxEq : { get : function(){ return approxEq; } },
      cross : { get : function(){ return cross; } },
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
    get dot(){ return dot; },
    get approxEq(){ return approxEq; },
    get cross(){ return cross; }
  };
}
