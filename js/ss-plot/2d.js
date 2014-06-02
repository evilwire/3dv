/**
 * Plot
 */
function FlatPlot( params )
{
  var _canvas = params.canvas,

  _scale = params.scale,

  _left = params.left,

  __eventHandlers = {},

  width = function(){ return _canvas.width; },

  height = function(){ return _canvas.height; },

  /**
   * Allowed events:
   * 
   * - datachange
   * - axischange
   */
  on = function( eventName, eventHandler ){ 
    __eventHandlers[eventName].push( eventHandler );
  },

  off = function( eventName, eventHandler )
  {
    var handlers = __eventHandlers[ eventName ],
        index = handlers.length;

    while( --index >= 0 )
    {
      if( handlers[ index ] == eventHandler )
      {
        handlers.splice( index, 1);
        return eventHandler;
      }
    }
  },

  trigger = function( eventName )
  {
    var handlers = __eventHandlers[eventName],
    var index = handlers.length;
    while( --index >= 0 )
    {
      var eventArr = {};
      handlers[ index ].call( flatPlotObj, eventArr );
    }
  },

  setup = function( initParams )
  {
    // draw the axes and scales and labels
  },

  flatPlotObj = {};

  if( Object.defineProperties )
  {
    Object.defineProperties( flatPlotObj,
    {
      width : { get : width },
      height : { get : height }
    } );
    return lineObj;
  }
  
  flatPlotObj = {
    get width(){ return width; },
    get height(){ return height; }
  };

  return lineObj;
}

/**
 * Axes Label
 *
 * TODO: create a subscription to the change events
 *       on the flatplot, and redraw
 */
function FlatLabel( params )
{
  var _scale = params.scale,

  _canvas = params.canvas,

  render = function()
  {

  };
}

/**
 * TODO: create a subscription to the change events
 *       on the flatplot
 */
function FlatScale( params )
{
  var _hscale = params.hscale,

  _vscale = params.vscale,

  hscale = function()
  {

  },

  vscale = function()
  {

  },

  rescale = function( factor )
  {

  };
}
