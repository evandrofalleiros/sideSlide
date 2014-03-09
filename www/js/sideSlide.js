/*Jquery - Plugin SideSlide*/

$.fn.sideSlide = function(options){
    var $self = $(this);
    var $pages = $self.children('.page');  
    var $current = $($pages[0]);
    var leftPad = 100;
    var currentIndex = 0;

    /* Bind keyboard arrows: keyboar page nav
        37 - left
        38 - up
        39 - right
        40 - down
    */

    $(document).keydown(function(e){
        switch(e.keyCode){
            case 37:
                scroll(currentIndex - 1);
                break;
            case 39:
                scroll(currentIndex + 1)
                break;
        }
        
        return false;        
    });
    
    $current.addClass('current');
    
    var $menuBar = $(this)
        .prepend(
            $('<div />', {
                class: 'menu-ball-space'
            })
    );
    
    var $menuBallSpace = $menuBar
        .find('.menu-ball-space')
        .append($('<span />', {
            class: 'page-ball active'
        }));
    
    var $activeBall = $menuBallSpace.find('.active');
        
    $.each($pages, function(index, page){

        $menuBallSpace.append(
            $('<a/>', { 
                class: 'page-ball' 
            })
        );
        
        if (index > 0){
            $(page)
                .css('left', leftPad + '%')
                .find('[position="absolute"], [position="fixed"]')
                .css('marginLeft', leftPad + '%');

                // $(page)
                // .css('left', leftPad + '%')
                // .find('header.descricao-container > *')
                // .css('marginLeft', leftPad + '%')
                // .find('.list-title')
                // .css('marginLeft', leftPad + '%');

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

    var scroll = function(index){
        if (index < 0 || index > $pages.length - 1){
            return false;
        }

        currentIndex = index;

        var $last = $current.removeClass('current');
        $current = $($pages[index]).addClass('current');

        $(function () {        
            $('#app').animate({
                scrollLeft: index * $(window).width()
            }, 500 );

            $('li.list-title', $last).animate({
                marginLeft: - index * 100  + '%'
            }, 300 );

            $('li.list-title', $current).animate({
                marginLeft: - index * 100  + '%'
            }, 300 );
            

            $('header.descricao-container *', $current).animate({
                marginLeft: - index * 100  + '%'
            }, 300 );

            $('header.descricao-container *', $last).animate({
                marginLeft: - index * 100  + '%'
            }, 300 );
            
            $activeBall.stop().animate({
                left: index * 2 + 'rem'
            }); 
        });              
    }    
}



