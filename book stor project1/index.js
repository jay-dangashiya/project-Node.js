const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <html>
      <head>
        <title>Book Store</title>
        <style>
          body {
            font-family: Arial;
            background-color: #f4f4f4;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          .book {
            background: white;
            margin: 10px auto;
            padding: 10px;
            width: 300px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
          }
        </style>
      </head>
      <body>
        <h1>📚 Book Store</h1>

        <div class="book">
          <h3>Rich Dad Poor Dad</h3>
          <p>Author: Robert Kiyosaki</p>
        </div>

        <div class="book">
          <h3>Atomic Habits</h3>
          <p>Author: James Clear</p>
        </div>

        <div class="book">
          <h3>The Alchemist</h3>
          <p>Author: Paulo Coelho</p>
        </div>

      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});