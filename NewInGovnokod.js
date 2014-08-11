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
  
  switch(window.location.pathname){
  case '/comments':
   appendPosts($('.published').filter(function() {return new Date($(this).attr('title')) >= new Date(ls.time);}).parents('li.hentry'));
    ls.time = new Date().toString();
    break;
  case '/':
    // удаляем все, что видим - потом добавляем все, у которых есть новые комменты (в js нуб может можно лучше сделать)
    removePosts($('li.hentry'))
    appendPosts($('.entry-comments-new').parents('li.hentry'));
    
    break;
    
  case '/user/login':
    // кабинка - если есть список постов, отображаем
    
    if(!ls.posts){ 
      $('li.hentry')
        .append('<div class="user-changed-posts"><br/>Непрочитанных постов нет</div>"');
      break;
    }
    
    // добавляем к страницк список постов 
    $('li.hentry')
      .append('<div class="user-changed-posts"><br/>Непрочитанные посты: <tt>"' + 
        String(ls.posts).replace(/\d+/g, '<a href="/$&">$&</a>') + // формируем ссылки, если вдруг захочется кликнуть
        '"</tt> </div>');
    break;
    
   default:
    // на странице - значит прочитали - в адъ ее
    removePosts($('li.hentry'));
    break;
  }
     // обратно загоняем посты в localStorage
    ls.posts = pack(posts);
})();