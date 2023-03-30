const http = require("http");
const express = require('express');
const path = require('path');

const app = express();

app.get('/test', (req, res) => {
  res.send('Action runner');
});

// Configuration
const config = {
  port: process.env.PORT ?? "3000",
  appName: "octopus",
  appVersion: "v1.0.0",
};

// Define and start server
const serverStartDate = new Date();
const server = http.createServer();
server.addListener("request", (request, response) => {
  if (request.method === "GET" && request.url === "/info") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        name: config.appName,
        version: config.appVersion,
        startedAt: serverStartDate,
      })
    );
  } else {
    response.writeHead(404);
    response.end();
  }
});
server.listen(config.port, () => {
  console.log(`HTTP server started listening on port ${config.port}`);
});
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing HTTP server.");
  server.close();
});
process.on("SIGINT", () => {
  console.log("SIGINT received, closing HTTP server.");
  server.close();
});
process.on("SIGQUIT", () => {
  console.log("SIGQUIT received, closing HTTP server.");
  server.close();
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`App listening port ${port}`));