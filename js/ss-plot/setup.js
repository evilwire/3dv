var SSPlot = SSPlot || {};

(function()
{
  var View = {},
  Model = {},
  Collection = {};

  Object.defineProperties( SSPlot, {
    View : { get : function(){ return View; } },
    Model : { get : function(){ return Model; } },
    Collection : { get : function(){ return Collection; } }
  });
})();
