// ==UserScript==
// @name govnokod: New comments
// @namespace govnokod
// @description Logs changed topics.
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 1.0.0
// @grant none
// ==/UserScript==

function openAll() {
    $('.user-changed-posts a').each( function(_,x){window.open(x.href, '_blank');
});}
 
function pack(obj){
  var posts = Object.keys(obj).sort(function(x, y){ return x-y; });
    
  if(!posts.length)
      return '';
  return posts.join(' ');
}
  
  
function unpack(str){
    var obj = {};
    str.split(' ').map(function(group){
        obj[group] = true;
    });
    return obj;
}
  
function appendPosts($from){

    // выбираем все ссылки на пост в $from
$from.find('.entry-info').children('a').each(function(_,x){
      var link = x.href.match(/\d+#comment\d+$/); // вырезаем номер из http://govnokod.ru/номер
      if(link) posts[link] = true;
      else console.error('Invalid entry-title', x);
  });
}


function removePosts($from){
    // выбираем все ссылки на пост в $from
    $from.find('a.entry-title').each(function(_,x){
      var link = x.href.match(/\d+$/); // вырезаем номер из http://govnokod.ru/номер
       var re = new RegExp("^"+link,"g");
       Object.keys(posts).forEach(function(a){ if (a.match(re)) delete posts[a]});
    });
}

var ls = window.localStorage || {};
var posts = unpack(ls.posts || '');
  
if(window.location.pathname == '/comments'){
    appendPosts($('.published').filter(function() {return new Date($(this).attr('title')) >= new Date(ls.time);}).parents('li.hentry'));
    ls.time = new Date().toString();
    var login = $('#expand-trigger').text().match(/Привет,\s(.+)!$/)[1];
     removePosts( $('.entry-author').find('a:contains('+login+')').parents('li.hentry'))     ;
}else
    if (window.location.pathname.match(/\/\d+/)) {
        removePosts($('li.hentry'));}

ls.posts = pack(posts);
if(!ls.posts){ 
    $('#header').append('<div class="user-changed-posts"><br/>Непрочитанных постов нет</div>');
}else{
    $('#header')
      .append('<div class="user-changed-posts"><br/>Непрочитанные посты: <tt>' + 
        String(ls.posts).replace(/\d+#comment\d+/g, '<a href=http://govnokod.ru/$&>$&</a>') + // формируем ссылки, если вдруг захочется кликнуть
              '</tt> </div>').append('<br/><button class="openAllB">Открыть все</button>');
    $('.openAllB')[0].addEventListener("click", openAll);
}
    
