(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>');

      renderMethods = {
    'horizontal' : function()
    {
      var midpoint =  this.get('midpoint'),
          size = this.get('size'),
          left = midpoint.x - size / 2,
          right = midpoint.x + size / 2;
      
      pathStr = lineTemplate({
        x1 : left,
        y1 : midpoint.y,
        x2 : right,
        y2 : midpoint.y
      });

      this.svg.push( 
        this.paper.path( pathStr )
      );
    }
  },

      XYAxis = SSPlot.View.XYAxis = 
  SSPlot.SVGView.extend( {
    events : {

    },

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
      var type = this.model.get('type');

      renderMethods[ type ].call( this );
    },
  } );

})( Raphael, _ )
