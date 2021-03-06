(function(Backbone)
{
  SSPlot.Model.XYPlot = Backbone.Model.extend({
    initialize : function()
    {
      var _this = this,
          dependents = ['haxis', 'vaxis', 'bbox'],

         index = dependents.length;

      while( --index >= 0 )
      {
        (function()
        {
        var dependentName = dependents[ index ],
            dependentObj = this.get( dependentName );

        dependentObj.on( 'change', 
          function( event )
          {
            var type = event.type || [];

            type.push( dependentName );

            $.extend( event, {
              type : type,
              target : dependentObj
            } );

            _this.trigger('change', event );
          } );
        }).call( this );
      }

      this.get( 'data' ).on( 'add',
        function( event )
        {
          $.extend( event, {
            type : 'add:data',
            target : this.get( 'data' )
          } );

          _this.trigger('change', event );
        } );

      this.get( 'data' ).on( 'remove',
        function( event )
        {
          $.extend( event, {
            type : 'remove:data',
            target : this.get( 'data' )
          } );

          _this.trigger('change', event );
        } );
    },

    getInitialValues : function()
    {
      var xticSize = this.get('haxis').get('scale').get('ticSize'),
          xoffset = this.get('haxis').get('range').get('offset'),
          xincrement = this.get('haxis').get('scale').get('increment');

          yticSize = this.get('vaxis').get('scale').get('ticSize'),
          yoffset = this.get('vaxis').get('range').get('offset'),
          yincrement = this.get('vaxis').get('scale').get('increment');

      return {
        x : Math.ceil( xincrement * -xoffset / xticSize + 0.0000001 ),
        y : Math.ceil( yincrement * -yoffset / yticSize + 0.0000001 )
      };
    },

    getPaperCoord : function( xVal, yVal )
    {
      // if off the grid, then return false
      var xscale = this.get('haxis').get('scale'),
          xrange = this.get('haxis').get('range'),
          yscale = this.get('vaxis').get('scale'),
          yrange = this.get('vaxis').get('range'),
          initY = this.get('bbox').get('height');

      return {
        x : parseInt( (xVal * xscale.get('ticSize') 
          / xscale.get('increment')) + xrange.get('offset') ),

        y : initY - parseInt( (yVal * yscale.get('ticSize') 
          / yscale.get('increment')) + yrange.get('offset') ),
      };
    }
  });
})(Backbone);
