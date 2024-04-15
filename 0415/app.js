const http = require('http');
const cookie = require('cookie');
http.createServer((req, res) => {
  let cookies = [];
  
  if (cookies !== undefined) {
    cookies = cookie.parse(req.headers.cookie);
  }
  res.writeHead(200, {
    'set-cookie': [
        'tasty_food=kimchi; Max-age = 6000',
      'password = 1234',
      'username = kdt',
      'DontReadHttp=myhttp; HttpOnly',
    ]
  })
  res.end('Cookie3');
}).listen(8000, () => {
  console.log('Server is running at 8000');
})