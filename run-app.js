(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]);

  var xAxis = SSPlot.View.XYAxis({
    model : {},
    canvas : paper,
  });

});

})();
