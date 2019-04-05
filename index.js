'use strict';

const http = require('http');
const https = require('https');

const PORT = 8000;

const httpProxyServer = http.createServer((clientReq, clientRes) => {
  const protocol = clientReq.url.startsWith('https') ? https : http;

  console.log(clientReq.url);

  const options = {
    headers: clientReq.headers,
    method: clientReq.method
  };

  const proxyRequest = protocol.request(clientReq.url, options, (serverRes) => {
    clientRes.writeHead(
      serverRes.statusCode,
      serverRes.statusMessage,
      serverRes.headers
    );
    serverRes.pipe(clientRes, { end: true });
  });

  clientReq.pipe(proxyRequest, { end: true });
});

httpProxyServer.listen(PORT);
