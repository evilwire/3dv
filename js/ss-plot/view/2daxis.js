(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  HAxisDrawMethods = {
    'fixed' : function( params )
    {
      var i = params.min,
          axesLabels = $('<div class="axis horizontal"></div>');


          ratio = params.offset / params.ticSize,
          leadTics = Math.floor( ratio ),
          startingPoint = 
            params.ticSize - parseInt( ( ratio - leadTics ) * 
              params.ticSize );

      this.svg.push( axesLabels );
      for( var x = startingPoint; 
               x < params.right; 
               x += params.ticSize )
      {
        // create a label
        var label = $('<div class="label"></div>').html(i);
        axesLabels.append( label );
        label.css({
          left : String(x - 3) + 'px'
        });
        i += params.increment;
      }
      this.$el.append( axesLabels ); 
    }
  },

  VAxisDrawMethods = {
    'fixed' : function( params )
    {
      var i = params.min,
      axesLabels = this.paper.set();
      ratio = params.offset / params.ticSize,
      leadTics = Math.floor( ratio ),
      startingPoint = 
        params.ticSize - parseInt( ( ratio - leadTics ) * 
          params.ticSize );

      this.svg.push( axesLabels );
      for( var y = params.bottom - startingPoint;
               y > params.top; 
               y -= params.ticSize )
      {
        axesLabels.push(
          this.paper.path( lineTemplate( {
              x1 : params.left,
              y1 : y,
              x2 : params.left + 3,
              y2 : y
            } ) )
          .attr({ stroke : '#aaa' } ) );
        // draw the text
        var label = 
          this.paper.text( params.left - 10, y, String(i) )
        axesLabels.push( label );

        $( label.node ).attr( 'class', 'yaxis label' );
        i += params.increment;
      }
    }
  },

  HAxis = SSPlot.View.HAxis = 
  SSPlot.SVGView.extend( {
    initialize : function()
    {
      var _this = this;

      // redraw when the axis update
      this.model.on( 'change', 
        function( event )
        {
          _this.render();
        });
    },

    render : function()
    {
      // get the type of axis it is
      var bbox = this.model.get('bbox'),
      axis = this.model.get('haxis'),
      scale = axis.get('scale');
      HAxisDrawMethods[ scale.get( 'type' ) ].call( this, 
      {
        ticSize : scale.get('ticSize'),
        label : axis.get('label'),
        offset : axis.get('range').get('offset'),
        increment : scale.get('increment'),
        bottom : bbox.get('top') + bbox.get('height'),
        left : bbox.get('left'),
        right : bbox.get('width'),
        min : this.model.getInitialValues().x,
      } );
    },
  } );

  var VAxis = SSPlot.View.VAxis =
  SSPlot.SVGView.extend( {
    initialize : function()
    {
      var _this = this;

      // redraw when the axis update
      this.model.on( 'change', 
        function( event )
        {
          _this.render();
        });
    },

    render : function()
    {
      // get the type of axis it is
      var bbox = this.model.get('bbox'),
      axis = this.model.get('vaxis'),
      scale = axis.get('scale');

      // draw the tick marks
      VAxisDrawMethods[ scale.get( 'type' ) ].call( this, 
      {
        ticSize : scale.get('ticSize'),
        label : axis.get( 'label' ),
        offset : axis.get('range').get('offset'),
        increment : scale.get( 'increment' ),
        left : bbox.get( 'left' ),
        top : bbox.get( 'top' ),
        bottom : bbox.get( 'top' ) + bbox.get('height'),
        min : this.model.getInitialValues().y
      } );
    } 
  });

})( Raphael, _ )
