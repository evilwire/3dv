(function( Raphael, _ )
{
  var __defaultClass = ['data'],

  __defaultStyle = {
    fill : '#2af'
  },

  XYData = SSPlot.View.XYData =
  SSPlot.SVGView.extend( {
    initialize : function()
    {
      Object.defineProperties( this, {
        x : { get : function(){ return this.get('x'); } },
        y : { get : function(){ return this.get('y'); } }
      } );
    },

    render : function( classList, style )
    {
      classList = Array.concat( classList, __defaultClass );
      $.extend(style, __defaultStyle);

      // get the x and y coordinates
      var coords = this.model.getPaperCoord( this.x, this.y ),
          bbox = this.model.get('bbox');

      if( coords.x < bbox.get( 'left' ) ||
          coords.y < bbox.get( 'top' ) ||
          coords.x > bbox.get( 'left' ) + bbox.get( 'width' ) ||
          coords.y > bbox.get( 'top' ) + bbox.get( 'height' ) )
        return;
      
      // draw a dot
      var dot = this.paper.circle( coords.x, coords.y, 10 )
                    .attr( style )
                    .mouseover( function(){
                      dot.animate( Raphael.animation({
                        r : 20,
                      }, '>' ) );
                    } )
                    .mouseout( function(){
                      dot.animate( Raphael.animation({
                        r : 10,
                      }, '>' ) );
                    } );

      $( dot.node ).attr({
        class : classList.join(' ')
      });

    }
  } );
})( Raphael, _ );
