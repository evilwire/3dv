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
    var m11 = _matrix[0][0], m12 = _matrix[0][1], m13 = _matrix[0][2],
        m21 = _matrix[1][0], m22 = _matrix[1][1], m23 = _matrix[1][2],
        m31 = _matrix[2][0], m32 = _matrix[2][1], m33 = _matrix[2][2],

        n11 = matrix.getEntry(1, 1), n12 = matrix.getEntry(1, 2), 
          n13 = matrix.getEntry(1, 3),
        n21 = matrix.getEntry(2, 1), n22 = matrix.getEntry(2, 2), 
          n23 = matrix.getEntry(2, 3),
        n31 = matrix.getEntry(3, 1), n32 = matrix.getEntry(3, 2),
          n33 = matrix.getEntry(3, 3);

    return new Matrix({
      matrix : [[ (m11 * n11) + (m12 * n21) + (m13 * n31),
                  (m11 * n12) + (m12 * n22) + (m13 * n32),
                  (m11 * n13) + (m12 * n23) + (m13 * n33)],
                [ (m21 * n11) + (m22 * n21) + (m23 * n31),
                  (m21 * n12) + (m22 * n22) + (m23 * n32),
                  (m21 * n13) + (m22 * n23) + (m23 * n33)],
                [ (m31 * n11) + (m32 * n21) + (m33 * n31),
                  (m31 * n12) + (m32 * n22) + (m33 * n32),
                  (m31 * n13) + (m32 * n23) + (m33 * n33)]] });
  },

  transpose = function()
  {
    return new Matrix( {
       matrix : [[_matrix[0][0], _matrix[1][0], _matrix[2][0]],
                 [_matrix[0][1], _matrix[1][1], _matrix[2][1]],
                 [_matrix[0][1], _matrix[1][2], _matrix[2][2]]]
    } );
  }

  var matrixObj = {};
  Object.defineProperties( matrixObj, {
    actOn : { get : function(){ return actOn; } },
    transpose : { get : function(){ return transpose; } }
  } );
  return matrixObj;
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

  /*
   * @convention: Orientation is ccw
   */
  XRotation : function( angle )
  {
    var c = Math.cos( angle ),
        s = Math.sin( angle );

    return new Matrix({ matrix : [[ 1, 0,  0],
                                  [ 0, c, -s],
                                  [ 0, s,  c]] });
  },
  
  /*
   * @convention: Orientation is ccw
   */
  YRotation : function( angle )
  {
    var c = Math.cos( angle ),
        s = Math.sin( angle );

    return new Matrix({ matrix : [[ c, 0, -s],
                                  [ 0, 1,  0],
                                  [ s, 0,  c]] });
  },
  
  /*
   * @convention: Orientation is ccw
   */
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
});

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
