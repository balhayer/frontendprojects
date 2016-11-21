var channels = ['freecodecamp','ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'syndicate', 'riotgames', 'pokemon', 'esl_overwatch', 'reckful', 'BobRoss', 'brunofin', 'comster404'];

$( document ).ready(function() {
  getData();
  $('.online').click(function() {
    $('#t2, #t3').slideUp('400');
    $('#t1').slideDown('400');
  });
  $('.offline').click(function() {
    $('#t1, #t3').slideUp('400')
    $('#t2').slideDown('400');
  });
  $('.all').click(function() {
    $('#t1, #t2, #t3').slideDown('400');
  });
  $('.closed').click(function() {
    $('#t1, #t2').slideUp('400');
    $('#t3').slideDown('400');
  });
});

function getChData(ch, data) {
  var chUrl = 'https://api.twitch.tv/kraken/channels/' + ch;
  $.ajax({
    type: 'GET',
    url: chUrl,
    headers: {
      'Client-ID': 'lgyehk5pqw4c7r7ihuv0pt6g5lq4za9'
    },
    success: function(cdata) {
      if(data.status == 422 | data.status == 404) {
        var inner = "<div class='mdl-list__item mdl-list__item--two-line'><a class='mdl-list__item-primary-content' href='"+ cdata.url +"' target='_blank'><i class='material-icons mdl-list__item-avatar'>account_circle</i><span>"+ ch +"</span><span class='mdl-list__item-sub-title'>Account Closed</span></a><span class='mdl-list__item-secondary-action' ><i class='material-icons'>block</i></span></div>";
        $('#t3').append(inner);
      }
      else if (data.stream == null) {
        var inner =  "<div class='mdl-list__item mdl-list__item--two-line'><a class='mdl-list__item-primary-content' href='"+cdata.url+"' target='_blank'><img class='mdl-list__item-avatar' src='"+cdata.logo+"'/><span>"+ ch +"</span><span class='mdl-list__item-sub-title'>Offline</span></a><span class='mdl-list__item-secondary-action'><i class='material-icons'>remove_circle_outline</i></span></div>";
        $('#t2').append(inner);
      } 
      else {
        var inner = "<div class='mdl-list__item mdl-list__item--two-line'><a class='mdl-list__item-primary-content' href='" + cdata.url + "' target='_blank'><img class='mdl-list__item-avatar' src='" + data.stream.channel.logo + "'/><span>" + ch + "</span><span class='mdl-list__item-sub-title'>Streaming: " + data.stream.channel.status + "</span></a>" + "<span class='mdl-list__item-secondary-action'><i class='material-icons'>public</i></span></div>";
        $('#t1').append(inner);
      }
    }
  });
};


function getData() {
  channels.forEach(function(channel) {
    var url = 'https://api.twitch.tv/kraken/streams/' + channel;
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        'Client-ID': 'lgyehk5pqw4c7r7ihuv0pt6g5lq4za9'
      },
      success: function(data) {
        getChData(channel, data);
      },
      error: function(data) {
        var inner = "<div class='mdl-list__item mdl-list__item--two-line'><a class='mdl-list__item-primary-content' href='"+ data.url +"' target='_blank'><i class='material-icons mdl-list__item-avatar'>account_circle</i><span>"+ channel +"</span><span class='mdl-list__item-sub-title'>Account Closed</span></a><span class='mdl-list__item-secondary-action' ><i class='material-icons'>block</i></span></div>";
        $('#t3').append(inner);
      }
    });
  });
};
