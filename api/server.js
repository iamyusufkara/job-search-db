const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// CORS – nur dein Frontend erlauben
server.use(
  cors({
    origin: "https://job-search-three-gray.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

// Preflight
server.options("*", cors());

// Optional: Rewrites
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(middlewares);
server.use(router);

// WICHTIG: Vercel Function Export
module.exports = (req, res) => {
  server(req, res);
};
