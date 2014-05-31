(function()
{
  // prepare
  var random_vector_arr = [Math.floor(Math.random() * 10), 
                           Math.floor(Math.random() * 10),
                           Math.floor(Math.random() * 10)],

      zero_vector = new Vector({ vector : [0, 0, 0] }),

      very_small_vector = new Vector({ vector : [0.00000000000001, 
                                                 0.00000000000001, 
                                                 0.00000000000001] }),

      random_vector = new Vector({ vector: random_vector_arr }),
      
      e1 = new Vector( { vector : [1, 0, 0]} ),
      e2 = new Vector( { vector : [0, 1, 0]} ),
      e3 = new Vector( { vector : [0, 0, 1]} ),
      fixed_vector = new Vector( { vector : [4, -12.64, 0] } );

  var testSuites = {
    'vector index test' : function()
    {
      equal( random_vector_arr[0],
             random_vector.index(1),
             'The first entry of random_vector should be ' +
             String( random_vector_arr[0] ) + '.' );

      equal( random_vector_arr[1],
             random_vector.index(2),
             'The second entry of random_vector should be ' +
             String( random_vector_arr[1] ) + '.' );

      equal( random_vector_arr[2],
             random_vector.index(3),
             'The third entry of random_vector should be ' +
             String( random_vector_arr[2] ) + '.' );
    },

    'vector index test2' : function()
    {
      equal( fixed_vector.index(1), 
             4, 
             'The index of the fixed vector should be 4' );

      equal( fixed_vector.index(2), 
             -12.64, 
             'The index of the fixed vector should be 4' );

      equal( fixed_vector.index(3), 
             0, 
             'The index of the fixed vector should be 4' );
    },

    'zero vector length' : function()
    {
      // check the 
      equal( zero_vector.length, 
             0, 
             'The length of a zero vector should be 0.' );
      
    },

    'zero vector isZero' : function()
    {
      ok( zero_vector.isZero(),
          'isZero should report that a zero vector is zero' );
    },

    'zero vector should have no angle' : function()
    {
      ok( isNaN( zero_vector.azimuthAngle ) &&
          isNaN( zero_vector.elevationAngle ),
             'Both the azimuth and elevation angles should not numbers.' );
    },

    'small vector not zero' : function()
    {
      ok( !very_small_vector.isZero(),
          'A very small vector should not be zero' );
    },

    'scaling a vector by -1 generates additive inverse' : function()
    {
      var add_inverse = random_vector.scale( -1 );

      sum_vector = add_inverse.add( random_vector );

      ok( sum_vector.isZero(),
          'A vector and its -1 scale should sum to zero.' );
    },

    'dotting a vector with itself should return the square of its length' :
    function()
    {
      var length_square = random_vector.dot( random_vector );
      equal( Math.sqrt(length_square),
             random_vector.length,
             'Dotting a vector with itself should return the square of its length' );
    },

    'parallel vectors should cross to zero' : function()
    {
      var parallel_vector = random_vector.scale( 12 ),
          vector = random_vector.cross( random_vector );

      ok( vector.isZero(),
          'The cross product of the same vector should be 0' );

      vector = random_vector.cross( parallel_vector );

      ok( vector.isZero(),
          'The cross product of the same vector should be 0' );
    },

    'the cross-product of coordinate axes' : function()
    {
      var expect_e3 = e1.cross( e2 ),
          expect_e1 = e2.cross( e3 ),
          expect_e2 = e3.cross( e1 );

      ok( expect_e3.index(1) == 0 &&
          expect_e3.index(2) == 0 &&
          expect_e3.index(3) == 1,
          'The cross product of e1 and e2 should be e3' );

      ok( expect_e1.index(1) == 1 &&
          expect_e1.index(2) == 0 &&
          expect_e1.index(3) == 0,
          'The cross product of e2 and e3 should be e1' );

      ok( expect_e2.index(1) == 0 &&
          expect_e2.index(2) == 1 &&
          expect_e2.index(3) == 0,
          'The cross product of e3 and e1 should be e2' );
    },

    'cross product is anti-symmetric' : function()
    {
      var cross_product = random_vector.cross( fixed_vector ),
          opposite_cross_product = fixed_vector.cross( random_vector );

      ok( cross_product.add(opposite_cross_product).isZero(),
          'Cross product in one and opposite order should produce vectors\
           of opposite direction' );
    },

    'crossing with e1 eliminates e1' : function()
    {
      var cross_product = random_vector.cross( e1 );
    }

  };

  for( title in testSuites )
  {
    test( title, testSuites[ title ] );
  }
})();
