(function(Backbone)
{
  SSPlot.Model.XYPlot = Backbone.Model.extend({
    initialize : function()
    {
      var dependents = [ this.get('hscale'),
          this.get('vscale'),
          this.get('hrange'),
          this.get('vrange'),
          this.get('data') ],

      _this = this;

      this.get('hscale').on('change', function( event )
      {
        $.extend(event, {
          type   : 'hscale',
          target : this.get('hscale')
        });
        _this.trigger('change', event );
      });

      this.get('vscale').on('change', function( event )
      {
        $.extend(event, {
          type   : 'vscale',
          target : this.get('vscale')
        });
        _this.trigger('change', event );
      });

      this.get('hrange').on('change', function( event )
      {
        $.extend(event, {
          type   : 'hrange',
          target : this.get('hrange')
        });
        _this.trigger('change', event );
      });

      this.get('vrange').on('change', function( event )
      {
        $.extend(event, {
          type   : 'vrange',
          target : this.get('vrange')
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
    },
  });
})(Backbone);
