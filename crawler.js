'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _url = require('url');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 1. validation: http, https, same origin
// 2. check visited
// 3. request
// 4. get body 
// 5. add href
// 6. verify all visited

function crawler(seed, keyword) {
    return new Promise(function (resolve) {
        var crawled = new Map();
        var report = new Map();
        function _crawler(url) {
            // 2. check has visited
            if (crawled.get(url) !== undefined) {
                return false;
            }

            // 3. note started crawling an url
            crawled.set(url, false);

            // 4. request
            return (0, _request2.default)(url, function (error, response) {
                var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

                if (keyword && convertRegexp(keyword).test(body)) {
                    report.set(url, true);
                    console.log(url.yellow);
                }

                // 5. get a tags in a crawled body
                var $ = _cheerio2.default.load(body);
                var $body = $('body');
                var $a = $body.find('a');

                // 6. recursive call new hrefs
                $a && $a.length && $a.map(function (index, element) {
                    var url = validationUrl($(element).attr('href'), seed);
                    return url && _crawler(url);
                });

                // 7. note finished crawling an url
                crawled.set(url, true);
                console.log(url.green);

                // 8. verify all visited
                if (isVisitedAll(crawled)) {
                    console.log('Finished'.blue);
                    resolve({
                        crawled: crawled,
                        report: report
                    });
                }
            });
        }

        // 1. start crawler
        return _crawler(seed);
    });
}

// validate http and https protocol, and same origin
function validationUrl(url, seed) {
    var _ref = new _url.URL(url, seed),
        href = _ref.href,
        origin = _ref.origin,
        protocol = _ref.protocol;

    if ((protocol === 'http:' || protocol === 'https:') && new _url.URL(seed).origin === origin) {
        return href;
    } else {
        return false;
    }
}

// validate whether there is any false in a Map, or not.
function isVisitedAll(map) {
    return [].concat(_toConsumableArray(map.values())).filter(function (i) {
        return i === false;
    }).length < 1;
}

// convert str to RegExp, if RegExp, return it
function convertRegexp(str) {
    return str instanceof RegExp ? str : new RegExp(str);
}

exports.default = crawler;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MUIsR0FBZ0MsSUFBSSxNQUFKLENBQVcsR0FBWCxDQUF2QztBQUNIOztrQkFFYyxPIiwiZmlsZSI6ImNyYXdsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCBjb2xvcnMgZnJvbSAnY29sb3JzJztcblxuLy8gMS4gdmFsaWRhdGlvbjogaHR0cCwgaHR0cHMsIHNhbWUgb3JpZ2luXG4vLyAyLiBjaGVjayB2aXNpdGVkXG4vLyAzLiByZXF1ZXN0XG4vLyA0LiBnZXQgYm9keSBcbi8vIDUuIGFkZCBocmVmXG4vLyA2LiB2ZXJpZnkgYWxsIHZpc2l0ZWRcblxuZnVuY3Rpb24gY3Jhd2xlciAoc2VlZCwga2V5d29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBjcmF3bGVkID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCByZXBvcnQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZ1bmN0aW9uIF9jcmF3bGVyKHVybCkge1xuICAgICAgICAgICAgLy8gMi4gY2hlY2sgaGFzIHZpc2l0ZWRcbiAgICAgICAgICAgIGlmIChjcmF3bGVkLmdldCh1cmwpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDMuIG5vdGUgc3RhcnRlZCBjcmF3bGluZyBhbiB1cmxcbiAgICAgICAgICAgIGNyYXdsZWQuc2V0KHVybCwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyA0LiByZXF1ZXN0XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkgPSAnJykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXl3b3JkICYmIGNvbnZlcnRSZWdleHAoa2V5d29yZCkudGVzdChib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXBvcnQuc2V0KHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybC55ZWxsb3cpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIDUuIGdldCBhIHRhZ3MgaW4gYSBjcmF3bGVkIGJvZHlcbiAgICAgICAgICAgICAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGJvZHkpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRhID0gJGJvZHkuZmluZCgnYScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIDYuIHJlY3Vyc2l2ZSBjYWxsIG5ldyBocmVmc1xuICAgICAgICAgICAgICAgICRhICYmICRhLmxlbmd0aCAmJiAkYS5tYXAoKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHZhbGlkYXRpb25VcmwoJChlbGVtZW50KS5hdHRyKCdocmVmJyksIHNlZWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXJsICYmIF9jcmF3bGVyKHVybCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyA3LiBub3RlIGZpbmlzaGVkIGNyYXdsaW5nIGFuIHVybFxuICAgICAgICAgICAgICAgIGNyYXdsZWQuc2V0KHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXJsLmdyZWVuKTtcblxuICAgICAgICAgICAgICAgIC8vIDguIHZlcmlmeSBhbGwgdmlzaXRlZFxuICAgICAgICAgICAgICAgIGlmIChpc1Zpc2l0ZWRBbGwoY3Jhd2xlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZpbmlzaGVkJy5ibHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmF3bGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAxLiBzdGFydCBjcmF3bGVyXG4gICAgICAgIHJldHVybiBfY3Jhd2xlcihzZWVkKTtcbiAgICB9KTtcbn1cblxuLy8gdmFsaWRhdGUgaHR0cCBhbmQgaHR0cHMgcHJvdG9jb2wsIGFuZCBzYW1lIG9yaWdpblxuZnVuY3Rpb24gdmFsaWRhdGlvblVybCh1cmwsIHNlZWQpIHtcbiAgICBjb25zdCB7IGhyZWYsIG9yaWdpbiwgcHJvdG9jb2wgfSA9IG5ldyBVUkwodXJsLCBzZWVkKTtcbiAgICBpZiAoKHByb3RvY29sID09PSAnaHR0cDonIHx8IHByb3RvY29sID09PSAnaHR0cHM6JykgJiYgbmV3IFVSTChzZWVkKS5vcmlnaW4gPT09IG9yaWdpbikge1xuICAgICAgICByZXR1cm4gaHJlZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vLyB2YWxpZGF0ZSB3aGV0aGVyIHRoZXJlIGlzIGFueSBmYWxzZSBpbiBhIE1hcCwgb3Igbm90LlxuZnVuY3Rpb24gaXNWaXNpdGVkQWxsKG1hcCkge1xuICAgIHJldHVybiBbLi4ubWFwLnZhbHVlcygpXS5maWx0ZXIoaSA9PiBpID09PSBmYWxzZSkubGVuZ3RoIDwgMTtcbn1cblxuLy8gY29udmVydCBzdHIgdG8gUmVnRXhwLCBpZiBSZWdFeHAsIHJldHVybiBpdFxuZnVuY3Rpb24gY29udmVydFJlZ2V4cChzdHIpIHtcbiAgICByZXR1cm4gKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cCkgPyBzdHIgOiBuZXcgUmVnRXhwKHN0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyYXdsZXI7Il19