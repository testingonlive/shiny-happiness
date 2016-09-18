import $ from 'jquery';

var mashapeKey = 'D38nBJDMDDmshtvEpJRaWzd5nQkap1RbPomjsn55ttulUTrvTh';

export default function(_lat, _lng) {
  return $.ajax({
    type: 'get',
    beforeSend: function(request) {
      request.setRequestHeader('X-Mashape-Key', mashapeKey);
    },
    url: 'https://simple-weather.p.mashape.com/weather',
    data: {
      lat: _lat,
      lng: _lng
    }
  }).promise();
}
