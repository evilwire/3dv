(function(Backbone)
{
  SSPlot.Range = Backbone.Model.extend({
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

  SSPlot.Scale = Backbone.Model.extend({
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
})(Backbone);
