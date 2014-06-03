(function( Raphael )
{
  var XYAxis = SSPlot.View.XYAxis = 
  SSPlot.SVGView.extend( {
    events : {

    },

    initialize : function()
    {
      // redraw when the axis update
      this.model.on( 'change', function()
      {
      } );
    },

    render : function()
    {
    },
  } );

})( Raphael )
