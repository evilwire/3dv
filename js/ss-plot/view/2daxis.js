(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  HAxis = SSPlot.View.HAxis = 
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
    },
  } ),

  VAxis = SSPlot.View.VAxis =
  SSPlot.SVGView.extend( {
    events : {

    },

    initialize : function()
    {
    },

    render : function()
    {
    }
  } );

})( Raphael, _ )
