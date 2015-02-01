// ==UserScript==
// @name         BigIconInComments
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==
var bigIconInComments = function(){
	$(".entry-comments").find(".avatar").each(
		function() { 
			var newVal = $(this).attr("src").replace(/([^?])\?.*$/, "$1");
      	    newVal = newVal.replace("28.png","100.png");
			$(this).attr("src", newVal)
		}
	).removeClass("avatar");

	
    $(".entry-info").css("margin", "10px");
}

$(document).ajaxComplete(bigIconInComments);
bigIconInComments();