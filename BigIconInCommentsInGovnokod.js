// ==UserScript==
// @name         BigIconInCommentsInGovnokod
// @namespace    -
// @version      1.0
// @description  Use it, anonimus
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==
var bigIconInComments = function(){
	$(".entry-comments").find(".avatar").each(
		function() { 
			var newVal = $(this).attr("src").replace(/([^?])\?.*$/, "$1").replace("28.png","100.png");
			$(this).attr("src", newVal).css("float", "left").css("margin", "0px 10px 0px 0px");
		}
	).removeClass("avatar");
    
    $(".entry-comment-wrapper").each(
		function() { 
			var text = $(this).find(".comment-text");
            var answer = $(this).find(".answer").css("margin", "0px 0px 0px 0px");
            text.append("<p></p>").append(answer);
		}
	).css("overflow", "auto");
    
    $(".entry-info").css("margin", "10px");
    $(".entry-comment").css("margin", "10px 0px 0px 10px");
    $(".entry-author").css("margin", "0px");
}

$(document).ajaxComplete(bigIconInComments);
bigIconInComments();