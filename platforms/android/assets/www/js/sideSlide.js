/*Jquery - Plugin SideSlide*/

$.fn.sideSlide = function(options){
    var $self = $(this);
    var $pages = $self.children('.page');    
    var $menu = $pages.find('h1');
    var $current = $($pages[0]);
    var leftPad = 100;
    
    $current.addClass('current');
    
    var $menuBar = $(this)
        .prepend(
            $('<div />', {
                class: 'menu-ball-space'
            })
    );
    
    var $menuBallSpace = $menuBar.find('.menu-ball-space');
    
    $menuBallSpace.append($('<span />', {class: 'page-ball active'}));
    
    var $activeBall = $menuBallSpace.find('.active');
    
    var scroll = function(index){

        var $last = $current;
        $last.removeClass('current');
        $current = $($pages[index]);

        if (!$current.hasClass('current')){
                    
            // console.log( index * $(window).width());
            // $('#app').scrollLeft( 1000)

            $('#app').animate({
                scrollLeft: index * $(window).width()
            }, 1000);
            
            $activeBall.stop().animate({
                left: index * 2 + 'rem'
            })
            
            $current.addClass('current');    
        }       
        
                
    }    
    
    $.each($pages, function(index, page){

        $menuBallSpace.append(
            $('<a/>', { 
                class: 'page-ball' 
            })
        );
        
        if (index > 0){
            $(page).css('left', leftPad + '%');
            leftPad += 100;
            
            Hammer(page).on('swiperight', function(){
                scroll(index - 1);      
            });
        }        
        
        Hammer(page).on('swipeleft', function(){
            if (index < $pages.length - 1){
                scroll(index + 1);                      
            }
        });         
    });  
}



