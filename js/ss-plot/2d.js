/**
 * Plot
 */
function FlatPlot( params )
{
  var _canvas = params.canvas,

  _left = params.left,

  width = function(){ return _canvas.width; },

  height = function(){ return _canvas.height; },

  initialize = function( initParams )
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
 */
function FlatLabel( params )
{
  var _Label = params.label,

  _canvas = params.canvas,

  render = function()
  {
  };
}

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
