// ECMAScript 5 strict mode
"use strict";

assert2( cr, "cr namespace not created" );
assert2( cr.plugins_, "cr.plugins_ not created" );

/////////////////////////////////////
// Plugin class
cr.plugins_.Clay = function( runtime )
{
  this.runtime = runtime;
};

( function ()
{
  var pluginProto = cr.plugins_.Clay.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function( plugin )
  {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var clayRuntime = null;
  var clayInst = null;

  var typeProto = pluginProto.Type.prototype;

  // called on startup for each object type
  typeProto.onCreate = function()
  {
  };

  /////////////////////////////////////
  // Instance class

  pluginProto.Instance = function( type )
  {
    this.type = type;
    this.runtime = type.runtime;

    // any other properties you need, e.g...
    // this.myValue = 0;
  };

  var instanceProto = pluginProto.Instance.prototype;

  // called whenever an instance is created
  instanceProto.onCreate = function()
  {
    clayRuntime = this.runtime;
    clayInst = this;

    (function(C,l,a,y,_,i,o){C[_]=C[_]||function(){
    (C[_].q=C[_].q||[]).push(arguments)},C[_].l=1*new Date();i=l.createElement(a),
    o=l.getElementsByTagName(a)[0];i.async=1;i.src=y;o.parentNode.insertBefore(i,o)
    })(window,document,'script','//cdn.wtf/sdk/v1/clay_sdk.js','Clay');

    Clay('init', {gameId: '' + this.properties[0]});
  };

  // only called if a layout object - draw to a canvas 2D context
  instanceProto.draw = function( ctx )
  {
  };

  // only called if a layout object in WebGL mode - draw to the WebGL context
  // 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
  // directory or just copy what other plugins do.
  instanceProto.drawGL = function ( glw )
  {
  };

  //////////////////////////////////////
  // Conditions

  pluginProto.cnds = {};
  var cnds = pluginProto.cnds;


  //////////////////////////////////////
  // Actions

  pluginProto.acts = {};
  var acts = pluginProto.acts;

  acts.client_share_any = function ( message ) {
    Clay('client.share.any', {text: message});
  };

  acts.ui_ads_banner = function ( position ) {
    Clay('ui.ads.banner', {position: position}, function (err, ad) {
      document.body.appendChild(ad.$el);
    });
  };

  acts.ui_ads_page = function () {
    Clay('ui.ads.page', function (err, ad) {
      document.body.appendChild(ad.$el);
    });
  };

  //////////////////////////////////////
  // Expressions

  pluginProto.exps = {};
  var exps = pluginProto.exps;

}() );
