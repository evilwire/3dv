(function(Backbone)
{
  SSPlot.Model.XYPlot = Backbone.Model.extend({
    initialize : function()
    {
      var _this = this,
          dependents = ['haxis', 'vaxis', 'bbox'],

         index = dependents.length;

      while( --index >= 0 )
      {
        var dependentName = dependents[ index ],
            dependentObj = this.get( dependentName );

        dependentObj.on( 'change', 
          function( event )
          {
            $.extend( event, {
              type : dependentName,
              target : dependentObj
            } );

            _this.trigger('change', event );
          } );
      }
    },

    getPaperCoord : function( xVal, yVal )
    {
      // if off the grid, then return false
      var xscale = this.get('haxis').get('scale'),
          xrange = this.get('haxis').get('range'),
          yscale = this.get('vaxis').get('scale'),
          yrange = this.get('vaxis').get('range');

      return {
        left : 0,
        top  : 0
      }
    }
  });
})(Backbone);
