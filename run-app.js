(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]),
  xRange = new SSPlot.Model.Range({ }), 
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
  }),
  xyPlotView = new SSPlot.View.XYPlot({
    paper : paper,
    model : xyPlot
  });
  xyPlot.getInitialValues();
  xyPlotView.render();

  $( document ).on('select', function( event )
  {
    event.preventDefault();
  } );

  $( document ).on('mousedown', function( event )
  {
    event.preventDefault();
  } );

  var dataPt = new SSPlot.View.XYData({
    model : xyPlot,
    paper : paper,
    data : new SSPlot.Model.XYData({
      x : 3,
      y : 4
    })
  }),

  farDataPoint = new SSPlot.View.XYData({
    model : xyPlot,
    paper : paper,
    data : new SSPlot.Model.XYData({
      x : 39,
      y : 25
    })
  });

  dataPt.render();

  farDataPoint.render();
} );

})();
