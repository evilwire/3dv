(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]),

  xRange = new SSPlot.Model.Range({ }), 

  xScale = new SSPlot.Model.Scale({ 
    increment : 1
  }),

  xAxis = new SSPlot.Model.Axis({
    scale : xScale,
    range : xRange,
    label : 'p',
  }),

  yRange = new SSPlot.Model.Range({ }), 

  yScale = new SSPlot.Model.Scale({ 
    increment : 1 }),

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

  xyPlot = new SSPlot.Model.XYPlot({
    haxis : xAxis,
    vaxis : yAxis,
    bbox : bBox,
    data : []
  }),

  xyPlotView = new SSPlot.View.XYPlot({
    paper : paper,
    model : xyPlot
  });

  xyPlotView.render();
} );

})();
