$(document).ready(function () {
  var pageToken = '';
  var api_key;
  var channel_id;

  $('#channelCard').hide();
  $('#channelError').hide();
  $('#scraperForm').submit(function (e) {
    e.preventDefault();
  });

  $('#findBtn').click(function () {
    pageToken = '';
    api_key = $('#inputApiKey').val();
    const username = $('#inputForUsername').val();
    const query = '?' + 'API_KEY=' + api_key + '&USERNAME=' + username;
    $('#channelCard').hide();
    $('#channelError').hide();
    $('#moreBtn').show();
    $.get({
      url: '/api/youtube' + query,
      success: function (data) {
        channel_id = data.id;
        $('#channelThumbnail').attr('src', data.thumbnail);
        $('#channelName').html(data.name);
        $('#channelViewCount').html('ViewCount: ' + data.statistics.viewCount);
        $('#channelSubscriberCount').html(
          'SubscriberCount: ' + data.statistics.subscriberCount,
        );
        $('#channelVideoCount').html(
          'VideoCount: ' + data.statistics.videoCount,
        );
        $('#playlistsContainer').html('');
        $('#channelCard').show();
        loadMore();
      },
      error: function (data) {
        $('#channelError').html(data.responseJSON.message);
        $('#channelError').show();
      },
    });
  });

  $('#moreBtn').click(loadMore);

  function loadMore() {
    const query =
      '?' +
      'API_KEY=' +
      api_key +
      '&CHANNEL_ID=' +
      channel_id +
      '&PAGE_TOKEN=' +
      pageToken;
    $.get({
      url: '/api/youtube/playlists' + query,
      success: loadMoreHandler,
      error: function (data) {
        alert(data.responseJSON.message);
      },
    });
  }

  function loadMoreHandler(data) {
    if (!data.nextPageToken) {
      $('#moreBtn').hide();
    } else {
      pageToken = data.nextPageToken;
    }

    data.items.forEach((item) => {
      $('#playlistsContainer')
        .append(`<div class="card" style="margin-top: .5rem">
        <img
          src="${item.thumbnail}"
          class="card-img-top"
          alt="..."
          style="width: 150px"
        />
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
    </div>`);
    });
  }
});
