(function(Backbone)
{
  SSPlot.Model.XYPlot = Backbone.Model.extend({
    initialize : function()
    {
      var _this = this,
          dependents = ['hscale', 'vscale', 'hrange', 
            'vrange', 'data', 'bbox'],

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
          }
      }
    },
  });
})(Backbone);
