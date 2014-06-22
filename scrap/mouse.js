$( document ).ready( function( event )
{
  // do something about
  var canvasDIV = document.getElementById('canvas');
  paper = Raphael(canvasDIV, '100%', '100%');
  
  $( canvasDIV ).css({
    'height' : '800px',
    'background-color' : '#eee'
  });

  // create the dots
  for( var i = -50; i < 56; i++ )
    for( var j = 0; j < 40; j++ )
    {
      var circle = paper.circle(
        i * 20,
        j * 20,
        4
      ).attr({fill: '#000'});
    }
  
  var left = 300;
  var top = 300;
  paper.setViewBox( left, top, 150, 150, false );
  
  var updateViewBox = function( event )
  {
    // update the view box
    var deltaX = event.pageX - initX,
        deltaY = event.pageY - initY; 
    
    paper.setViewBox( left - deltaX, 
      top - deltaY, 150, 150, false);

    console.log( left - deltaX );
  },

  documentMouseUp = function( event )
  {
    $( document ).off('mousemove',
      updateViewBox );
    
    $( document ).off('mouseup',
      documentMouseUp );
  },

  initX,

  initY;

  $( document ).on( 'mousedown',
  function( event )
  {
    initX = event.pageX;
    initY = event.pageY;

    $( document ).on( 'mousemove',
      updateViewBox);

    $( document ).on( 'mouseup',
      documentMouseUp );
  });
} );
