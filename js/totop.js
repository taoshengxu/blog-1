// build time:Wed May 30 2018 16:34:00 GMT+0800 (中国标准时间)
(function(r){var a=1e3;var n=r("#totop");var o=500;r(window).scroll(function(){var o=r(document).scrollTop();if(o>a){r(n).stop().fadeTo(300,1)}else{r(n).stop().fadeTo(300,0)}});r(n).click(function(){r("html, body").animate({scrollTop:0},o);return false})})(jQuery);var $searchWrap=$("#search-form-wrap"),isSearchAnim=false,searchAnimDuration=200;var startSearchAnim=function(){isSearchAnim=true};var stopSearchAnim=function(r){setTimeout(function(){isSearchAnim=false;r&&r()},searchAnimDuration)};$("#nav-search-btn").on("click",function(){if(isSearchAnim)return;startSearchAnim();$searchWrap.addClass("on");stopSearchAnim(function(){$(".search-form-input").focus()})});$(".search-form-input").on("blur",function(){startSearchAnim();$searchWrap.removeClass("on");stopSearchAnim()});
//rebuild by neat 