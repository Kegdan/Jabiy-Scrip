// ==UserScript==
// @name         Govnokod: Big Icon In Comments
// @namespace    -
// @version      1.3
// @description  Use it, anonimus
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==
var bigIconInComments = function(){
	$(".entry-comments").find(".avatar").each(
		function() { 
			var newVal = $(this).attr("src").replace(/\?.*$/, "").replace("28.png","100.png");
            $(this).attr("src", newVal).css({"float":"left","margin-right":"10px"}).height(80).width(80);
		}
	).removeClass("avatar");
    
    $(".entry-comment-wrapper").each(
		function() { 
			var text = $(this).find(".entry-comment").css("margin", "10px 0px 0px 0.5em");
            var answer = $(this).find(".answer").css("margin", "0px");
            text.append("<p></p>").append(answer);
		}
	).css("overflow", "auto");
    $(".edit-comment-link").css("margin-left", "0.5em");
    $(".entry-author").css("margin", "0px");
}

$(document).ajaxComplete(bigIconInComments);
bigIconInComments();