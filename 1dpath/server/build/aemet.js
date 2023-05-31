"use strict";
var unirest = require("unirest");
var req = unirest("GET", "https://opendata.aemet.es/opendata/avisos/ahora/");
req.query({
    "api_key": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbW9udGVyb2dAYWVtZXQuZXMiLCJqdGkiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJleHAiOjE0NzUwNTg3ODcsImlzcyI6IkFFTUVUIiwiaWF0IjoxNDc0NjI2Nzg3LCJ1c2VySWQiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJyb2xlIjoiIn0.xh3LstTlsP9h5cxz3TLmYF4uJwhOKzA0B6-vH8lPGGw"
});
req.headers({
    "cache-control": "no-cache"
});
req.end(function (res) {
    if (res.error)
        throw new Error(res.error);
    console.log(res.body);
});
