/**
 * 
 */
var Menu = function() {	
	/* Handle sidebar menu */
    var handleSidebarMenu = function() {
    	/* menu-side下li内 a标签被点击*/
        $('.menu-side').on('click', 'li>a', function(e) {        	
        	/*其父元素（menu-side）的首个ul子元素 */
        	var menuTop = $('.menu-side ul:first-child');/* 一级 ul*/        	
        	menuTop.find('li.active').removeClass('active');
        	$(this).parent().addClass("active");
        	
        	/* a标签后面的ul元素是否有menu-sub */
        	if ($(this).next().hasClass('menu-sub') === false) {                
                return;
            }
        	var parent = $(this).parent().parent();/* 上(一)级 ul*/
            var the = $(this);/* 当前a*/
        	var sub = $(this).next();/* 下级(二)级ul*/
        	
        	
        	var autoScroll = menuTop.data("auto-scroll");
            var slideSpeed = parseInt(menuTop.data("slide-speed"));
            var keepExpand = menuTop.data("keep-expanded");
            
            if (keepExpand !== true) {
            	/*关闭其他已经打开的菜单 */
                parent.children('li.open').children('a').children('.arrow').removeClass('open');
                parent.children('li.open').children('.menu-sub:not(.always-open)').slideUp(slideSpeed);
                parent.children('li.open').removeClass('open');
            }
            var slideOffeset = -200;
            /* is() 方法用于查看选择的元素是否匹配选择器。:visible 选择器选取每个当前是可见的元素*/
            if (sub.is(":visible")) {
                $('.arrow', $(this)).removeClass("open");
                $(this).parent().removeClass("open");
                /* slideUp函数通过使用滑动效果，隐藏被选元素，如果元素已显示出来的话*/
                sub.slideUp(slideSpeed, function() {
                    if (autoScroll === true ) {
                        if ($('body').hasClass('menu-side-fixed')) {
                        	/*need jquery.slimscroll.min.js */
                        	/*
                        	menuTop.slimScroll({
                                'scrollTo': (the.position()).top
                            }); */
                        } else {
                        	Menu.scrollTo(the, slideOffeset);
                        }
                    }
                    //handleSidebarAndContentHeight();
                });
            } else {
                $('.arrow', $(this)).addClass("open");
                $(this).parent().addClass("open");
                /* slideDown() 方法通过使用滑动效果，显示隐藏的被选元素。*/
                sub.slideDown(slideSpeed, function() {
                    if (autoScroll === true ) {
                        if ($('body').hasClass('menu-side-fixed')) {
                        	/*
                            menuTop.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                            */
                        } else {
                        	Menu.scrollTo(the, slideOffeset);
                        }
                    }
                    //handleSidebarAndContentHeight();
                });
            }

            e.preventDefault();
            
        });        
    }
    
    return {
    	init: function () { 
    		
    		/*menu-search */
    		$('.menu-float').on('click', '.menu-search', function(e) {
                $(this).addClass("open");
                $(this).find('.form-control').focus();

                $('.menu-float .menu-search .form-control').on('blur', function(e) {
                    $(this).closest('.menu-search').removeClass("open");
                    $(this).unbind("blur");
                });
            });
    		// handle hor menu search form on enter press
            $('.menu-float').on('keypress', '.menu-search .form-control', function(e) {
                if (e.which == 13) {
                    $(this).closest('.menu-search').submit();
                    return false;
                }
            });

            // handle header search button click
            $('.menu-float').on('mousedown', '.menu-search.open .submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).closest('.menu-search').submit();
            });
            
    		
    		handleSidebarMenu(); // handles main menu    		
    		
    		$(".menu-tabs li a").hover(function(){    			
    			var ipos = $(this).parent().index();//li
    			var topmenu=$(this).parent().parent();
    			topmenu.children().removeClass("active");
    			//$('li', topmenu).removeClass("active");
    			$(this).parent().addClass("active");
    			$(".menu-tabs-content").children().removeClass("active");
    			var tabcontent=$(".menu-tabs-content ul:eq("+ipos+")");
    			if(tabcontent)
    			{
    				tabcontent.addClass("active");
    			}
    		},function(){
    			
    		});
    		
    		/*
    		$(".menu-panel-push ul li").hover(function(){
    			$(this).find("div").stop().animate({"width":"140px"},200).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#ae1c1c"})	
    		},function(){
    			$(this).find("div").stop().animate({"width":"54px"},200).css({"opacity":"0.8","filter":"Alpha(opacity=80)","background":"#000"})	
    		});
			*/
    		
    		if( $('.menu-panel').length > 0 ) {
				var stretchyNavs = $('.menu-panel');				
				stretchyNavs.each(function(){
					var stretchyNav = $(this),
						stretchyNavTrigger = stretchyNav.find('.menu-panel-trigger');
					
					stretchyNavTrigger.on('click', function(event){
						event.preventDefault();
						stretchyNav.toggleClass('nav-is-visible');
					});
				});

				$(document).on('click', function(event){
					( !$(event.target).is('.menu-panel-trigger') && !$(event.target).is('.menu-panel-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
				});
			}
        },
     // function to scroll(focus) to an element
        scrollTo: function(el, offeset) {
            /* var pos = (el && el.size() > 0) ? el.offset().top : 0;*/
            var pos = (el && el.length > 0) ? el.offset().top : 0;

            if (el) {                
                pos = pos + (offeset ? offeset : -1 * el.height());
            }

            $('html,body').animate({
                scrollTop: pos
            }, 'slow');
        },
     // function to scroll to the top
        scrollTop: function() {
            scrollTo();
        }
    };
}();


jQuery(document).ready(function() {    
	Menu.init(); // init core componets
});

