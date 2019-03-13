'use strict';

const http = require('http');

const PORT = 8000;

const proxyServer = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: clientReq.headers.host,
    path: clientReq.url,
    method: clientReq.method
  };

  const proxy = http.request(options, (serverRes) => {
    serverRes.pipe(clientRes, { end: true });
    clientRes.headers = serverRes.headers;
  });

  clientReq.pipe(proxy, { end: true });
});

proxyServer.listen(PORT);
