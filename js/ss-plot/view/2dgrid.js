(function( Raphael, _ )
{
  var XYGrid = SSPlot.View.XYGrid =
  SSPlot.SVGView.extend( {
    initialize : function()
    {
      var _this = this;

      // redraw when the axis update
      this.model.on( 'change', 
        function( event )
        {
          _this.render();
        });
    },

    render : function()
    {
      // get the type of axis it is
      var bbox = this.model.get('bbox'),

      // draw grid lines
      left = bbox.get('left'),
      top = bbox.get('top'),
      right = bbox.get('left') + bbox.get('right'),
      bottom = bbox.get('top') + bbox.get('height');

      xTicSize = this.model.get('haxis').get('scale').get('ticSize'),
      yTicSize = this.model.get('vaxis').get('scale').get('ticSize');

      for( var x = left; 
               x < right; 
               x += xTicSize )
      {
        this.svg.push(
          this.paper.path( lineTemplate( {
              x1 : x + 10,
              y1 : top,
              x2 : x + 10,
              y2 : bottom
            } ) )
          .attr({ stroke : '#fff' } ) );
      }

    } 
  });

})( Raphael, _ )
