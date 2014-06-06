(function( Raphael )
{
  var XYPlot = SSPlot.View.XYPlot = 
  SSPlot.SVGView.extend({
    initialize : function()
    {
      this.model.on('change', function( event )
      {
        this.render();
      } );

      var xAxisView = new SSPlot.View.HAxis({
        paper : this.paper,
        model : this.model,
      });

      var yAxisView = new SSPlot.View.VAxis({
        paper : this.paper,
        model : this.model,
      });

      var xyGrid = new SSPlot.View.XYGrid({
        model : this.model,
        paper : this.paper
      });

      Object.defineProperties( this, {
        xaxis : {
          get : function(){ return xAxisView; }
        },

        yaxis : {
          get : function(){ return yAxisView; }
        },

        grid : {
          get : function(){ return xyGrid; }
        }
      });
    },

    render : function()
    {
      // draw the axes
      this.xaxis.render();
      this.yaxis.render();
      this.grid.render();
    }
  });

})( Raphael );
