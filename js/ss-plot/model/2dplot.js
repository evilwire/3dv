(function(Backbone)
{
  SSPlot.XYPlot = Backbone.Model.extend({
    initialize : function()
    {
      var dependents = [ this.get('xscale'),
          this.get('yscale'),
          this.get('xrange'),
          this.get('yrange'),
          this.get('data') ],

      index = dependents.length;

      while( --index > 0 )
      {
        var _this = this;
        dependents[index].on('change', function( eventData )
        {
          _this.trigger('change', _this );
        });
      }
    }
  });
})(Backbone);
