(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]); 
  
  // draw the axes
  var topLeft = new SVGPoint({
    canvas : paper,
    x : 40,
    y : 40
  });

  var bottomLeft = new SVGPoint({
    canvas : paper,
    x : 40,
    y : paper.height - 40
  });

  var bottomRight = new SVGPoint({
    canvas : paper,
    x : paper.width - 40,
    y : paper.height - 40,
  });

  //topLeft.render();
  //bottomLeft.render();
  //bottomRight.render();

  var leftYAxis = new SVGLine({
    canvas : paper,
    start : topLeft,
    end : bottomLeft
  });

  var bottomXAxis = new SVGLine({
    canvas : paper,
    start : bottomLeft,
    end : bottomRight,
    style : {
      'stroke-dasharray' : '',
      'stroke' : '#000',
      'stroke-opacity' : .5,
      'stroke-width' : 1
    }
  });

  leftYAxis.render();
  bottomXAxis.render();

});

})();
