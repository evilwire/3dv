(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  HAxisDrawMethods = {
    'fixed' : function( params )
    {
      var i = params.min - parseInt( params.buffer / params.ticSize ),
          axesLabels = $('<div class="axis horizontal"></div>');
          ratio = params.offset / params.ticSize,
          leadTics = Math.floor( ratio ),
          startingPoint = 
            params.ticSize - parseInt( ( ratio - leadTics ) * 
              params.ticSize ) - params.buffer;

      this.svg.push( axesLabels );
      for( var x = startingPoint; 
               x < params.right + params.buffer; 
               x += params.ticSize )
      {
        // create a label
        var label = $('<div class="label"></div>')
          .html("<div class='label-text'>" + String(i) + "</div>");
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
      axesLabels = $('<div class="axis vertical"></div>');
      ratio = params.offset / params.ticSize,
      leadTics = Math.floor( ratio ),
      startingPoint = 
        params.ticSize - parseInt( ( ratio - leadTics ) * 
          params.ticSize );

      this.svg.push( axesLabels );
      for( var y = params.bottom - startingPoint;
               y > 0; 
               y -= params.ticSize )
      {
        var label = $('<div class="label"></div>')
          .html("<div class='label-text'>" + String(i) + "</div>");
        axesLabels.append( label );
        label.css({
          top : String(y - 3) + 'px'
        });
        i += params.increment;
      }
      this.$el.append( axesLabels ); 
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
        buffer : axis.get('range').get('buffer'),
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
        bottom : bbox.get('height'),
        min : this.model.getInitialValues().y
      } );
    } 
  });

})( Raphael, _ )
