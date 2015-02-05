// ==UserScript==
// @name         Beautiful Comments
// @namespace    -
// @version      1.0
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==
var BeautifulComments = function(){
	$("div.entry-comment-hidden").removeClass('entry-comment-hidden');

	$("div.entry-comments ul .hcomment ul").css("margin-left","0.5em");

	$(".hcomment").css({"border-width":"1px 0px 1px 1px",
                    "border-style":"solid","border-color":"#000000",});
};

$(document).ajaxComplete(BeautifulComments);
BeautifulComments();

