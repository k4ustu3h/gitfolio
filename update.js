const { getConfig } = require("./utils");
const { updateHTML } = require("./populate");

async function updateCommand() {
  const data = await getConfig();
  var username = data[0].username;
  if (username == null) {
    console.log(
      "username not found in config.json, please run build command before using update"
    );
    return;
  }
  const opts = {
    sort: data[0].sort,
    order: data[0].order,
    includeFork: data[0].includeFork,
    types: data[0].types,
    codepen: data[0].codepen,
    dev: data[0].dev,
    dribbble: data[0].dribbble,
    email: data[0].email,
    instagram: data[0].instagram,
    reddit: data[0].reddit,
    telegram: data[0].telegram,
    twitter: data[0].twitter
  };
  updateHTML(username, opts);
}

module.exports = {
  updateCommand
};
