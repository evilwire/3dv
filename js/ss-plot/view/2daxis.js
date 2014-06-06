(function( Raphael, _ )
{
  var lineTemplate = _.template('M<%= x1 %> <%= y1 %>L<%= x2 %> <%= y2 %>'),

  HAxisDrawMethods = {
    'fixed' : function( params )
    {
      var ticSize = params.ticSize,
      left = params.left,
      bottom = params.bottom,
      right = params.right,
      min = params.min,
      increment = params.increment;

      var i = min,
      axesLabels = this.paper.set();
      this.svg.push( axesLabels );
      for( var x = left; x < right; x += ticSize )
      {
        var label = 
          this.paper.text( x + 10, bottom + 10, String(i) );
        axesLabels.push(
          label
        );
        $( label.node ).attr('class', 'xaxis label' );
        i += increment;
      }
      axesLabels.attr({
        fill : 'RGB(120, 120, 120)',
        'font-family' : 'Open sans',
        'font-size' : '10px'
      });
    }
  },

  HAxis = SSPlot.View.HAxis = 
  SSPlot.SVGView.extend( {
    events : {
      '.xaxis.label mouseover' : function( event )
      {
        console.log( this );
      }
    },

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
      
      // draw about 20 from the left 
      left = bbox.get('left'),

      width = bbox.get('width'),

      height = bbox.get('height'),
      
      bottom = bbox.get('top') + height,

      right = left + width,

      lineStr = lineTemplate({
        x1 : left,
        y1 : bottom,
        x2 : right,
        y2 : bottom
      });
      // draw the axes
      var line = this.paper.path( lineStr );
      line.attr({
        'stroke' : '#888',
      });

      // draw the tick marks
      var axis = this.model.get('haxis'),

      range = axis.get('range'),

      scale = axis.get('scale'),

      hAxisDrawMethod = HAxisDrawMethods[ scale.get( 'type' ) ];

      hAxisDrawMethod.call( this, {
        ticSize : scale.get('ticSize'),
        label : axis.get('label'),
        increment : scale.get('increment'),
        left : left,
        min : range.get('min'),
        bottom : bottom,
        right : right,
      } );

    },
  } ),

  VAxis = SSPlot.View.VAxis =
  SSPlot.SVGView.extend( {
    events : {
    },

    initialize : function()
    {
    },

    render : function()
    {
    }
  } );

})( Raphael, _ )
