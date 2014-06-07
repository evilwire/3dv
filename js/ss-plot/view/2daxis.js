(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  HAxisDrawMethods = {
    'fixed' : function( params )
    {
      var i = params.min,
      axesLabels = this.paper.set(),
      ratio = params.offset / params.ticSize,
      leadTics = Math.floor( ratio ),
      startingPoint = 
        parseInt( ( ratio - leadTics ) * 
          params.ticSize );

      this.svg.push( axesLabels );
      for( var x = params.left + startingPoint; 
               x < params.right; 
               x += params.ticSize )
      {
        axesLabels.push(
          this.paper.path( lineTemplate( {
              x1 : x,
              y1 : params.bottom + 3,
              x2 : x,
              y2 : params.bottom
            } ) )
          .attr({ stroke : '#aaa' } ) );
        var label = 
          this.paper.text( x, 
            params.bottom + 10, String(i) )
        axesLabels.push( label );

        $( label.node ).attr( 'class', 'xaxis label' );
        i += params.increment;
      }
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
        parseInt( ( ratio - leadTics ) * 
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
        right : bbox.get('left') + bbox.get('width'),
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
