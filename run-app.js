(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]),

  circ = paper.circle( 200, 200, 50 );
  circ.attr({
    stroke : 'rgba(68, 68, 68, .3)',
    fill : '#444'
  });
});

})();
