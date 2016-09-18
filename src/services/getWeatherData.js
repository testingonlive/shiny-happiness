import $ from 'jquery';

import {mashapeKey} from '../config/keys';

export default function(_lat, _lng) {
  return $.ajax({
    type: 'get',
    beforeSend: function(request) {
      request.setRequestHeader('X-Mashape-Key', mashapeKey);
    },
    url: 'https://simple-weather.p.mashape.com/weatherdata',
    data: {
      lat: _lat,
      lng: _lng
    }
  }).promise();
}
