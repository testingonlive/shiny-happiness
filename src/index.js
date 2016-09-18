import $ from 'jquery';

import getLocn from './services/getLocn';
import getWeatherData from './services/getWeatherData';

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
    var temp = get(data, ['query', 'results', 'channel', 'item', 'condition', 'temp']);
    var text = get(data, ['query', 'results', 'channel', 'item', 'condition', 'text']);

    $('#forcast').html(
      '<p>' + text + '</p>' +
      '<p>temp: <span id="js-temp">' + temp + '</span></p>' +
      '<button id="js-temp-toggle">show in fahrenheit</button>'
    );

    $('#js-temp-toggle').on('click',
      (function() {
        var $temp = $( '#js-temp' );
        var curTemp = {
          celsius: temp
        };

        return function() {
          var newTemp = tempConvert(curTemp);

          $temp.text(newTemp);
          $(this).text( 'show in ' + Object.keys(curTemp)[0] );

          curTemp = curTemp.celsius ? {fahrenheit: newTemp} : {celsius: newTemp};
        };
      }())
    );
  });
