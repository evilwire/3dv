(function()
{
  var testSuites = {
    'hello world test' : function()
    {
      equal( 1, 1, 'Passed!' );
    }
  }

  for( title in testSuites )
  {
    test( '[Matrix]: ' + title, testSuites[ title ] );
  }
})();
