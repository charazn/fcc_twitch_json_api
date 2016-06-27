$(document).ready(function() {

  var user_names = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var users = [];
  var streams = [];

  user_names.forEach(function(user_name) {
    $.getJSON('https://api.twitch.tv/kraken/'+'streams'+'/'+user_name+'?callback=?', function(stream_data) {
      if (stream_data.stream !== null) {
        console.log(stream_data);
        var game = stream_data.stream.game;
        $.getJSON('https://api.twitch.tv/kraken/'+'users'+'/'+user_name+'?callback=?', function(user_data) {
          var logo = user_data.logo;
          var display_name = user_data.display_name;
          $('#all ul, #online ul, #offline ul').prepend('<li class="list-group-item online"><div class="row"><div class="col-md-2"><img class="img-circle img-responsive" src="'+logo+'"></div><div class="col-md-3"><a href="http://www.twitch.tv/'+user_name+'" target="_blank">'+display_name+'</a></div><div class="col-md-7">'+game+'</div></div></li>');
        });
      }
      if (stream_data.stream === null) {
        $.getJSON('https://api.twitch.tv/kraken/'+'users'+'/'+user_name+'?callback=?', function(data) {
          var logo = data.logo;
          var display_name = data.display_name;
          $('#all ul, #online ul, #offline ul').append('<li class="list-group-item offline"><div class="row"><div class="col-md-2"><img class="img-circle img-responsive" src="'+logo+'"></div><div class="col-md-3"><a href="http://www.twitch.tv/'+user_name+'" target="_blank">'+display_name+'</a></div><div class="col-md-7">Offline</div></div></li>');
        });
      }
    });
  });

  $('a[href="#all"]').click(function() {
    $('.online, .offline').removeClass('hidden');
  });

  $('a[href="#online"]').click(function() {
    $('.offline').addClass('hidden');
    $('.online').removeClass('hidden');
  });

  $('a[href="#offline"]').click(function() {
    $('.online').addClass('hidden');
    $('.offline').removeClass('hidden');
  });

});
