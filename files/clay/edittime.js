function GetPluginSettings()
{
  return {
    'name':        'Clay SDK',
    'id':          'Clay',
    'version':     '0.0.1',
    'description': 'Basic integration of the Clay.io SDK',
    'author':      'Clay.io',
    'help url':    'http://clay.io/docs/scirra',
    'category':    'Web',
    'type':        'object',
    'rotatable':   false,
    'flags':       pf_singleglobal
  }
}

////////////////////////////////////////
// Conditions
// AddCondition( id,            // any positive integer to uniquely identify this condition
//               flags,         // ( see docs ) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//               list_name,     // appears in event wizard list
//               category,      // category in event wizard list
//               display_str,   // as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//               description,   // appears in event wizard dialog when selected
//               script_name ); // corresponding runtime function name

// TODO...

////////////////////////////////////////
// Actions

// AddAction( id,            // any positive integer to uniquely identify this action
//            flags,         // ( see docs ) af_none, af_deprecated
//            list_name,     // appears in event wizard list
//            category,      // category in event wizard list
//            display_str,   // as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//            description,   // appears in event wizard dialog when selected
//            script_name ); // corresponding runtime function name

////////////////////////////////////////
// Parameter types:
// AddNumberParam( label, description [, initial_string = '0'] )    // a number
// AddStringParam( label, description [, initial_string = '\'\''] ) // a string
// AddAnyTypeParam( label, description [, initial_string = '0'] )   // accepts either a number or string
// AddCmpParam( label, description )                                // combo with equal, not equal, less, etc.
// AddComboParamOption( text )                                      // ( repeat before 'AddComboParam' to add combo items )
// AddComboParam( label, description [, initial_selection = 0] )    // a dropdown list parameter
// AddObjectParam( label, description )                             // a button to click and pick an object type
// AddLayerParam( label, description )                              // accepts either a layer number or name ( string )
// AddLayoutParam( label, description )                             // a dropdown list with all project layouts
// AddKeybParam( label, description )                               // a button to click and press a key ( returns a VK )
// AddAnimationParam( label, description )                          // a string intended to specify an animation name
// AddAudioFileParam( label, description )                          // a dropdown list with all imported project audio files

// client.share.any
AddStringParam( 'Message', 'The message to share (include the URL to your game on Clay)' );
AddAction( 1, af_none, 'Share.any', 'Social', 'Shares a message to the best available platform', '', 'client_share_any' );
// ui.ads.banner
AddComboParamOption( 'top' );
AddComboParamOption( 'bottom' );
AddComboParam( 'Position', 'Ad is 320x50 and will show at top or bottom of page.', initial_selection = 0 );
AddAction( 2, af_none, 'Show Banner', 'Advertisements', 'Show Banner', '', 'ui_ads_banner' );
// ui.ads.page
AddAction( 3, af_none, 'Show Full-Page Ad', 'Advertisements', 'Show Full-Page Ad', '', 'ui_ads_page' );


////////////////////////////////////////
// Expressions

// AddExpression( id,            // any positive integer to uniquely identify this expression
//                flags,         // ( see docs ) ef_none, ef_deprecated, ef_return_number, ef_return_string, ef_return_any, ef_variadic_parameters ( one return flag must be specified )
//                list_name,     // currently ignored, but set as if appeared in event wizard
//                category,      // category in expressions panel
//                exp_name,      // the expression name after the dot, e.g. 'foo' for 'myobject.foo' - also the runtime function name
//                description ); // description in expressions panel

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property( ept_integer,    name,  initial_value,  description )    // an integer value
// new cr.Property( ept_float,    name,  initial_value,  description )    // a float value
// new cr.Property( ept_text,    name,  initial_value,  description )    // a string
// new cr.Property( ept_color,    name,  initial_value,  description )    // a color dropdown
// new cr.Property( ept_font,    name,  'Arial,-16',   description )    // a font with the given face name and size
// new cr.Property( ept_combo,    name,  'Item 1',    description, 'Item 1|Item 2|Item 3' )  // a dropdown list ( initial_value is string of initially selected item )
// new cr.Property( ept_link,    name,  link_text,    description, 'firstonly' )    // has no associated value; simply calls 'OnPropertyChanged' on click

var property_list = [
  new cr.Property( ept_text,   'Game ID', '', 'You can find this in the developer dashboard' ),
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
  assert2( this instanceof arguments.callee, 'Constructor called as a function' );
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function( instance )
{
  return new IDEInstance( instance );
}

// Class representing an individual instance of an object in the IDE
function IDEInstance( instance, type )
{
  assert2( this instanceof arguments.callee, 'Constructor called as a function' );

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for ( var i = 0; i < property_list.length; i++ )
    this.properties[property_list[i].name] = property_list[i].initial_value;

  // Plugin-specific variables
  // this.myValue = 0...
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function( property_name )
{
}

// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function( renderer )
{
}

// Called by the IDE when the renderer has been released ( ie. editor closed )
// All handles to renderer-created resources ( fonts, textures etc ) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
