
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting'); 
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ',' + city;
    // YOUR CODE GOES HERE!
    var img = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
    $body.append('<img class="bgimg" src="'+img+'">');
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "b6eb71913fc44f31ac1786709a61d28f",
  'q': city
});
    $.getJSON( url, function(data){
          $nytHeaderElem.text('New York Times Articles About' + city);
          var articals = data.response.docs;
          for (var i = 0; i < articals.length; i++) {
              var artical = articals[i];
              $nytElem.append('<li class="article">'+'<a href="'+artical.web_url+'">'
                +artical.headline.main+'</a>'+
                '<p>'+ artical.snippet + '</p>'+"</li>")
          };
    }).error(function(){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded'); 
    });
    var wikiSetTimeout = setTimeout(function(){
        $wikiElem.text('Failed')
    },8000);
    var wiki = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
    $.ajax({
        url:wiki,
        dataType: "jsonp",
        success: function(response){
            var articals = response[1];
            for (var i = 0; i < articals.length; i++) {
                var artical = articals[i];
                var url = 'https://en.wikipedia.org/wiki/'+artical;
                $wikiElem.append('<li><a href="'+url+'">'+artical+'</a>'+'</li>')
            };
            clearTimeout(wikiSetTimeout);
        }
    })


    return false;
};

$('#form-container').submit(loadData);
