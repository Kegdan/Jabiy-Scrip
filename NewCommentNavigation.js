// ==UserScript==
// @name govnokod: New comments navigation
// @namespace govnokod
// @description Logs changed topics.
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 1.0.0
// @grant none
// ==/UserScript==

var current = 0;
var newCommentsLinks = [];

function next() {
    location.href = newCommentsLinks[current];
    current = (current === newCommentsLinks.length -1)?0:current+1;
    
}

function previous() {
    location.href = newCommentsLinks[current];
    current = (current === 0)?newCommentsLinks.length -1:current-1;
    
}

if(window.location.pathname.match(/^\/\d+/)){
    
    newCommentsLinks = $(".new").add(".highlight").map(function(){return $(this).find(".entry-info").children('a')[0].href;});
    
    if( newCommentsLinks.length>0 ) 
    {
        $(document).keydown(
            function(e) {
                if(e.keyCode === 39) next();
                if(e.keyCode === 37) previous();
            });
    }

}
