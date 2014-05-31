(function()
{
  var identityMatrix = Matrix.Identity(),
      
      vector = new Vector({ vector: [1, 2, 3] });

  var testSuites = {
    'identity act trivially on a vector' : function()
    {
      var newVector = identityMatrix.actOn(vector);
      //console.log( newVector );

      ok( newVector.approxEq( vector ),
          'The indentity matrix should act trivially on a vector' );
    }
  }

  for( title in testSuites )
  {
    test( '[Matrix]: ' + title, testSuites[ title ] );
  }
})();
