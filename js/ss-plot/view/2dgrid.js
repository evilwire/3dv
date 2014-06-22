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
      right = bbox.get('width'),
      bottom = bbox.get('height');

      xTicSize = this.model.get('haxis').get('scale').get('ticSize'),
      xoffset = this.model.get('haxis').get('range').get('offset'),
      yTicSize = this.model.get('vaxis').get('scale').get('ticSize'),
      yoffset = this.model.get('vaxis').get('range').get('offset'),

      xratio = xoffset / xTicSize,
      xleadTics = Math.floor( xratio ),
      xStartingPoint = 
        xTicSize - parseInt( ( xratio - xleadTics ) * xTicSize ),

      yratio = yoffset / yTicSize,
      yleadTics = Math.floor( xratio ),
      yStartingPoint = 
        yTicSize - parseInt( ( yratio - yleadTics ) * yTicSize );


      for( var x = xStartingPoint; 
               x < right; 
               x += xTicSize )
      {
        var vLine = this.paper.path( lineTemplate( {
              x1 : x,
              y1 : 0,
              x2 : x,
              y2 : bottom
            } ) );

        $( vLine.node ).attr( 'class', 'grid vline' );
        this.svg.push( vLine );
      }

      for( var y = bottom - yStartingPoint; 
               y > 0; 
               y -= yTicSize )
      {
        var hLine =
          this.paper.path( lineTemplate( {
              x1 : 0,
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
