const fs = require("fs");
const express = require("express");
const
{
  updateHTML
} = require("./populate");
const
{
  populateCSS,
  populateConfig
} = require("./build");
const
{
  updateCommand
} = require("./update");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.use(
  express.json(
  {
    limit: "50mb"
  })
);
app.use(
  express.urlencoded(
  {
    limit: "50mb",
    extended: true
  })
);

const port = 3000;

const jsdom = require("jsdom").JSDOM,
  options = {
    resources: "usable"
  };
global.DOMParser = new jsdom().window.DOMParser;

function uiCommand()
{
  app.get("/", function(req, res)
  {
    res.render("index.ejs");
  });

  app.get("/update", function(req, res)
  {
    if (!fs.existsSync(`${outDir}/config.json`))
    {
      return res.send(
        'You need to run build command before using update<br><a href="/">Go Back</a>'
      );
    }
    updateCommand();
    res.redirect("/");
  });

  app.post("/build", function(req, res)
  {
    let username = req.body.username;
    if (!username)
    {
      return res.send("username can't be empty");
    }
    let sort = req.body.sort ? req.body.sort : "created";
    let order = req.body.order ? req.body.order : "asc";
    let includeFork = req.body.fork == "true" ? true : false;
    let types = ["owner"];
    let dribbble = req.body.dribbble ? req.body.dribbble : null;
    let email = req.body.email ? req.body.email : null;
    let twitter = req.body.twitter ? req.body.twitter : null;
    let background = req.body.background ?
      req.body.background :
      "https://images.unsplash.com/photo-1553748024-d1b27fb3f960?w=1500&q=80";
    let theme = req.body.theme == "on" ? "dark" : "light";
    const opts = {
      sort: sort,
      order: order,
      includeFork: includeFork,
      types,
      dribbble: dribbble,
      email: email,
      twitter: twitter
    };

    updateHTML(username, opts);
    populateCSS(
    {
      background: background,
      theme: theme
    });
    populateConfig(opts);
    res.redirect("/");
  });

  console.log("\nStarting...");
  app.listen(port);
  console.log(
    `The GUI is running on port ${port}, Navigate to http://localhost:${port} in your browser\n`
  );
}

module.exports = {
  uiCommand
};