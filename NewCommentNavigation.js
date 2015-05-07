// ==UserScript==
// @name govnokod: New comments navigation
// @namespace govnokod
// @description Logs changed topics.
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 1.0.0
// @grant none
// ==/UserScript==

var current = -1;
var newCommentsLinks = [];

function next() {
    current = (current === newCommentsLinks.length -1)? 0:current +1;
    goTo(newCommentsLinks[current]);
}

function previous() {
    current = (current <= 0)? newCommentsLinks.length -1:current -1;
    goTo(newCommentsLinks[current]);
}
function toParent() {
    goTo($(newCommentsLinks[current]).parents('.hcomment')[0]);
}

function toCurrent() {
    goTo(newCommentsLinks[current]);
}

function goTo(comment) {
    location.href = $(comment).find(".entry-info").children('a')[0].href;
}

if(window.location.pathname.match(/^\/\d+/)){
    
    newCommentsLinks = $(".new").add(".highlight").parent('.hcomment');
    
    if( newCommentsLinks.length>0 ) 
    {
        $(document).keydown(
            
            function(e) {
                if(e.target.type === 'textarea') return;
                if(e.keyCode === 68) next();
                if(e.keyCode === 65) previous();
                if(e.keyCode === 87) toParent();
                if(e.keyCode === 83) toCurrent();
            });
    }

}