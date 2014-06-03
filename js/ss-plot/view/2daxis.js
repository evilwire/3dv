(function( Raphael )
{
  var XYAxis = SSPlot.View.XYAxis = 
  SSPlot.SVGView.extend( {
    events : {

    },

    initialize : function()
    {
      console.log( this.model );
    },

    render : function()
    {
    },
  } );

  console.log( SSPlot.View );
})( Raphael )
