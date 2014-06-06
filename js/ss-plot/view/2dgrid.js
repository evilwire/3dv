(function( Raphael, _ )
{
  var lineTemplate = 
    _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  XYGrid = SSPlot.View.XYGrid =
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
      right = bbox.get('left') + bbox.get('width'),
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

      for( var y = bottom; 
               y > top; 
               y -= yTicSize )
      {
        this.svg.push(
          this.paper.path( lineTemplate( {
              x1 : left,
              y1 : y - 10,
              x2 : right,
              y2 : y - 10, 
            } ) )
          .attr({ stroke : '#fff' } ) );
      }

    } 
  });

})( Raphael, _ )
