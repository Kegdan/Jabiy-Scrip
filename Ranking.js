// ==UserScript==
// @name         Govnokod: Ranking
// @namespace    -
// @version      1.1
// @description  Use it, anonimus!
// @author       Kegdan
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @grant        none
// ==/UserScript==

var ids = $('.entry-author a').map(function(_,x){return x.href.replace(/.*\/(\d+)/,'$1')*1});
var max = Math.max.apply(Math,ids);
var min = Math.min.apply(Math,ids);
$('.entry-author a').each(function(i,x){x.style.color = 'rgb(0,'+Math.floor(((ids[i] - min)*255)/(max-min))+', 0)'})