(function( Raphael, _ )
{
  var dataClass = ['data'],

  XYData = SSPlot.View.Data =
  SSPlot.SVGView.extend( {
    render : function( classList, style )
    {
      classList = classList || dataClass;
    }
  } );
})( Raphael, _ );
