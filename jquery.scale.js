/**
 * jQuery.scale plugin
 * Copyright (c) 2009 Oregon State Univerisity - info(at)osuosl.org | osuosl.org
 * licensed under GPLv3.
 * Date: 9/4/2009
 *
 * @projectDescription jQuery extension for scaling an object inside its parent while maintaining the aspect ratio
 * @author Rob McGuire-Dale -  rob.mcguiredale@gmail.com
 * @version 1.0
 *
 * @id jQuery.scale
 * @id jQuery.fn.scale
 * @param {String} Resize object to fit inside its parent object maintaining the aspect ratio.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 */

jQuery.fn.scale = function()
{       
    console.log( "Proportionally scaling stuff..." );
    
    // grab the object and parent's height and width
    oHeight = this.outerHeight( true );
    oWidth = this.outerWidth( true );
    pHeight = this.parent().innerHeight();
    pWidth = this.parent().innerWidth();
    
    // Object too tall, but width is fine. Need to shorten.
    if( oHeight > pHeight && oWidth < pWidth ){
        
        console.log( "Object too tall, but width is fine. Need to shorten." );
        
        matchHeight( this );       
    }
    
    // Object too wide, but height is fine. Need to diet.
    else if( oWidth > pWidth && oHeight < pHeight ){
        
        console.log( "Object too wide, but height is fine. Need to diet." );
        
        matchWidth( this );    
    }
    
    // Object too short and skinny. Need to match the dimenstion that is
    // closer to being correct.
    else if( oWidth < pWidth && oHeight < pHeight ){
    
        console.log( "Object too short and skinny." );
               
        if( Math.abs(pHeight - oHeight) < Math.abs(pWidth - oWidth) ){
            
            console.log( "Height is closer to being correct." );
            
            matchWidth( this );
            
        } else {
        
            console.log( "Width is closer to being correct." );
            
            matchHeight( this );
        }
    
    // Object too tall and wide. Need to match the dimenstion that is
    // further from being correct.
    } else if( oWidth > pWidth && oHeight > pHeight ){
    
        console.log( "Object too tall and wide." );
               
        if( Math.abs(pHeight - oHeight) > Math.abs(pWidth - oWidth) ){
            
            console.log( "Height is further from being correct." );
            
            matchHeight( this );
            
        } else {
        
            console.log( "Width is further from being correct." );
            
            matchWidth( this );
        }
    } else 
        console.log( "Object is the exact same size as parent. Do nothing." );
    
    // match the height while maintaining the aspect ratio
    function matchHeight( obj ){
        console.log( "Adjusting height." );
        
        obj.width( oWidth * pHeight/oHeight - (oWidth - obj.width()) );
    }
     
    // match the width while maintaining the aspect ratio
    function matchWidth( obj ){
        console.log( "Adjusting width." );

        obj.height( oHeight * pWidth/oWidth - (oHeight - obj.height()) );
    }

    console.log("... Done safely resizing stuff.");

    // return this object for chaining    
    return this;
};
