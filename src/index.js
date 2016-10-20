import $ from 'jquery';

import getLocn from './services/getLocn';
import getWeatherData from './services/getWeatherData';

import WeatherModel from './models/WeatherModel';

import forcastView from './views/forcastView';
import loadingView from './views/loadingView';

import {
    get,
    tempConvert,
    templateRenderer
} from './helpers/misc';

var renderForcast = templateRenderer( '#forcast', forcastView );
// render loading message
templateRenderer( '#forcast', loadingView )();

var weatherModel = new WeatherModel();

weatherModel.on( 'update', renderForcast );

// get the location
getLocn()
    // then get the weather data
    .then(function(latLng) {
        return getWeatherData(latLng.lat, latLng.lng);
    })
    // do something useful with the data
    .then(function(data) {

        weatherModel.set({
            desc: get(data, ['query', 'results', 'channel', 'item', 'condition', 'text']),
            temp: get(data, ['query', 'results', 'channel', 'item', 'condition', 'temp']),
            format: 'celsius'
        });

        $(document).on('click', '#js-temp-toggle', function() {
            weatherModel.set(tempConvert({
                temp: weatherModel.get( 'temp' ),
                format: weatherModel.get( 'format')
            }));
        });

    });
