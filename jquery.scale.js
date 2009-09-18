/**
 * jQuery.scale plugin
 * Copyright (c) 2009 Oregon State Univerisity - info(at)osuosl.org | osuosl.org
 * licensed under GPLv3.
 * Date: 9/4/2009
 *
 * @projectDescription jQuery extension for scaling an object to fit inside its parent while maintaining the aspect ratio
 * @author Rob McGuire-Dale -  rob@osuoslcom
 * @version 1.0
 *
 * @id jQuery.scale
 * @id jQuery.fn.scale
 * @param {String, [String]} In any order, enter "center" (to center the object) and/or "stretch" (to stretch the object to fit inside the parent)
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * jQuery plugin structure based on "A Really Simple jQuery Plugin Tutorial" 
 * (http://www.queness.com/post/112/a-really-simple-jquery-plugin-tutorial) by
 * Kevin Liew
 */

(function($){                               // anonymous function wrapper

    $.fn.extend({                           // attach new method to jQuery
    
        scale: function( arg1, arg2 ){      // declare plugin name and parameter
        
            // iterate over current set of matched elements
            return this.each( function() {
            
                safelog( "jquery.scale is starting...");
            
                // capture the object
                var obj = $(this);
            
                // get the object back to its original size
                obj.removeAttr( 'height' ); obj.removeAttr( 'width' );
            
                // force element reload if it's an image
                if( obj.attr('src') != null ){
                    safelog( "jquery.scale: object is an image" );
                    var date = new Date();
                    var cursrc = obj.attr("src");
                    var newsrc = cursrc;
                    if( cursrc.indexOf('?') != -1 )
                        newsrc = cursrc.substring( 0, cursrc.indexOf('?'));
                    newsrc = newsrc + "?" + date.getTime();
                    obj.attr( "src", newsrc );
                    
                    this.onload = start;
                     
                } else {
                    safelog("jquery.scale: object is NOT an image");
                    start();
                }
            
                // the main plugin function
                function start(){
                    safelog( "jquery.scale: BEFORE scaling, object's size" +
                        " = " + obj.outerWidth() + "x" + obj.outerHeight() + 
                        ", object's parent's size = " + 
                        obj.parent().innerWidth() + "x" + 
                        obj.parent().innerHeight() + ".'" );
                    
                    // Object too tall, but width is fine. Need to shorten.
                    if( obj.outerHeight() > obj.parent().innerHeight() && 
                        obj.outerWidth() < obj.parent().innerWidth() ){

                        matchHeight();       
                    }
                    
                    // Object too wide, but height is fine. Need to diet.
                    else if( obj.outerWidth() > obj.parent().innerWidth() && 
                             obj.outerHeight() < obj.parent().innerHeight() ){

                        matchWidth();    
                    }
                    
                    // Object too short and skinny. If "stretch" option enabled,
                    // match the dimenstion that is closer to being correct.
                    else if( obj.outerWidth() < obj.parent().innerWidth() && 
                             obj.outerHeight() < obj.parent().innerHeight() &&
                             (arg1 == "stretch" || arg2 == "stretch") ){
                      
                        if( Math.abs(obj.parent().innerHeight() - 
                                     obj.outerHeight()) <= 
                            Math.abs(obj.parent().innerWidth() - 
                                     obj.outerWidth()) ){
                            
                            matchHeight();
                            
                        } else matchWidth();
                    
                    // Object too tall and wide. Need to match the dimenstion 
                    // that is further from being correct.
                    } else if( obj.outerWidth() > obj.parent().innerWidth() && 
                               obj.outerHeight() > obj.parent().innerHeight() ){
                               
                        if( Math.abs(obj.parent().innerHeight() - 
                                     obj.outerHeight()) > 
                            Math.abs(obj.parent().innerWidth() - 
                                     obj.outerWidth()) ){
                            
                            matchHeight();
                            
                        } else matchWidth();

                    }//else, object is the same size  as the parent. Do nothing.

                    // if the center option is enabled, also center the object 
                    //within the parent
                    if( arg1 == "center" || arg2 == "center" ){
                        obj.css( 'position', 'relative' );
                        obj.css( 'margin-top', 
                             obj.parent().innerHeight()/2 - 
                                        obj.outerHeight()/2  );
                        obj.css( 'margin-left', 
                             obj.parent().innerWidth()/2 - 
                                        obj.outerWidth()/2  );
                    }
                    
                    // match the height while maintaining the aspect ratio
                    function matchHeight(){
                        obj.removeAttr( "height" );
                        obj.width( obj.outerWidth() * 
                            obj.parent().innerHeight()/obj.outerHeight() - 
                            (obj.outerWidth() - obj.width()));
                    }
                    
                    // match the width while maintaining the aspect ratio
                    function matchWidth(){
                        obj.removeAttr( "width" );
                        obj.height(  obj.outerHeight() * 
                            obj.parent().innerWidth()/obj.outerWidth() - 
                            (obj.outerHeight() - obj.height())  );
                    }
                    
                    safelog( "jquery.scale: AFTER scaling, object's size" +
                        " = " + obj.outerWidth() + "x" + obj.outerHeight() + 
                        ", object's parent's size = " + 
                        obj.parent().innerWidth() + "x" + 
                        obj.parent().innerHeight() + ".'" );
                        
                }   //END start
                
                function safelog( msg ){
                    if( window.console )
                        console.log( msg );
                }
            
            });     //END matched element iterations
        
        }           //END plugin declaration
        
    });             //END new jQuery method attachment
    
})(jQuery);         //END anonymous function wrapper
