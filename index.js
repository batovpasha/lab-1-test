'use strict';

const http = require('http');

const PORT = 8000;

const httpProxyServer = http.createServer((clientReq, clientRes) => {
  console.log(clientReq.headers);

  const options = {
    hostname: clientReq.headers.host,
    path: clientReq.url,
    method: clientReq.method
  };

  const proxyRequest = http.request(options, (serverRes) => {
    serverRes.pipe(clientRes, { end: true });
  });

  clientReq.pipe(proxyRequest, { end: true });
});

httpProxyServer.listen(PORT);
