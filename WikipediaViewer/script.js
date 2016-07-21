$(function() {

  $('.search-input').focus();
  $('.search-input').val("");

  function searchWiki(value) {
    if (!$('ul').empty()) {
      $('ul').empty();
    }

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + value + '&srnamespace=0&srinfo=suggestion&srprop=snippet&srlimit=10&callback=?',
      dataType: 'jsonp',
      type: 'get',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
    }).done(function(data) {
      $('.results').empty();
      var resultsArr = data.query.search;
      resultsArr.forEach(function(item) {
        title = item.title;
        summary = item.snippet;
        link = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(title);

        var resultItem = '<a href="' + link + '" ><div class="result-item animated bounceInUp"><h3 class="item-title">' + title + '</h3><p class="item-summary">' + summary + '</p></div></a>';
        $('.results').append(resultItem);
        $('.search-input').blur();

      })
    });
  }

  var count = 0;

  $('.search-input').on('keyup', function(event) {    
    $('.results').empty();
    var value = $('.search-input').val();
    count++;

    if (event.keyCode !== 13) {
      $('.results').empty();
    }

    if (value.length === 0) {
      $('.results').empty();
      $('ul').empty();
    }

    if (event.keyCode == 13 && value.length !== 0) {
      searchWiki(value);
      $('ul').empty();
    } else {

      if (count > 1 && count % 2 === 0 && value.length > 0) {
        $.ajax({
          url: "http://en.wikipedia.org/w/api.php",
          dataType: "jsonp",
          data: {
            'action': "opensearch",
            'format': "json",
            'search': value
          },
          success: function(result) {
            $('ul').empty();
            result[1].forEach(function(suggest) {
              var option = '<li tabindex="0">' + suggest + '</li>';
              $('ul').append(option);
            });

            $('li').on('click', function() {
              var liValue = $(this).text();
              $('.search-input').val(liValue).focus();
              searchWiki($('.search-input').val());
            })

            $('li').on('keyup', function(ev) {
              if (event.keyCode == 13) {
                var liValue = $(this).text();
                $('.search-input').val(liValue).focus();
                searchWiki($('.search-input').val());
              }
            })
          }
        });
      }
    }
  })

  $('.surprise').on('click', function() {
    var random = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    var letter = String.fromCharCode(random);
    var randomLi = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + letter + '&srnamespace=0&srinfo=suggestion&srprop=snippet&srlimit=10&callback=?',
      dataType: 'jsonp',
      type: 'get',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
    }).done(function(data) {
      $('.results').empty();
      var resultsArr = data.query.search;
      window.location.href = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(resultsArr[randomLi].title);
    });
  })

});