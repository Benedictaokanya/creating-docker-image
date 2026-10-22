
const http = require("http");

const tasks = [
  { title: "Learn Docker fundamentals", status: "Completed" },
  { title: "Practise building images", status: "In progress" },
  { title: "Learn Docker networking", status: "Pending" },
];

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const taskList = tasks
    .map(
      (task) => `
        <li>
          <span>${task.title}</span>
          <span class="status ${task.status.toLowerCase().replace(" ", "-")}">
            ${task.status}
          </span>
        </li>
      `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>My Daily Progress</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          background: #f4f5ef;
          color: #263b2b;
        }
        main {
          max-width: 620px;
          margin: 40px auto;
          padding: 30px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 8px 30px #263b2b12;
        }
        h1 { margin-bottom: 8px; }
        .subtitle { color: #68766b; }
        .progress {
          margin: 25px 0;
          padding: 20px;
          background: #edf3e9;
          border-radius: 12px;
        }
        .bar {
          height: 9px;
          margin-top: 12px;
          background: #d6dfd2;
          border-radius: 9px;
          overflow: hidden;
        }
        .fill {
          height: 100%;
          width: ${completed / tasks.length * 100}%;
          background: #527c59;
        }
        ul { padding: 0; list-style: none; }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid #edf0eb;
        }
        .status {
          font-size: 12px;
          padding: 6px 9px;
          border-radius: 20px;
          white-space: nowrap;
          background: #eee;
        }
        .completed { background: #dceedd; color: #285b31; }
        .in-progress { background: #fff0cf; color: #805b13; }
        .pending { background: #e9e9ef; color: #53536a; }
        footer { margin-top: 25px; color: #68766b; font-size: 13px; }
        @media (max-width: 450px) {
          main { padding: 20px; }
          li { align-items: flex-start; }
        }
      </style>
    </head>
    <body>
      <main>
        <h1>My Daily Progress</h1>
        <p class="subtitle">Small steps. Consistent progress.</p>

        <section class="progress">
          <strong>${completed} of ${tasks.length} tasks completed</strong>
          <div class="bar">
            <div class="fill"></div>
          </div>
        </section>

        <h2>Today's learning goals</h2>
        <ul>${taskList}</ul>

        <footer>Built with Node.js and Docker.</footer>
      </main>
    </body>
    </html>
  `;

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(8001, "0.0.0.0", () => {
  console.log("Server listening on port 8001");
});
