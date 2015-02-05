// ==UserScript==
// @name         Beautiful Comments
// @namespace    -
// @version      2.0
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==
var i = 0;
var colors = ["#FFCCCC","#FFCC66","#FFFF99","#66FF99","#CCFFFF","#99CCFF","#CC99FF"];
var BeautifulComments = function(){
	$("div.entry-comment-hidden").removeClass('entry-comment-hidden');

	$("div.entry-comments ul .hcomment ul").css("margin-left","0.5em");

	$(".hcomment").css({"border-width":"1px 0px 1px 1px",
                    "border-style":"solid","border-color":"#000000"})
    .each(function (){
        $(this).css("background-color",colors[i]);
        if(i == colors.length-1) i=0; else i++;
    });
	$("div").css("background-color",$("div").css("background-color"));
    $(".published").css("color","#000000");
};

$(document).ajaxComplete(BeautifulComments);
BeautifulComments();

