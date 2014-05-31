(function()
{
  var identityMatrix = Matrix.Identity(),
      
      e1 = new Vector({ vector : [1, 0, 0] }),
      
      e2 = new Vector({ vector : [0, 1, 0] }),

      e3 = new Vector({ vector : [0, 0, 1] }),

      randomMatrix = new Matrix({ matrix : 
         [[ Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100 ],
          [ Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100 ],
          [ Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100 ]] }),

      randomVector = new Vector({ vector :
         [ Math.random() * 100,
           Math.random() * 100,
           Math.random() * 100] }),

      zeroVector = new Vector({ vector : [0, 0, 0] }),
      
      vector = new Vector({ vector : [-20, 0, 12] });

  var testSuites = {
    'identity act trivially on a vector' : function()
    {
      var newVector = identityMatrix.actOn(vector);

      ok( newVector.approxEq( vector ),
          'The indentity matrix should act trivially on a vector' );
    },

    'matrix action is additive' : function()
    {
      var newVector = randomMatrix.actOn( zeroVector );

      ok( newVector.isZero(),
          'A matrix acting on a zero vector should give\
           the zero vector' );
      
      newVector = randomMatrix.actOn( randomVector.add( vector ) );
      var v = randomMatrix.actOn( randomVector )
                 .add( randomMatrix.actOn( vector ) );
      
      ok( v.approxEq( newVector ),
          'A matrix acting on a sum is the sum of the actions' );
    },

    'matrix action respects scalar multiplication' :
    function()
    {
      var newVector = randomMatrix.actOn( randomVector.scale(5.045) ),
          v = randomMatrix.actOn( randomVector ).scale( 5.045 );

      ok( newVector.approxEq( v ),
          'Matrix multiplication commutes with scalar multiplication' );

      newVector = randomMatrix.actOn( randomVector.scale( -0.0145 ) );
      v = randomMatrix.actOn( randomVector ).scale( -0.0145 );

      ok( newVector.approxEq( v ),
          'Matrix multiplication commutes with scalar multiplication' );
    },

    // test for perpendicular projection
    'perpendicular projection to the coordinate axes' :
    function()
    {
      var perpProjMatrix = Matrix.PerpendicularProjection( e1 ),
          newVector = perpProjMatrix.actOn( vector );

      ok( newVector.approxEq( new Vector({ vector : [0, 0, 12]}) ),
          'Perpendicular projection to e1 should kill first entry');

      perpProjMatrix = Matrix.PerpendicularProjection( e2 );
      newVector = perpProjMatrix.actOn( vector );

      ok( newVector.approxEq( new Vector({ vector : [-20, 0, 12]}) ),
          'Perpendicular projection to e1 should kill second entry');

      perpProjMatrix = Matrix.PerpendicularProjection( e3 );
      newVector = perpProjMatrix.actOn( vector );
      ok( newVector.approxEq( new Vector({ vector : [-20, 0, 0]}) ),
          'Perpendicular projection to e1 should kill third entry');
    },

    'perpendicular projection to a vector v' :
    function()
    {
      var unit = randomVector.getUnit(),

      perpProjection = Matrix.PerpendicularProjection( unit ),
      newVector = perpProjection.actOn( vector );

      equal( Math.round10( newVector.dot( unit ), -10 ),
             0.0,
             'Perpendicular projection matrix acting on\
              a vector should be perpendicular to the unit' );
    },

    // test for projection
    // test for rotation matrix
  };


  for( title in testSuites )
  {
    test( '[Matrix]: ' + title, testSuites[ title ] );
  }
})();
