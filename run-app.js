(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0], '100%', '100%'),
  xRange = new SSPlot.Model.Range({
    offset : 200
  }), 
  xScale = new SSPlot.Model.Scale({ }),
  xAxis = new SSPlot.Model.Axis({
    scale : xScale,
    range : xRange,
    label : 'p',
  }),

  yRange = new SSPlot.Model.Range({ }), 
  yScale = new SSPlot.Model.Scale({ }),
  yAxis = new SSPlot.Model.Axis({
    scale : yScale,
    range : yRange,
    label : 'q',
  }),

  bBox = new SSPlot.Model.BBox({
    left : 100,
    top : 40,
    height: 540,
    width: 800
  }),
  data = new SSPlot.Collection.XYDataCollection(),

  xyPlot = new SSPlot.Model.XYPlot({
    haxis : xAxis,
    vaxis : yAxis,
    bbox : bBox,
    data : data,
  });

  data.add(new SSPlot.Model.XYData({ x: 3, y: 4 }));
  data.add(new SSPlot.Model.XYData({ x: 39, y: 25 }));

  var xyPlotView = new SSPlot.View.XYPlot({
    paper : paper,
    model : xyPlot
  });
  xyPlot.getInitialValues();

  $( document ).on('select', function( event )
  {
    event.preventDefault();
  } );

  $( document ).on('mousedown', function( event )
  {
    event.preventDefault();
  } );

  xyPlotView.render();
} );

})();
