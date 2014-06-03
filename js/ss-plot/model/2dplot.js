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

      _this = this;

      this.get('xscale').on('change', function( event )
      {
        $.extend(event, {
          type   : 'xscale',
          target : this.get('xscale')
        });
        _this.trigger('change', event );
      });

      this.get('yscale').on('change', function( event )
      {
        $.extend(event, {
          type   : 'yscale',
          target : this.get('yscale')
        });
        _this.trigger('change', event );
      });

      this.get('xrange').on('change', function( event )
      {
        $.extend(event, {
          type   : 'xrange',
          target : this.get('xrange')
        });
        _this.trigger('change', event );
      });

      this.get('yrange').on('change', function( event )
      {
        $.extend(event, {
          type   : 'yrange',
          target : this.get('yrange')
        });
        _this.trigger('change', event );
      });

      this.get('data').on('change', function( event )
      {
        $.extend(event, {
          type   : 'data',
          target : this.get('data')
        });
        _this.trigger('change', event );
      });
    }
  });
})(Backbone);
