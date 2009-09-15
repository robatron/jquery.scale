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
 */

jQuery.fn.scale = function( center )
{    
    // Object too tall, but width is fine. Need to shorten.
    if( this.outerHeight() > this.parent().innerHeight() && 
        this.outerWidth() < this.parent().innerWidth() ){
 
        matchHeight( this );       
    }
    
    // Object too wide, but height is fine. Need to diet.
    else if( this.outerWidth() > this.parent().innerWidth() && 
             this.outerHeight() < this.parent().innerHeight() ){

        matchWidth( this );    
    }
    
    // Object too short and skinny. Need to match the dimenstion that is
    // closer to being correct.
    else if( this.outerWidth() < this.parent().innerWidth() && 
             this.outerHeight() < this.parent().innerHeight() ){
      
        if( Math.abs(this.parent().innerHeight() - this.outerHeight()) <= 
            Math.abs(this.parent().innerWidth() - this.outerWidth()) ){
            
            matchHeight( this );
            
        } else matchWidth( this );
    
    // Object too tall and wide. Need to match the dimenstion that is
    // further from being correct.
    } else if( this.outerWidth() > this.parent().innerWidth() && 
               this.outerHeight() > this.parent().innerHeight() ){
               
        if( Math.abs(this.parent().innerHeight() - this.outerHeight()) > 
            Math.abs(this.parent().innerWidth() - this.outerWidth()) ){
            
            matchHeight( this );
            
        } else matchWidth( this );

    }//else, object is the same size  as the parent. Do nothing.

    // if the center option is enabled, also center the object within the parent
    if( center == "center" ){
        this.css( 'position', 'relative' );
        this.css( 'margin-top', this.parent().innerHeight()/2 - 
                  this.outerHeight()/2 );
        this.css( 'margin-left', this.parent().innerWidth()/2 - 
                  this.outerWidth()/2 );
    }
    
    // match the height while maintaining the aspect ratio
    function matchHeight( obj )
        obj.width( obj.outerWidth() * obj.parent().innerHeight()/
                   obj.outerHeight() - (obj.outerWidth() - obj.width()) );
     
    // match the width while maintaining the aspect ratio
    function matchWidth( obj )
        obj.height( obj.outerHeight() * obj.parent().innerWidth()/
                    obj.outerWidth() - (obj.outerHeight() - obj.height()) );

    // return this object for chaining    
    return this;
};
