(function( Raphael )
{
  var XYPlot = SSPlot.View.XYPlot = 
  SSPlot.SVGView.extend({
    initialize : function()
    {
      this.model.on('change', function( event )
      {
        this.render();
      }
    },

    render : function()
    {
      // draw the axes
    }
  });
})( Raphael );
