(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]);

  var xRange = new SSPlot.Model.Range({ }), 

  xScale = new SSPlot.Model.Range({ }),

  xAxis = new SSPlot.Model.Axis({
    scale : xScale,
    range : xRange,
    label : 'p',
  }),

  yRange = new SSPlot.Model.Range({ }), 

  yScale = new SSPlot.Model.Range({ }),

  yAxis = new SSPlot.Model.Axis({
    scale : yScale,
    range : yRange,
    label : 'q',
  }),

  bBox = new SSPlot.Model.BBox({
    left : 130,
    top : 40,
    height: 600,
    width: 800
  }),

  xyPlot = new SSPlot.Model.XYPlot({
    haxis : xAxis,
    vaxis : yAxis,
    bbox : bBox,
    data : []
  });

  var xAxisView = new SSPlot.View.HAxis({
    canvas : $('.canvas'),
    model : xyPlot,
    size : 500,
    midpoint : {
      x : 300,
      y : 500
    }
  });

  xAxisView.render();

});

})();
