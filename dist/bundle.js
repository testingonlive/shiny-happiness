(function ($) {
'use strict';

$ = 'default' in $ ? $['default'] : $;

var getLocn = function() {
  return $.getJSON( 'http://ip-api.com/json' )
    .then(function(data) {
      return {
        lat: data.lat,
        lng: data.lon
      };
    });
}

var mashapeKey = 'D38nBJDMDDmshtvEpJRaWzd5nQkap1RbPomjsn55ttulUTrvTh';

var getWeatherData = function(_lat, _lng) {
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

var forcastView = function(data) {
  var _toggle = data.format === 'celsius' ? 'fahrenheit' : 'celsius';

  return '<p>' + data.desc + '</p>' +
         '<p>temp: <span id="js-temp">' + data.temp + '</span></p>' +
         '<button id="js-temp-toggle">show in ' + _toggle + '</button>';
}

/**
* function to return value at give path
*
* @function get
* @param {Object} obj - the object to search through
* @param {Array} pathArr - the path to the property
* @return {*} deaults of undefined
**/
/* eslint-disable no-nested-ternary */
function get( obj, pathArr ) {
  return !obj ? void 0 :
         pathArr.length === 1 ? obj[ pathArr[ 0 ] ] :
         get(obj[pathArr[0]], pathArr.slice(1));
}
/* eslint-enable no-nested-ternary */

/**
* Convert Celsius to Fahrenheit and visa versa
*
* @function tempConvert
* @param {Object} temp - info about the temp to be converted
* @param {Number} temp.temp - the actual temperature
* @param {String} temp.format - the format
* @return {Object|undefined} the converted object or undefined
**/
/* eslint-disable no-nested-ternary */
function tempConvert( temp ) {
  return temp.format === 'celsius' ? {format: 'fahrenheit', temp: (temp.temp * 9 / 5) + 32 } :
         temp.format === 'fahrenheit' ? {format: 'celsius', temp: (temp.temp - 32) * 5 / 9 } :
         void 0;
}

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

}(jQuery));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9ob21lL2phbWVzL0RldmVsb3BtZW50L2V4YW1wbGUtbW9kdWxlL3NyYy9zZXJ2aWNlcy9nZXRMb2NuLmpzIiwiL2hvbWUvamFtZXMvRGV2ZWxvcG1lbnQvZXhhbXBsZS1tb2R1bGUvc3JjL2NvbmZpZy9rZXlzLmpzIiwiL2hvbWUvamFtZXMvRGV2ZWxvcG1lbnQvZXhhbXBsZS1tb2R1bGUvc3JjL3NlcnZpY2VzL2dldFdlYXRoZXJEYXRhLmpzIiwiL2hvbWUvamFtZXMvRGV2ZWxvcG1lbnQvZXhhbXBsZS1tb2R1bGUvc3JjL3ZpZXdzL2ZvcmNhc3RWaWV3LmpzIiwiL2hvbWUvamFtZXMvRGV2ZWxvcG1lbnQvZXhhbXBsZS1tb2R1bGUvc3JjL2hlbHBlcnMvbWlzYy5qcyIsIi9ob21lL2phbWVzL0RldmVsb3BtZW50L2V4YW1wbGUtbW9kdWxlL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICQuZ2V0SlNPTiggJ2h0dHA6Ly9pcC1hcGkuY29tL2pzb24nIClcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYXQ6IGRhdGEubGF0LFxuICAgICAgICBsbmc6IGRhdGEubG9uXG4gICAgICB9O1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IHZhciBtYXNoYXBlS2V5ID0gJ0QzOG5CSkRNRERtc2h0dkVwSlJhV3pkNW5Ra2FwMVJiUG9tanNuNTV0dHVsVVRydlRoJztcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB7bWFzaGFwZUtleX0gZnJvbSAnLi4vY29uZmlnL2tleXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihfbGF0LCBfbG5nKSB7XG4gIHJldHVybiAkLmFqYXgoe1xuICAgIHR5cGU6ICdnZXQnLFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1NYXNoYXBlLUtleScsIG1hc2hhcGVLZXkpO1xuICAgIH0sXG4gICAgdXJsOiAnaHR0cHM6Ly9zaW1wbGUtd2VhdGhlci5wLm1hc2hhcGUuY29tL3dlYXRoZXJkYXRhJyxcbiAgICBkYXRhOiB7XG4gICAgICBsYXQ6IF9sYXQsXG4gICAgICBsbmc6IF9sbmdcbiAgICB9XG4gIH0pLnByb21pc2UoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyIF90b2dnbGUgPSBkYXRhLmZvcm1hdCA9PT0gJ2NlbHNpdXMnID8gJ2ZhaHJlbmhlaXQnIDogJ2NlbHNpdXMnO1xuXG4gIHJldHVybiAnPHA+JyArIGRhdGEuZGVzYyArICc8L3A+JyArXG4gICAgICAgICAnPHA+dGVtcDogPHNwYW4gaWQ9XCJqcy10ZW1wXCI+JyArIGRhdGEudGVtcCArICc8L3NwYW4+PC9wPicgK1xuICAgICAgICAgJzxidXR0b24gaWQ9XCJqcy10ZW1wLXRvZ2dsZVwiPnNob3cgaW4gJyArIF90b2dnbGUgKyAnPC9idXR0b24+Jztcbn1cbiIsIi8qKlxuKiBmdW5jdGlvbiB0byByZXR1cm4gdmFsdWUgYXQgZ2l2ZSBwYXRoXG4qXG4qIEBmdW5jdGlvbiBnZXRcbiogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHRoZSBvYmplY3QgdG8gc2VhcmNoIHRocm91Z2hcbiogQHBhcmFtIHtBcnJheX0gcGF0aEFyciAtIHRoZSBwYXRoIHRvIHRoZSBwcm9wZXJ0eVxuKiBAcmV0dXJuIHsqfSBkZWF1bHRzIG9mIHVuZGVmaW5lZFxuKiovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuZnVuY3Rpb24gZ2V0KCBvYmosIHBhdGhBcnIgKSB7XG4gIHJldHVybiAhb2JqID8gdm9pZCAwIDpcbiAgICAgICAgIHBhdGhBcnIubGVuZ3RoID09PSAxID8gb2JqWyBwYXRoQXJyWyAwIF0gXSA6XG4gICAgICAgICBnZXQob2JqW3BhdGhBcnJbMF1dLCBwYXRoQXJyLnNsaWNlKDEpKTtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuLyoqXG4qIENvbnZlcnQgQ2Vsc2l1cyB0byBGYWhyZW5oZWl0IGFuZCB2aXNhIHZlcnNhXG4qXG4qIEBmdW5jdGlvbiB0ZW1wQ29udmVydFxuKiBAcGFyYW0ge09iamVjdH0gdGVtcCAtIGluZm8gYWJvdXQgdGhlIHRlbXAgdG8gYmUgY29udmVydGVkXG4qIEBwYXJhbSB7TnVtYmVyfSB0ZW1wLnRlbXAgLSB0aGUgYWN0dWFsIHRlbXBlcmF0dXJlXG4qIEBwYXJhbSB7U3RyaW5nfSB0ZW1wLmZvcm1hdCAtIHRoZSBmb3JtYXRcbiogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH0gdGhlIGNvbnZlcnRlZCBvYmplY3Qgb3IgdW5kZWZpbmVkXG4qKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5mdW5jdGlvbiB0ZW1wQ29udmVydCggdGVtcCApIHtcbiAgcmV0dXJuIHRlbXAuZm9ybWF0ID09PSAnY2Vsc2l1cycgPyB7Zm9ybWF0OiAnZmFocmVuaGVpdCcsIHRlbXA6ICh0ZW1wLnRlbXAgKiA5IC8gNSkgKyAzMiB9IDpcbiAgICAgICAgIHRlbXAuZm9ybWF0ID09PSAnZmFocmVuaGVpdCcgPyB7Zm9ybWF0OiAnY2Vsc2l1cycsIHRlbXA6ICh0ZW1wLnRlbXAgLSAzMikgKiA1IC8gOSB9IDpcbiAgICAgICAgIHZvaWQgMDtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuZXhwb3J0IHtnZXQsIHRlbXBDb252ZXJ0fTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCBnZXRMb2NuIGZyb20gJy4vc2VydmljZXMvZ2V0TG9jbic7XG5pbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSAnLi9zZXJ2aWNlcy9nZXRXZWF0aGVyRGF0YSc7XG5cbmltcG9ydCBmb3JjYXN0VmlldyBmcm9tICcuL3ZpZXdzL2ZvcmNhc3RWaWV3JztcblxuaW1wb3J0IHtnZXQsIHRlbXBDb252ZXJ0fSBmcm9tICcuL2hlbHBlcnMvbWlzYyc7XG5cbi8vIGdldCB0aGUgbG9jYXRpb25cbmdldExvY24oKVxuICAvLyB0aGVuIGdldCB0aGUgd2VhdGhlciBkYXRhXG4gIC50aGVuKGZ1bmN0aW9uKGxhdExuZykge1xuICAgIHJldHVybiBnZXRXZWF0aGVyRGF0YShsYXRMbmcubGF0LCBsYXRMbmcubG5nKTtcbiAgfSlcbiAgLy8gcGFyc2UgdGhlIHJlc3BvbnNlIGludG8gSlNPTlxuICAudGhlbigkLnBhcnNlSlNPTilcbiAgLy8gZG8gc29tZXRoaW5nIHVzZWZ1bCB3aXRoIHRoZSBkYXRhXG4gIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgY3VyVGVtcCA9IHtcbiAgICAgIHRlbXA6IGdldChkYXRhLCBbJ3F1ZXJ5JywgJ3Jlc3VsdHMnLCAnY2hhbm5lbCcsICdpdGVtJywgJ2NvbmRpdGlvbicsICd0ZW1wJ10pLFxuICAgICAgZm9ybWF0OiAnY2Vsc2l1cydcbiAgICB9O1xuICAgIHZhciB0ZXh0ID0gZ2V0KGRhdGEsIFsncXVlcnknLCAncmVzdWx0cycsICdjaGFubmVsJywgJ2l0ZW0nLCAnY29uZGl0aW9uJywgJ3RleHQnXSk7XG4gICAgdmFyICRmb3JjYXN0ID0gJCggJyNmb3JjYXN0JyApO1xuXG4gICAgJGZvcmNhc3QuaHRtbChcbiAgICAgIGZvcmNhc3RWaWV3KHtcbiAgICAgICAgZGVzYzogdGV4dCxcbiAgICAgICAgdGVtcDogY3VyVGVtcC50ZW1wLFxuICAgICAgICBmb3JtYXQ6ICdjZWxzaXVzJ1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNqcy10ZW1wLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgY3VyVGVtcCA9IHRlbXBDb252ZXJ0KGN1clRlbXApO1xuXG4gICAgICAkZm9yY2FzdC5odG1sKFxuICAgICAgICBmb3JjYXN0Vmlldyh7XG4gICAgICAgICAgZGVzYzogdGV4dCxcbiAgICAgICAgICB0ZW1wOiBjdXJUZW1wLnRlbXAsXG4gICAgICAgICAgZm9ybWF0OiBjdXJUZW1wLmZvcm1hdFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxjQUFlLFdBQVc7RUFDeEIsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFO0tBQ3pDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtNQUNuQixPQUFPO1FBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO09BQ2QsQ0FBQztLQUNILENBQUMsQ0FBQztDQUNOOztBQ1ZNLElBQUksVUFBVSxHQUFHLG9EQUFvRCxDQUFDOztBQ0k3RSxxQkFBZSxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUU7RUFDbEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1osSUFBSSxFQUFFLEtBQUs7SUFDWCxVQUFVLEVBQUUsU0FBUyxPQUFPLEVBQUU7TUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN2RDtJQUNELEdBQUcsRUFBRSxrREFBa0Q7SUFDdkQsSUFBSSxFQUFFO01BQ0osR0FBRyxFQUFFLElBQUk7TUFDVCxHQUFHLEVBQUUsSUFBSTtLQUNWO0dBQ0YsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQ2Q7O0FDaEJELGtCQUFlLFNBQVMsSUFBSSxFQUFFO0VBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxHQUFHLFlBQVksR0FBRyxTQUFTLENBQUM7O0VBRW5FLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTTtTQUMxQiw4QkFBOEIsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWE7U0FDMUQsc0NBQXNDLEdBQUcs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
