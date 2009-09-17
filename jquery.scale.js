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
 * @param {String} Enter "center" to also center the object within its parent
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * jQuery plugin structure based on "A Really Simple jQuery Plugin Tutorial" 
 * (http://www.queness.com/post/112/a-really-simple-jquery-plugin-tutorial) by
 * Kevin Liew
 */

(function($){                           // anonymous function wrapper

    $.fn.extend({                       // attach new method to jQuery
    
        scale: function( center ){      // declare plugin name and parameter
        
            // iterate over current set of matched elements
            return this.each( function() {
            
                // wait for the object to be fully loaded before doing anything
                this.onload = function(){
                
                    // capture the object
                    var obj = $(this);
                    
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
                    
                    // Object too short and skinny. Need to match the dimenstion that is
                    // closer to being correct.
                    else if( obj.outerWidth() < obj.parent().innerWidth() && 
                             obj.outerHeight() < obj.parent().innerHeight() ){
                      
                        if( Math.abs(obj.parent().innerHeight() - obj.outerHeight()) <= 
                            Math.abs(obj.parent().innerWidth() - obj.outerWidth()) ){
                            
                            matchHeight();
                            
                        } else matchWidth();
                    
                    // Object too tall and wide. Need to match the dimenstion that is
                    // further from being correct.
                    } else if( obj.outerWidth() > obj.parent().innerWidth() && 
                               obj.outerHeight() > obj.parent().innerHeight() ){
                               
                        if( Math.abs(obj.parent().innerHeight() - obj.outerHeight()) > 
                            Math.abs(obj.parent().innerWidth() - obj.outerWidth()) ){
                            
                            matchHeight();
                            
                        } else matchWidth();

                    }//else, object is the same size  as the parent. Do nothing.

                    // if the center option is enabled, also center the object within the parent
                    if( center == "center" ){
                        obj.css( 'position', 'relative' );
                        obj.css( 'margin-top', Math.round( obj.parent().innerHeight()/2 - obj.outerHeight()/2 ) );
                        obj.css( 'margin-left', Math.round( obj.parent().innerWidth()/2 - obj.outerWidth()/2 ) );
                    }
                    
                    // match the height while maintaining the aspect ratio
                    function matchHeight(){
                        obj.width( 
                            Math.round( 
                                obj.outerWidth() * obj.parent().innerHeight()/
                                obj.outerHeight() - (obj.outerWidth() - obj.width()) 
                             ) 
                         );
                    }
                    
                    // match the width while maintaining the aspect ratio
                    function matchWidth(){
                        obj.height( 
                            Math.round( obj.outerHeight() * obj.parent().innerWidth()/
                                    obj.outerWidth() - (obj.outerHeight() - obj.height()) ) );
                    }
                
                }
            
            });     //END matched element iterations
        
        }           //END plugin declaration
        
    });             //END new jQuery method attachment
    
})(jQuery);         //END anonymous function wrapper
