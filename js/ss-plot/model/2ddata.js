(function( Backbone )
{
  var XYData =
  SSPlot.Model.XYData = Backbone.Model.extend({

  });

  SSPlot.Collection.XYDataCollection = 
    Backbone.Collection.extend({
      model : XYData
    });
})( Backbone );
