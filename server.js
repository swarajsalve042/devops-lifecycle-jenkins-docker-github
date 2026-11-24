const http = require("node:http");

const PORT = Number(process.env.PORT || 3000);

function createServer() {
  return http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (req.url === "/" || req.url === "/") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><html><head><meta charset=\"utf-8\"><title>DevOps Lifecycle Demo</title></head>" +
        "<body><h1>DevOps Lifecycle Demo</h1><p>GitHub + Jenkins + Docker</p>" +
        "<p>Application is running.</p><p>Health endpoint: <a href=\"/health\">/health</a></p></body></html>"
      );
      return;
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  });
}

if (require.main === module) {
  createServer().listen(PORT, "0.0.0.0", () => {
    console.log(`DevOps demo app listening on port ${PORT}`);
  });
}

module.exports = { createServer };
