(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]);

  var xRange = new SSPlot.Model.Range({ }), 

  xScale = new SSPlot.Model.Range({ }),

  xAxis = new SSPlot.Model.Axis({
    scale : xScale,
    range : xRange
  });

  xScale.on( 'change', function( event )
  {
    console.log( event );
  } );

  xScale.set({ type : 'relative' });

  xAxisView = new SSPlot.View.XYAxis({
    canvas : paper,
    model : xAxis

  });


});

})();
