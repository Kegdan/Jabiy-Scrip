// ==UserScript==
// @name         Govnokod: Clickable URL
// @namespace    -
// @version      1.0
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==

$('.comment-text').each(function (_,x){x.innerHTML = x.innerHTML.replace(/(https?:\/\/[^<> \t\n]+)/g,"<a href='$1'>$1</a>")})