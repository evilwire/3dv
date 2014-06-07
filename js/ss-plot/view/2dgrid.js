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
      xoffset = this.model.get('haxis').get('range').get('offset'),
      yTicSize = this.model.get('vaxis').get('scale').get('ticSize'),
      yoffset = this.model.get('vaxis').get('range').get('offset');

      for( var x = left + xoffset; 
               x < right; 
               x += xTicSize )
      {
        var vLine = this.paper.path( lineTemplate( {
              x1 : x,
              y1 : top,
              x2 : x,
              y2 : bottom
            } ) );

        $( vLine.node ).attr( 'class', 'grid vline' );
        this.svg.push( vLine );
      }

      for( var y = bottom - yoffset; 
               y > top; 
               y -= yTicSize )
      {
        var hLine =
          this.paper.path( lineTemplate( {
              x1 : left,
              y1 : y,
              x2 : right,
              y2 : y, 
            } ) );

        $( hLine.node ).attr( 'class', 'grid hline' );
        this.svg.push( hLine );
      }
    } 
  });
})( Raphael, _ )
