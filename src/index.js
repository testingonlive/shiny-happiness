import $ from 'jquery';

import getLocn from './services/getLocn';
import getWeatherData from './services/getWeatherData';

import forcastView from './views/forcastView';

import {get, tempConvert} from './helpers/misc';

// get the location
getLocn()
  // then get the weather data
  .then(function(latLng) {
    return getWeatherData(latLng.lat, latLng.lng);
  })
  // parse the response into JSON
  .then($.parseJSON)
  // do something useful with the data
  .then(function(data) {
    var curTemp = {
      temp: get(data, ['query', 'results', 'channel', 'item', 'condition', 'temp']),
      format: 'celsius'
    };
    var text = get(data, ['query', 'results', 'channel', 'item', 'condition', 'text']);
    var $forcast = $( '#forcast' );

    $forcast.html(
      forcastView({
        desc: text,
        temp: curTemp.temp,
        format: 'celsius'
      })
    );

    $(document).on('click', '#js-temp-toggle', function() {
      curTemp = tempConvert(curTemp);

      $forcast.html(
        forcastView({
          desc: text,
          temp: curTemp.temp,
          format: curTemp.format
        })
      );
    });
  });
