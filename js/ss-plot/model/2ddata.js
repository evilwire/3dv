(function( Backbone )
{
  var XYData =
  SSPlot.Model.XYData = Backbone.Model.extend({
    initialize : function()
    {
      Object.defineProperties( this,
      {
        x : function(){ return this.get('x'); },
        y : function(){ return this.get('y'); }
      } );
    }
  });

  SSPlot.Collection.XYDataCollection = 
    Backbone.Collection.extend({
      model : XYData
    });

})( Backbone );
