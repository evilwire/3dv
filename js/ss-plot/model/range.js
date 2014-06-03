(function(Backbone)
{
  SSPlot.Model.Range = Backbone.Model.extend({
    defaults : {
      min : 0,
      max : 40
    },

    validate : function()
    {
      if( max <= min )
        return "Range error: Max is not greater than min";
    },

    initialize : function(){

    }
  });

  var ScaleInitMethods = {
    'fixed' : function( params )
    {
      return {
        ticSize : params.ticSize,
      }
    },
  };

  SSPlot.Model.Scale = Backbone.Model.extend({
    defaults : {
      type : 'fixed',
      ticSize : 20,
    },

    initilize : function(){
      var params = this.attributes;
      initMethod = ScaleInitMethods[this.get('type')],
      scaleAttr = initMethods.call( this, this.attributes );
      this.set(scaleAttr, { silent : true });
    },

    rescale : function( params ){
      var initMethod = ScaleInitMethods[ params.type ];
      scaleAttr = initMethods.call( this, params );
      this.set( newScaleAttr );
    }
  });

  SSPlot.Model.Axis = Backbone.Model.extend({
    initialize : function(){
      var _this = this;

      this.get('scale').on( 'change',
        function( event )
        {
          $.extend( event, {
            type  : 'scale',
            target : this.get('scale')
          });
          _this.trigger('change', event );
        } );

      this.get('range').on( 'change',
        function( event )
        {
          $.extend( event, {
            type  : 'range',
            target : this.get('range')
          });
          _this.trigger('change', event );
        } );
      
      Object.defineProperties( _this, {
        scale : { get : function(){ return this.get('scale'); } },
        range : { get : function(){ return this.get('range'); } }
      });
    }
  });
})(Backbone);
