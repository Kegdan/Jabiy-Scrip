// ==UserScript==
// @name         Govnokod: Beautiful Comments
// @namespace    -
// @version      2.3
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==

var colors = ["#FFCCCC","#FFCC66","#FFFF99","#66FF99","#CCFFFF","#99CCFF","#CC99FF"];

var colorFunc = function(elem, i){
    $(elem).css("background-color",colors[i]);
    var chs =  $(elem).children().children('.hcomment');
    if(chs.length>0) chs.each( function() {colorFunc($(this), i===6? 0: i+1)});

};

var BeautifulComments = function(){
    $("div.entry-comment-hidden").removeClass('entry-comment-hidden');

    $("div.entry-comments ul .hcomment ul").css("margin-left","0.5em");

    $(".hcomment").css({"border-width":"1px 0px 1px 1px",
                        "border-style":"solid","border-color":"#000000"});
    colorFunc($(".entry-comments"),-1);

    $(".entry-comments").children("ul").children(".hcomment").css("border-right-width","1px");
    $("div").css("background-color",$("div").css("background-color"));
    $(".published").css("color","#000000");

    $(".new").parent().css({"border-style":"solid", "border-width": "3px 0px 3px 3px", "border-color":"green"});
    $(".highlight").parent().css({"border-style":"solid", "border-width": "3px 0px 3px 3px", "border-color":"red"});

};

$(document).ajaxComplete(BeautifulComments);
BeautifulComments();

