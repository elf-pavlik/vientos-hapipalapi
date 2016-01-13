﻿'use strict';
const Hapi = require('hapi');
var routes = require('./src/routes');

const server = new Hapi.Server();
server.connection({ port: 3000 });

var dbOpts = {
    "url": "mongodb://localhost:27017/waacdb",
    "decorate" : true,
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

server.register(
    {
        register: require('hapi-mongodb'),
        options: dbOpts
    }, 
    function (err) {
        if (err) {
            console.error(err);
            throw err;
        }
    }
);

server.register(require('hapi-auth-cookie'), function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });
});
    
for (var route in routes) {
    console.log(route);
    server.route(routes[route]);
};



server.register(require('vision'), function(err) {
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: './src/views',
        layoutPath: './src/views/layout',
        layout: 'default'
    });
});

server.register(require('inert') ,function (err) {
        if (err) {
            console.error(err);
            throw err;
        }
    }
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});