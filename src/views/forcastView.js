export default function(data) {
    var _toggle = data.format === 'celsius' ? 'fahrenheit' : 'celsius';

    return '<p>' + data.desc + '</p>' +
           '<p>temp: <span id="js-temp">' + data.temp + '</span></p>' +
           '<button id="js-temp-toggle">show in ' + _toggle + '</button>';
}
