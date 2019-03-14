'use strict';

const http = require('http');

const PORT = 8000;

const httpProxyServer = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: clientReq.headers.host,
    path: clientReq.url,
    method: clientReq.method
  };

  const proxyRequest = http.request(options, (serverRes) => {
    clientRes.headers = serverRes.headers;
    serverRes.pipe(clientRes, { end: true });
  });

  clientReq.pipe(proxyRequest, { end: true });
});

httpProxyServer.listen(PORT);
