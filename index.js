'use strict';

const http = require('http');
const https = require('https');

const PORT = 8000;

const httpProxyServer = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: clientReq.headers.host,
    path: clientReq.url,
    method: clientReq.method
  };

  let proxyRequest;

  if (clientReq.connection.encrypted) {
    proxyRequest = https.request(options, (serverRes) => {
      serverRes.pipe(clientRes, { end: true });
    });
  } else {
    proxyRequest = http.request(options, (serverRes) => {
      serverRes.pipe(clientRes, { end: true });
    });
  }

  clientReq.pipe(proxyRequest, { end: true });
});

httpProxyServer.listen(PORT);
