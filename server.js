"use strict";

const express = require('express');

const WEBPACK_HOST = "127.0.0.1";
const WEBPACK_PORT = 8080;

const SSP_HOST = "127.0.0.1";
const SSP_PORT = 8081;

const colors = require('colors/safe');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");

const webpackServer = (() => {
    const webpackConfig = {
        ...require("./webpack.dev.config"),
        ...{
            watch: false
        }
    };
    const compiler = webpack(webpackConfig);
    return new webpackDevServer(compiler, {
        https: false,
        stats: {
            colors: true,
            env: true
        },
        contentBase: __dirname + '/build-dev',
        watchContentBase: true,
        hot: false,
        hotOnly: false,
        host: WEBPACK_HOST,
        port: WEBPACK_PORT,
        disableHostCheck: true
    });
})();

webpackServer.listen(WEBPACK_PORT, WEBPACK_HOST, () => {
    console.log(colors.green(`Starting Webpack Development Server on ${WEBPACK_HOST}:${WEBPACK_PORT}`));
});

const sspServer = (() => {
    const app = express();
    const randomBetween = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
    app.use((req, res, next) => {
        console.log(colors.cyan(`Request for ${req.url}`));
        next();
    });
    app.use( (req, res, next) => {
        res.header('Content-Type', 'application/json');
        next();
    });
    app.use( (req, res, next) => {
        setTimeout(() => next(), randomBetween(100, 3000));
    });
    app.use(express.json());
    app.post('*', (req, res) => {
        const seg = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const creativeId = `${seg()}-${seg()}-${seg()}-${seg()}-${seg()}`;
        const payload = req.body;
        const size = payload.sizes? payload.sizes[randomBetween(0, payload.sizes.length-1)]: [1,1];
        const ssp = req.headers.ssp;
        const cpm = Math.floor(Math.random() * 399) / 100;
        const adCode = `
            <div id="${creativeId}" style="width: ${size[0]}px; height:${size[1]}px; background:#EEEEEE">
                <script>document.querySelector("#${creativeId}").innerHTML("${creativeId} @ ${size.join("x")} @ ${cpm.toFixed(2)}")</script>
            </div>
        `;
        res.send(JSON.stringify({
            "adUnitCode": payload.adUnitCode,
            "creativeId": creativeId,
            "ssp": ssp,
            "size": size,
            "cpm": cpm,
            "ad": adCode.trim(),
            "isDeal": randomBetween(1,10) === 5
        }));
    });
    return app;
})();

sspServer.listen(SSP_PORT, SSP_HOST, () => {
    console.log(colors.green(`Starting SSP Bid Server on ${SSP_HOST}:${SSP_PORT}`));
});