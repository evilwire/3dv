(function( Raphael, _ )
{
  var __defaultClass = ['data'],

  __defaultStyle = {
    fill : '#28a',
    'stroke-width' : '0px'
  },

  XYData = SSPlot.View.XYData =
  SSPlot.SVGView.extend( {
    initialize : function()
    {
      Object.defineProperties( this, {
        x : { get : function(){ return this.get('data').get('x'); } },
        y : { get : function(){ return this.get('data').get('y'); } }
      } );
    },

    render : function( classList, style )
    {
      classList = Array.concat( classList, __defaultClass );
      style = $.extend( {}, style, __defaultStyle );

      // get the x and y coordinates
      var coords = this.model.getPaperCoord( this.x, this.y ),
          bbox = this.model.get('bbox');
      
      if( coords.x < 0 || //bbox.get( 'left' ) ||
          coords.y < 0 || //bbox.get( 'top' ) ||
          coords.x > bbox.get( 'width' ) ||
          coords.y > bbox.get( 'height' ) )
        return;
      
      var dot = this.paper.circle( coords.x, coords.y, 5 );
      dot.attr( style );
      dot.mouseover( function(){
                      dot.animate( Raphael.animation({
                        r : 8,
                      }, 50, '>' ) );
                    } )
                    .mouseout( function(){
                      dot.animate( Raphael.animation({
                        r : 5,
                      }, 50, '>' ) );
                    } );

      $( dot.node ).attr({
        class : classList.join(' ')
      });

    }
  } );
})( Raphael, _ );
