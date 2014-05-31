(function()
{
  // prepare
  var randomVectorArr = [Math.floor(Math.random() * 10), 
                           Math.floor(Math.random() * 10),
                           Math.floor(Math.random() * 10)],

      zeroVector = new Vector({ vector : [0, 0, 0] }),

      verySmallVector = new Vector({ vector : [0.00001, 
                                                 0.00001, 
                                                 0.00001] }),

      randomVector = new Vector({ vector: randomVectorArr }),
      
      e1 = new Vector( { vector : [1, 0, 0]} ),
      e2 = new Vector( { vector : [0, 1, 0]} ),
      e3 = new Vector( { vector : [0, 0, 1]} ),
      fixedVector = new Vector( { vector : [4, -12.64, 0] } );

  var testSuites = {
    /// TESTING METHOD CORRECTNESS
    'vector index test' : function()
    {
      equal( randomVectorArr[0],
             randomVector.index(1),
             'The first entry of randomVector should be ' +
             String( randomVectorArr[0] ) + '.' );

      equal( randomVectorArr[1],
             randomVector.index(2),
             'The second entry of randomVector should be ' +
             String( randomVectorArr[1] ) + '.' );

      equal( randomVectorArr[2],
             randomVector.index(3),
             'The third entry of randomVector should be ' +
             String( randomVectorArr[2] ) + '.' );
    },

    'vector index test2' : function()
    {
      equal( fixedVector.index(1), 
             4, 
             'The index of the fixed vector should be 4' );

      equal( fixedVector.index(2), 
             -12.64, 
             'The index of the fixed vector should be 4' );

      equal( fixedVector.index(3), 
             0, 
             'The index of the fixed vector should be 4' );
    },

    'basic scaling test' : function()
    {
      var fixedVectorScaled = fixedVector.scale( 32.6772 );
      equal( fixedVectorScaled.index(1),
             32.6772 * fixedVector.index(1),
             'After scaling by constant, each component should be exactly\
              the constant times the original');

      equal( fixedVectorScaled.index(2),
             32.6772 * fixedVector.index(2),
             'After scaling by constant, each component should be exactly\
              the constant times the original');

      equal( fixedVectorScaled.index(3),
             32.6772 * fixedVector.index(3),
             'After scaling by constant, each component should be exactly\
              the constant times the original');

      fixedVectorScaled = fixedVector.scale( -1 );
      equal( fixedVectorScaled.index(1),
             -fixedVector.index(1),
             'After scaling by constant, each component should be exactly\
              the constant times the original');

      equal( fixedVectorScaled.index(2),
             -fixedVector.index(2),
             'After scaling by constant, each component should be exactly\
              the constant times the original');

      equal( fixedVectorScaled.index(3),
             -fixedVector.index(3),
             'After scaling by constant, each component should be exactly\
              the constant times the original');
    },

    'zero scaling test' : function()
    {
      var scaledVector = randomVector.scale( 0 );

      ok( scaledVector.isZero(),
          'A vector scaled by zero should be the zero vector' );
    },

    'basic vector addition test' : function()
    {
      var sum = randomVector.add( fixedVector );

      equal( sum.index(1),
             randomVector.index(1) +
             fixedVector.index(1),
             'The first component of the sum should be the sum of \
             the first components' );

      equal( sum.index(2),
             randomVector.index(2) +
             fixedVector.index(2),
             'The second component of the sum should be the sum of \
             the second components' );

      equal( sum.index(3),
             randomVector.index(3) +
             fixedVector.index(3),
             'The third component of the sum should be the sum of \
             the third components' );
    },

    'distributive test' : function()
    {
      var scaleFactor = Math.round( Math.random() * 1000 ),
          sum = randomVector.add( fixedVector ).scale( scaleFactor ),
          distribute = randomVector.scale( scaleFactor)
            .add( fixedVector.scale( scaleFactor ) );

      ok( sum.approxEq( distribute ),
          'Sums should distribute over scalar multiplication.' );

    },

    'azimuth and elevation angle should not change from scaling' :
    function()
    {
      var randomVectorScaled = randomVector.scale(3.491);

      if( !isNaN( randomVector.azimuthAngle ) )
        equal( Math.round10( randomVectorScaled.azimuthAngle, -10),
               Math.round10( randomVector.azimuthAngle, -10),
               'The azimuth angle should not change from scaling' );
      else
        ok( isNaN( randomVectorScaled.azimuthAngle ),
            'The azimuth angle should not change from scaling' );
      
      if( !isNaN( randomVector.elevationAngle ) )
        equal( Math.round10( randomVectorScaled.elevationAngle, -10),
               Math.round10( randomVector.elevationAngle, -10),
               'The elevation angle should not change from scaling' );
      else
        ok( isNaN( randomVectorScaled.elevationAngle ),
           'The elevation angle should not change from scaling' );
    },

    'zero vector length' : function()
    {
      equal( zeroVector.length, 
             0, 
             'The length of a zero vector should be 0.' );
    },

    'zero vector isZero' : function()
    {
      ok( zeroVector.isZero(),
          'isZero should report that a zero vector is zero' );
    },

    'zero vector should have no angle' : function()
    {
      ok( isNaN( zeroVector.azimuthAngle ) &&
          isNaN( zeroVector.elevationAngle ),
             'Both the azimuth and elevation angles should not numbers.' );
    },

    'small vector not zero' : function()
    {
      ok( !verySmallVector.isZero(),
          'A very small vector should not be zero' );
    },

    'scaling a vector by -1 generates additive inverse' : function()
    {
      var addInverse = randomVector.scale( -1 );

      sumVector = addInverse.add( randomVector );

      ok( sumVector.isZero(),
          'A vector and its -1 scale should sum to zero.' );
    },

    'dotting a vector with itself should return the square of its length' :
    function()
    {
      var lengthSquare = randomVector.dot( randomVector );
      equal( Math.round10( Math.sqrt(lengthSquare), -10),
             randomVector.length,
             'Dotting a vector with itself should return the square of its length' );
    },

    'parallel vectors should cross to zero' : function()
    {
      var parallelVector = randomVector.scale( 12 ),
          vector = randomVector.cross( randomVector );

      ok( vector.isZero(),
          'The cross product of the same vector should be 0' );

      vector = randomVector.cross( parallelVector );

      ok( vector.isZero(),
          'The cross product of the same vector should be 0' );
    },

    'the cross-product of coordinate axes' : function()
    {
      var expectE3 = e1.cross( e2 ),
          expectE1 = e2.cross( e3 ),
          expectE2 = e3.cross( e1 );

      ok( expectE3.index(1) == 0 &&
          expectE3.index(2) == 0 &&
          expectE3.index(3) == 1,
          'The cross product of e1 and e2 should be e3' );

      ok( expectE1.index(1) == 1 &&
          expectE1.index(2) == 0 &&
          expectE1.index(3) == 0,
          'The cross product of e2 and e3 should be e1' );

      ok( expectE2.index(1) == 0 &&
          expectE2.index(2) == 1 &&
          expectE2.index(3) == 0,
          'The cross product of e3 and e1 should be e2' );
    },

    'cross product is anti-symmetric' : function()
    {
      var crossProduct = randomVector.cross( fixedVector ),
          oppositeCrossProduct = fixedVector.cross( randomVector );

      ok( crossProduct.add(oppositeCrossProduct).isZero(),
          'Cross product in one and opposite order should produce vectors\
           of opposite direction' );
    },

    'crossing with e_i should eliminate e_i' : function()
    {
      var crossProduct = randomVector.cross( e1 );

      equal( crossProduct.index(1),
             0,
             'Crossing with e1 should eliminate e1' );

      crossProduct = randomVector.cross( e2 );
      equal( crossProduct.index(2),
             0,
             'Crossing with e2 should eliminate e2' );

      crossProduct = randomVector.cross( e3 );
      equal( crossProduct.index(3),
             0,
             'Crossing with e2 should eliminate e2' );
    },

    'crossing with a vector should be perpendicular to that vector' :
    function()
    {
      var crossProduct = randomVector.cross( fixedVector );
      equal( crossProduct.dot( randomVector ),
             0,
             'A vector should be orthogonal to its cross\
              product with another vector' );

      equal( crossProduct.dot( fixedVector ),
             0,
             'A vector should be orthogonal to its cross\
              product with another vector' );
    },

    'a unit vector is actually of length 1' : function()
    {
      var unitVector = randomVector.getUnit();

      equal( unitVector.length,
             1,
             'The length of the unit vector should be about 1' );
    },

    'scaling a unit vector associated to a vector by the vector\'s length' :
    function()
    {
      var unitVector = randomVector.getUnit(),
          length = randomVector.length,
          negRandomVector = unitVector.scale( -length );
      
      ok( negRandomVector.add( randomVector ).isZero(),
          'Scaling v/|v| by |v| should give us v.' );
    },

    /// BOUNDARY TESTS
    'the azimuth angle of e1' : function()
    {
      equal( e1.azimuthAngle,
             0.0,
             'The azimuth angle of e1 should be 0' );
    },

    'the elevation angle of e3' : function()
    {
      equal( e3.elevationAngle,
             Math.PI/2,
             'The elevation angle of e3 should be PI/2' );
    },

    'the elevation angle of negative of e3' : function()
    {
      var negE3 = e3.scale( -1 );
      equal( negE3.elevationAngle,
             -Math.PI/2,
             'The elevation angle of -e3 should be -PI/2' );
    },

    'the azimuth angle of -e1' : function()
    {
      var negE1 = e1.scale( -1 );
      equal( negE1.azimuthAngle,
             Math.PI,
             'The azimuth angle of -e1 should be PI' );
    },

    /// IMPLEMENTATION TESTS
    'data structures should be encapsulated' :
    function()
    {
      randomVectorArr[2] = -4;
      notEqual( randomVector.index(3),
                -4,
                'Changing a defining vector should not change the vector value' );
    },

    'data structure should not be mutable' :
    function()
    {
      randomVector.azimuthAngle = 2 * Math.PI;
      notEqual( randomVector.azimuthAngle,
                2 * Math.PI,
                'Should not be able to change the azimuth angle' );

      randomVector.elevationAngle = 2 * Math.PI;
      notEqual( randomVector.elevationAngle,
                2 * Math.PI,
                'Should not be able to change the elevation angle' );

    }
  }; 

  for( title in testSuites )
  {
    test( '[Vector]: ' + title, testSuites[ title ] );
  }
})();
