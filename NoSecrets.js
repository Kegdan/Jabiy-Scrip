// ==UserScript==
// @name         Govnokod: NoSecrets
// @namespace    -
// @version      1.0
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==

var noSecrets = function (){
    $('span').each(function(){
        if($(this).css('color') === 'white')
            $(this).css('background-color','black')
            }
    )
};

$(document).ajaxComplete(noSecrets);
noSecrets();