(function( Raphael )
{
  var XYPlot = SSPlot.View.XYPlot = 
  SSPlot.SVGView.extend({
    initialize : function()
    {
      var bbox = this.model.get('bbox'),
      top = bbox.get('top'),
      left = bbox.get('left'),
      width = bbox.get('width'),
      height = bbox.get('height');

      this.$el.css({
        top : String(top) + 'px',
        left : String(left) + 'px',
        width : String(width) + 'px',
        height : String(height) + 'px'
      });

      this.model.on('change', function( event )
      {
        this.render();
      } );

      var xAxisView = new SSPlot.View.HAxis({
        paper : this.paper,
        model : this.model,
      }),

      yAxisView = new SSPlot.View.VAxis({
        paper : this.paper,
        model : this.model,
      }),

      xyGrid = new SSPlot.View.XYGrid({
        model : this.model,
        paper : this.paper
      }),

      dataPoints = [],

      dataModels = this.model.get('data').models,

      index = dataModels.length;
      
      while( --index >= 0 )
      {
        dataPoints.push( new SSPlot.View.XYData({
          model : this.model,
          paper : this.paper,
          data : dataModels[ index ] 
        }));
      }

      Object.defineProperties( this, {
        xaxis : {
          get : function(){ return xAxisView; }
        },

        yaxis : {
          get : function(){ return yAxisView; }
        },

        grid : {
          get : function(){ return xyGrid; }
        },

        dataPoints : {
          // not the fastest, but solved the mutability problem
          get : function(){ return dataPoints.concat( [] ); }
        }
      });
    },

    render : function()
    {
      // draw the axes
      this.xaxis.render();
      this.yaxis.render();
      this.grid.render();

      var dataCollection = this.dataPoints;
      var index = dataCollection.length;

      while( --index >= 0 )
      {
        dataCollection[ index ].render();
      }
    }
  });

})( Raphael );
