(function()
{

$(document).ready( function(){
  var paper = Raphael($('.canvas')[0]),

  st = paper.set();
  st.push(
    paper.circle( 10, 10, 5 ),
    paper.circle( 30, 10, 5 )
  );

  st.attr({ fill : 'black',
            stroke : 'rgba(0, 0, 0, .3)',
            'stroke-width' : 1 });
  
});

})();
