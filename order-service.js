const http = require('http');
const url = require('url');

const menus = ['Nasi goreng', 'Mie goreng', 'Mie rebus', 'Es teh', 'Teh tawar'];
const MISSING = 3;

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const idMatch = pathname.match(/^\/(\d+)$/);

  if (!idMatch) {
    res.statusCode = 400;
    res.end('Invalid request');
    return;
  }

  let id = Number(idMatch[1]);

  if (id === MISSING || id < 0 || id >= menus.length) {
    res.statusCode = 404;
    res.end('Menu item not found');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    id,
    menu: menus[id],
  }));
});

server.listen(process.env.PORT || 0, () => {
  const { port } = server.address();
  console.log(`Order service listening on port: ${port}`);
});
