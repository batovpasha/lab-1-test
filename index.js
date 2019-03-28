'use strict';

const http = require('http');
const https = require('https');

const PORT = 8000;

const httpProxyServer = http.createServer((clientReq, clientRes) => {
  const protocol = clientReq.url.startsWith('https') ? https : http; 
  
  const options = {
    hostname: clientReq.headers.host,
    path: clientReq.url,
    method: clientReq.method
  };

  const proxyRequest = protocol.request(options, (serverRes) => {
    serverRes.pipe(clientRes, { end: true });
  });
  
  clientReq.pipe(proxyRequest, { end: true });
});

httpProxyServer.listen(PORT);
