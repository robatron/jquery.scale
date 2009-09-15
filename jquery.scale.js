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
 * @param {String} Resize object to fit inside its parent object maintaining the aspect ratio.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 */

jQuery.fn.scale = function( center )
{       
    console.log( "Proportionally scaling stuff..." );
    
    // Object too tall, but width is fine. Need to shorten.
    if( this.outerHeight() > this.parent().innerHeight() && 
        this.outerWidth() < this.parent().innerWidth() ){
        
        console.log( "Object too tall, but width is fine. Need to shorten." );
        
        matchHeight( this );       
    }
    
    // Object too wide, but height is fine. Need to diet.
    else if( this.outerWidth() > this.parent().innerWidth() && 
             this.outerHeight() < this.parent().innerHeight() ){
        
        console.log( "Object too wide, but height is fine. Need to diet." );
        
        matchWidth( this );    
    }
    
    // Object too short and skinny. Need to match the dimenstion that is
    // closer to being correct.
    else if( this.outerWidth() < this.parent().innerWidth() && 
             this.outerHeight() < this.parent().innerHeight() ){
    
        console.log( "Object too short and skinny." );
               
        if( Math.abs(this.parent().innerHeight() - this.outerHeight()) <= 
            Math.abs(this.parent().innerWidth() - this.outerWidth()) ){
            
            console.log( "Height is closer to being correct OR height and " +
                         "width are equally distant." );
            
            matchHeight( this );
            
        } else {
        
            console.log( "Width is closer to being correct." );
            
            matchWidth( this );
        }
    
    // Object too tall and wide. Need to match the dimenstion that is
    // further from being correct.
    } else if( this.outerWidth() > this.parent().innerWidth() && 
               this.outerHeight() > this.parent().innerHeight() ){
    
        console.log( "Object too tall and wide." );
               
        if( Math.abs(this.parent().innerHeight() - this.outerHeight()) > 
            Math.abs(this.parent().innerWidth() - this.outerWidth()) ){
            
            console.log( "Height is further from being correct." );
            
            matchHeight( this );
            
        } else {
        
            console.log( "Width is further from being correct OR height and " +
                         "width are equally distant." );
            
            matchWidth( this );
        }
    } else 
        console.log( "Object is the exact same size as parent. Do nothing." );

    // if the center option is enabled, also center the object within the parent
    if( center == "center" ){
        this.css( 'position', 'relative' );
        this.css( 'margin-top', this.parent().innerHeight()/2 - 
                  this.outerHeight()/2 );
        this.css( 'margin-left', this.parent().innerWidth()/2 - 
                  this.outerWidth()/2 );
    }
    
    // match the height while maintaining the aspect ratio
    function matchHeight( obj ){
        console.log( "Adjusting height." );
        
        obj.width( obj.outerWidth() * obj.parent().innerHeight()/
                   obj.outerHeight() - (obj.outerWidth() - obj.width()) );
    }
     
    // match the width while maintaining the aspect ratio
    function matchWidth( obj ){
        console.log( "Adjusting width." );

        obj.height( obj.outerHeight() * obj.parent().innerWidth()/
                    obj.outerWidth() - (obj.outerHeight() - obj.height()) );
    }

    console.log("... Done proportionally scaling stuff.");

    // return this object for chaining    
    return this;
};
