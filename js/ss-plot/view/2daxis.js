(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  FixedAxisDraw = function( params )
  {
    var orientation = params.orientation,
        i = params.min - parseInt( params.buffer / params.ticSize ),
        axesViewPort = 
          $('<div class="axis-container ' + orientation + '"></div>'),
        axesLabels = $('<div class="axis ' + orientation + '"></div>'),
        ratio = params.offset / params.ticSize,
        leadTics = Math.floor( ratio ),
        x = ( orientation == 'horizontal')?
          params.ticSize - parseInt( ( ratio - leadTics ) * 
            params.ticSize ) - params.buffer :
          params.bottom - params.ticSize + 
            parseInt( ( ratio - leadTics ) * 
            params.ticSize ) + params.buffer,

        condition = ( orientation == 'horizontal' )?
          function( x ){ return x < ( params.right + params.buffer ); } :
          function( y ){ return y > -params.buffer; },

        increment = ( orientation == 'horizontal' )?
          params.ticSize : -params.ticSize,

        cssAttr = ( orientation == 'horizontal' )?
          'left' : 'top';
    
    while( condition.call( null, x ) )
    {
      var label = $('<div class="label"></div>')
        .html("<div class='label-text'>" + String(i) + "</div>");
      axesLabels.append( label );
      label.css( cssAttr, String(x - 3) + 'px' );
      i += params.increment;
      x += increment;
    }
    this.$el.append( axesViewPort.append( axesLabels ) ); 
  },

  HAxisDrawMethods = {
    'fixed' : function( params )
    {
      $.extend( params, {
        orientation : 'horizontal',
      } );

      FixedAxisDraw.call( this, params );
    }
  },

  VAxisDrawMethods = {
    'fixed' : function( params )
    {
      $.extend( params, {
        orientation : 'vertical',
      } );

      FixedAxisDraw.call( this, params );
    }
  },

  redrawHAxis = function( event )
  {
    // scale?

    // range?
    if( event.type.indexOf('range') >= 0 )
    {
      var range = event.target.get('range'),

      offset = range.get('offset'),
      initialOffset = range.get('initialOffset'),

      deltaX = offset - initialOffset;

      $('.axis.horizontal').css({
        'transform' : 'translate(' + String( deltaX ) + 'px, 0px)'
      });
    }
  },

  redrawVAxis = function( event )
  {

    // range?
    if( event.type.indexOf('range') >= 0 )
    {
      var range = event.target.get('range'),

      offset = range.get('offset'),
      initialOffset = range.get('initialOffset'),

      delta = offset - initialOffset;

      $('.axis.vertical').css({
        'transform' : 'translate(0px,' + String( delta ) + 'px)'
      });
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
          if( event.type.indexOf('haxis') < 0 )
            return;

          redrawHAxis.call( _this, event )
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
        left : bbox.get('left'),
        right : bbox.get('width'),
        bottom : bbox.get('top') + bbox.get('height'),
        min : this.model.getInitialValues().x,
      } );
    },

    updateBuffer : function( change )
    {
      // based on change figure out how many of the
      // labels need to be removed from the buffer zone...
      var axis = this.model.get('haxis'),
      scale = axis.get('scale'),
      ticSize = scale.get('ticSize');
      bufferedWidth = 2 * axis.get('range').get('buffer') + 
        this.model.get('bbox').get('width');

      var numRemove = parseInt( change / ticSize ) + 1;

      var cutoff = this.model.get('bbox').get('width') + 
        axis.get('range').get('buffer') -
        axis.get('range').get('offset'),
        labelsCount = $('.axis.horizontal .label').length;
        lastLabel = parseInt( 
          $('.axis.horizontal .label .label-text')[labelsCount - 1].innerHTML );

      // calculate which labels need to be removed
      var removeCount = parseInt( change / ticSize );

      if( removeCount == 0 ) return;

      if( removeCount < 0 )
      {
        var labelsCount = $('.axis.horizontal .label').length,
            lastLabel = 
              parseInt( 
                $('.axis.horizontal .label .label-text')[labelsCount - 1]
                .innerHTML ),

        removedLabels = $('.axis.horizontal .label')
          .slice(0, -removeCount).each( function( index, element )
          {
            var $element = $( element ),

            desiredLeft = $element.position().left + bufferedWidth;

            //$element.remove();
            $element.css({ 
              left : String( desiredLeft ) + 'px'
            })
            .children('.label-text')
            .html( String( lastLabel + index + 1 ) );
          } )
          .remove();

        $('.axis.horizontal').append( removedLabels );
      }
      else
      {
        var firstLabel = 
          parseInt(
            $('.axis.horizontal .label .label-text')[0]
            .innerHTML ),

        removedLabels = $('.axis.horizontal .label')
          .slice(-removeCount).each( function( index, element )
          {
            var $element = $( element ),

            desiredLeft = $element.position().left - bufferedWidth;

            //$element.remove();
            $element.css({ 
              left : String( desiredLeft ) + 'px'
            })
            .children('.label-text')
            .html( String( firstLabel + index - removeCount ) );
          } )
          .remove();

        $('.axis.horizontal').prepend( removedLabels );

      }
    }
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
          if( event.type.indexOf('vaxis') > 0 )
            redrawVAxis.call( _this, event )
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
        buffer : axis.get('range').get('buffer'),
        increment : scale.get( 'increment' ),
        left : bbox.get( 'left' ),
        top : bbox.get( 'top' ),
        bottom : bbox.get('height'),
        min : this.model.getInitialValues().y
      } );
    },

    updateBuffer : function( change )
    {
      var axis = this.model.get('vaxis'),
      scale = axis.get('scale'),
      ticSize = scale.get('ticSize');
      bufferedHeight = 2 * axis.get('range').get('buffer') + 
        this.model.get('bbox').get('height');

      var numRemove = parseInt( change / ticSize ) + 1,

        cutoff = this.model.get('bbox').get('height') + 
        axis.get('range').get('buffer') -
        axis.get('range').get('offset'),
        labelsCount = $('.axis.vertical .label').length;
        lastLabel = parseInt( 
          $('.axis.vertical .label .label-text')[labelsCount - 1].innerHTML );

      // calculate which labels need to be removed
      var removeCount = parseInt( change / ticSize );

      if( removeCount == 0 ) return;

      var labelCount = $('.axis.vertical .label').length;

      if( removeCount > 0 )
      {
        var labelsCount = $('.axis.vertical .label').length,
            lastLabel = 
              parseInt( 
                $('.axis.vertical .label .label-text')[labelsCount - 1]
                .innerHTML ),

        removedLabels = $( '.axis.vertical .label' )
          .slice(0, removeCount).each( function( index, element )
          {
            var $element = $( element ),

            desiredTop = $element.position().top - bufferedHeight;
            console.log( desiredTop );

            //$element.remove();
            $element.css({ 
              top : String( desiredTop ) + 'px'
            })
            .children('.label-text')
            .html( String( lastLabel + removeCount - index ) );
          } )
          .remove();

        $('.axis.vertical').append( removedLabels );
      }
      else
      {
        var firstLabel = 
          parseInt(
            $('.axis.vertical .label .label-text')[0]
            .innerHTML );
        console.log( $('.axis.vertical .label')[0].offsetTop );

        var removedLabels = $('.axis.vertical .label')
          .slice(removeCount).each( function( index, element )
          {
            var $element = $( element ),

            desiredTop = $element.position().top + bufferedHeight;

            console.log( desiredTop );
            console.log( firstLabel + index - removeCount );

            //$element.remove();
            $element.css({ 
              top : String( desiredTop ) + 'px'
            })
            .children('.label-text')
            .html( String( firstLabel - index ) );
          } )
          .remove();

        $('.axis.vertical').prepend( removedLabels );
      }
    }
  });

})( Raphael, _ )
