const fs = require("fs");
const express = require("express");
const jsdom = require("jsdom").JSDOM;
const { updateHTML } = require("./populate");
const { populateCSS, populateConfig } = require("./build");
const { updateCommand } = require("./update");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

const port = 3000;

global.DOMParser = new jsdom().window.DOMParser;
const { outDir } = require("./utils");

function uiCommand() {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/update", (req, res) => {
    if (!fs.existsSync(`${outDir}/config.json`)) {
      return res.send(
        'You need to run build command before using update<br><a href="/">Go Back</a>'
      );
    }

    updateCommand();
    res.redirect("/");
  });

  app.post("/build", (req, res) => {
    const { username } = req.body;
    if (!username) {
      return res.send("username can't be empty");
    }

    const sort = req.body.sort ? req.body.sort : "created";
    const order = req.body.order ? req.body.order : "asc";
    const includeFork = req.body.fork === "true";
    const types = ["owner"];
    const codepen = req.body.codepen ? req.body.codepen : null;
    const dev = req.body.dev ? req.body.dev : null;
    const dribbble = req.body.dribbble ? req.body.dribbble : null;
    const email = req.body.email ? req.body.email : null;
    const facebook = req.body.facebook ? req.body.facebook : null;
    const gravatar = req.body.gravatar ? req.body.gravatar : null;
    const initials = req.body.initials ? req.body.initials : null;
    const instagram = req.body.instagram ? req.body.instagram : null;
    const keybase = req.body.keybase ? req.body.keybase : null;
    const medium = req.body.medium ? req.body.medium : null;
    const reddit = req.body.reddit ? req.body.reddit : null;
    const stackexchange = req.body.stackexchange
      ? req.body.stackexchange
      : null;
    const steam = req.body.steam ? req.body.steam : null;
    const telegram = req.body.telegram ? req.body.telegram : null;
    const twitter = req.body.twitter ? req.body.twitter : null;
    const xda = req.body.xda ? req.body.xda : null;
    const youtube = req.body.youtube ? req.body.youtube : null;
    const background = req.body.background
      ? req.body.background
      : "https://source.unsplash.com/1280x720/?wallpaper";
    const theme = req.body.theme === "on" ? "dark" : "light";
    const opts = {
      sort,
      order,
      includeFork,
      types,
      codepen,
      dev,
      dribbble,
      email,
      facebook,
      gravatar,
      initials,
      instagram,
      keybase,
      medium,
      reddit,
      stackexchange,
      steam,
      telegram,
      twitter,
      xda,
      youtube,
    };

    updateHTML(username, opts);
    populateCSS({
      background,
      theme,
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
  uiCommand,
};
