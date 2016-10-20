import $ from 'jquery';

export default function() {
    return $.getJSON('http://ip-api.com/json')
        .then(function(data) {
            return {
                lat: data.lat,
                lng: data.lon
            };
        });
}
