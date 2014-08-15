// ==UserScript==
// @name govnokod: post changes
// @namespace govnokod
// @description Logs changed topics.
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 1.0.0
// @grant none
// ==/UserScript==


(function(){

  // пакует объект obj вида {"1":true, "3":true, "4":true, "5":true }
  // в строку вида "1,3..5"
  function pack(obj){
    var posts = Object.keys(obj) // все ключи obj
      .map(function(x){ return +x; }) // преобразуем к числу
      .filter(function(x){ return x > 0 && isFinite(x); }) // и уберём чушь
      .sort(function(x, y){ return x < y ? -1 : x > y ? 1 : 0; }); // отсортируем по возрастанию
      
    if(!posts.length) return '';

    return posts.join(',');
  }
  
  // обратная функция к pack :)
  function unpack(str){
    var obj = {};
    
    // диапазоны нинужны
    str.split(',').map(function(group){
      
        obj[group] = true;
    });
    
    return obj;
  }
  
  // добавляет посты внутри jQuery-коллекции $from
  function appendPosts($from){
  
    // выбираем все ссылки на пост в $from
    $from.find('a.entry-title').each(function(_,x){
      var link = x.href.match(/\d+$/); // вырезаем номер из http://govnokod.ru/номер
      if(link) posts[link[0]] = true;
      else console.error('Invalid entry-title', x);
    });
  }

    // удаляем же
   function removePosts($from){
  
    // выбираем все ссылки на пост в $from
    $from.find('a.entry-title').each(function(_,x){
      var link = x.href.match(/\d+$/); // вырезаем номер из http://govnokod.ru/номер
      if(link) delete posts[link[0]]; // удаляем из хранилища
      else console.error('Invalid entry-title', x);
    });
  }
  
    
  var ls = window.localStorage || {};
  
  // получаем объект с постами из localStorage
    var posts = unpack(ls.posts || '');
  
  if(window.location.pathname == '/comments'){
   appendPosts($('.published').filter(function() {return new Date($(this).attr('title')) >= new Date(ls.time);}).parents('li.hentry'));
    ls.time = new Date().toString();
    var login = $('#expand-trigger').text().match(/Привет,\s(.+)!$/)[1];
     removePosts( $('.entry-author').find('a:contains('+login+')').parents('li.hentry'))     ;
  }else
          if (window.location.pathname.match(/\/\d+/)) {
              removePosts($('li.hentry'));}
          else{
               appendPosts($('.entry-comments-new').parents('li.hentry'));
          }
  
    ls.posts = pack(posts);
    if(!ls.posts){ 
     $('#header')
        .append('<div class="user-changed-posts"><br/>Непрочитанных постов нет</div>');
    }else{
    
    // добавляем к страницк список постов 
    $('#header')
      .append('<div class="user-changed-posts"><br/>Непрочитанные посты: <tt>"' + 
        String(ls.posts).replace(/\d+/g, '<a href="/$&">$&</a>') + // формируем ссылки, если вдруг захочется кликнуть
              '"</tt> </div>');}
     
    
})();