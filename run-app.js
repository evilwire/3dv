(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]);

  var xRange = new SSPlot.Model.Range({ }), 

  xScale = new SSPlot.Model.Range({ }),

  xAxis = new SSPlot.Model.Axis({
    scale : xScale,
    range : xRange,
    type  : 'horizontal',
    label : 'p',
  });

  var xAxisView = new SSPlot.View.XYAxis({
    canvas : $('.canvas'),
    model : xAxis,
    size : 500,
    midpoint : {
      x : 300,
      y : 500
    }
  });

  xAxisView.render();

});

})();
