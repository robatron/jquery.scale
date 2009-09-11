/**
 * jQuery.scale plugin
 * Copyright (c) 2009 Oregon State Univerisity - info(at)osuosl.org | osuosl.org
 * licensed under GPLv3.
 * Date: 9/4/2009
 *
 * @projectDescription jQuery extension for resizing an object maintaining the aspect ratio
 * @author Rob McGuire-Dale -  rob.mcguiredale@gmail.com
 * @version 1.0
 *
 * @id jQuery.scale
 * @id jQuery.fn.scale
 * @param {String} Resize object to fit inside its parent object maintaining the aspect ratio. Optionally, one may enter ["fill"] to expand the object to fill its parent maintaining aspect ratio.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 */

jQuery.fn.scale = function( fill )
{       
    console.log( "Proportionally scaling stuff..." );
    
    // grab the parent's height and width
    height = this.parent().height();
    width = this.parent().width();
    
    // if the user did not supply the "fill" option, resize the object to fit 
    // inside its parent
    if( fill != "fill" ){
    
        console.log( "Resizing in 'fit' mode" );
    
        // Object too tall, but width is fine. Need to shorten.
        if( this.outerHeight( true ) > height && this.outerWidth( true ) < width ){
            
            console.log( "Object too tall, but width is fine. Need to shorten." );
            
            matchHeight( this );       
        }
        
        // Object too wide, but height is fine. Need to diet.
        else if( this.outerWidth( true ) > width && this.outerHeight( true ) < height ){
            
            console.log( "Object too wide, but height is fine. Need to diet." );
            
            matchWidth( this );    
        }
        
        // Object too short and skinny. Need to match the dimenstion that is
        // closer to being correct.
        else if( this.outerWidth( true ) < width && this.outerHeight( true ) < height ){
        
            console.log( "Object too short and skinny." );
                   
            if( Math.abs(height - this.outerHeight( true )) < Math.abs(width - this.outerWidth( true )) ){
                
                console.log( "Height is closer to being correct." );
                
                matchWidth( this );
                
            } else {
            
                console.log( "Width is closer to being correct." );
                
                matchHeight( this );
            }
        
        // Object too tall and wide. Need to match the dimenstion that is
        // further from being correct.
        } else if( this.outerWidth( true ) > width && this.outerHeight( true ) > height ){
        
            console.log( "Object too tall and wide." );
                   
            if( Math.abs(height - this.outerHeight( true )) > Math.abs(width - this.outerWidth( true )) ){
                
                console.log( "Height is further from being correct." );
                
                matchHeight( this );
                
            } else {
            
                console.log( "Width is further from being correct." );
                
                matchWidth( this );
            }
        }
        
    // if the user *did* supply the "fill" option, resize the object to 
    // completely fill its parent
    } else {

        console.log( "Resizing in 'fill' mode" );

        // Object too skinny, but height is fine. Need to widen.
        if( this.outerHeight( true ) > height && this.outerWidth( true ) < width ){
            
            console.log( "Object too tall, but width is fine. Need to shorten." );
            
            matchWidth( this );       
        }
        
        // Object too short, but width is fine. Need to make taller.
        else if( this.outerWidth( true ) > width && this.outerHeight( true ) < height ){
            
            console.log( "Object too wide, but height is fine. Need to diet." );
            
            matchHeight( this );    
        }
        
        // Object too short and skinny. Need to match the dimenstion that is
        // further from being correct.
        else if( this.outerWidth( true ) < width && this.outerHeight( true ) < height ){
        
            console.log( "Object too short and skinny." );
                   
            if( Math.abs(height - this.outerHeight( true )) > Math.abs(width - this.outerWidth( true )) ){
                
                console.log( "Height is further from being correct." );
                
                matchHeight( this );
                
            } else {
            
                console.log( "Width is further from being correct." );
                
                matchWidth( this );
            }
        
        // Object too tall and wide. Need to match the dimenstion that is
        // closer to being correct.
        } else if( this.outerWidth( true ) > width && this.outerHeight( true ) > height ){
        
            console.log( "Object too tall and wide." );
                   
            if( Math.abs(height() - this.outerHeight( true )) < Math.abs(width() - this.outerWidth( true )) ){
                
                console.log( "Height is closer to being correct." );
                
                matchHeight( this );
                
            } else {
            
                console.log( "Width is closer to being correct." );
                
                matchWidth( this );
            }
        }
    }
     
    // match the height while maintaining the aspect ratio
    function matchHeight( obj ){
       console.log( "Adjusting height." );
       obj.width( obj.width() * height/obj.height() );
       obj.height( height );
    }
     
    // match the width while maintaining the aspect ratio
    function matchWidth( obj ){
       console.log( "Adjusting width." );
       obj.height( obj.height() * width/obj.width() );
       obj.width( width ); 
    }

    console.log("... Done safely resizing stuff.");

    // return this object for chaining    
    return this;
};
