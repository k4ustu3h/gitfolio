const fs = require("fs");
const emoji = require("github-emoji");
const jsdom = require("jsdom").JSDOM,
  options = {
    resources: "usable",
  };
const { getConfig, outDir } = require("./utils");
const { getRepos, getUser } = require("./api");

function convertToEmoji(text) {
  if (text == null) return;
  text = text.toString();
  var pattern = /(?<=:\s*).*?(?=\s*:)/gs;
  if (text.match(pattern) != null) {
    var str = text.match(pattern);
    str = str.filter(function (arr) {
      return /\S/.test(arr);
    });
    for (i = 0; i < str.length; i++) {
      if (emoji.URLS[str[i]] != undefined) {
        text = text.replace(
          `:${str[i]}:`,
          `<img src="${emoji.URLS[str[i]]}" class="emoji">`
        );
      }
    }
    return text;
  } else {
    return text;
  }
}

module.exports.updateHTML = (username, opts) => {
  const {
    includeFork,
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
    pinterest,
    pinterest_key,
    reddit,
    stackexchange,
    steam,
    telegram,
    twitter,
    xda,
    youtube,
  } = opts;
  //add data to assets/index.html
  jsdom
    .fromFile(`${__dirname}/assets/index.html`, options)
    .then(function (dom) {
      let window = dom.window,
        document = window.document;
      (async () => {
        try {
          console.log("Building HTML/CSS...");
          const repos = await getRepos(username, opts);

          for (var i = 0; i < repos.length; i++) {
            let element;
            if (repos[i].fork == false) {
              element = document.getElementById("work_section");
            } else if (includeFork == true) {
              document.getElementById("forks").style.display = "block";
              element = document.getElementById("forks_section");
            } else {
              continue;
            }
            element.innerHTML += `
                        <a href="${
                          repos[i].html_url
                        }" target="_blank" rel="noopener">
                        <section>
                            <div class="section_title">${repos[i].name}</div>
                            <div class="about_section">
                            <span style="display:${
                              repos[i].description == undefined
                                ? "none"
                                : "block"
                            };">${convertToEmoji(repos[i].description)}</span>
                            </div>
                            <div class="bottom_section">
                                <span style="display:${
                                  repos[i].language == null
                                    ? "none"
                                    : "inline-block"
                                };"><span class="iconify" data-icon="mdi:code-tags"></span>&nbsp; ${
              repos[i].language
            }</span>
                                <span><span class="iconify" data-icon="ic:round-star-outline"></span>&nbsp; ${
                                  repos[i].stargazers_count
                                }</span>
                                <span><span class="iconify" data-icon="mdi:source-fork"></span>&nbsp; ${
                                  repos[i].forks_count
                                }</span>
                            </div>
                        </section>
                        </a>`;
          }
          const user = await getUser(username);
          document.title = user.login;
          var icon = document.createElement("link");
          icon.setAttribute("rel", "icon");
          icon.setAttribute("href", user.avatar_url);
          icon.setAttribute("type", "image/png");

          document.getElementsByTagName("head")[0].appendChild(icon);
          document.getElementsByTagName("head")[0].innerHTML += `
          <meta name="p:domain_verify" content="${pinterest_key}" />
          <meta name="description" content="${user.bio}" />
          <meta property="og:image" content="${user.avatar_url}" />
          <meta property="og:type" content="profile" />
          <meta property="og:title" content="${user.login}" />
          <meta property="og:url" content="${user.html_url}" />
          <meta property="og:description" content="${user.bio}" />
          <meta property="profile:username" content="${user.login}" />
          <meta name="twitter:image:src" content="${user.avatar_url}" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="${user.login}" />
          <meta name="twitter:description" content="${user.bio}" />`;

          // Decides if initials or profile picture is used
          if (initials == null) {
            document.getElementById("initials").id = `image`;
            document.getElementById(
              "image"
            ).style.background = `url('${user.avatar_url}') center center`;
          } else {
            document.getElementById(
              "initials"
            ).innerHTML = `<span>${initials}</span>`;
          }

          document.getElementById(
            "username"
          ).innerHTML = `<span style="display:${
            user.name == null || !user.name ? "none" : "block"
          };">${user.name}</span>`;

          document.getElementById("userbio").innerHTML = convertToEmoji(
            user.bio
          );
          document.getElementById("userbio").style.display =
            user.bio == null || !user.bio ? "none" : "block";

          // Social Media links and other info about the user
          document.getElementById("about").innerHTML = `
                <span style="display:${
                  user.company == null || !user.company ? "none" : "block"
                };"><span class="iconify" data-icon="mdi:office-building"></span> &nbsp; ${
            user.company
          }</span>
                <span style="display:block;"><a href="${
                  user.html_url
                }"><span class="iconify" data-icon="simple-icons:github"></span>&nbsp;&nbsp;@${
            user.login
          }</a></span>
                <span style="display:${
                  email == null ? "none !important" : "block"
                };"><a href="mailto:${email}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="mdi:email-outline"></span>&nbsp;&nbsp;${email}</a></span>
                <span style="display:${
                  user.location == null || !user.location ? "none" : "block"
                };"><a href="https://www.google.com/maps/search/?api=1&query=${
            user.location
          }"><span class="iconify" data-icon="mdi:map-marker-outline"></span>&nbsp;&nbsp;${
            user.location
          }</a></span>
                <span style="display:${
                  user.hireable == false || !user.hireable ? "none" : "block"
                };"><span class="iconify" data-icon="mdi:account-tie-outline"></span>&nbsp;&nbsp;Available for hire</span>
                <div class="socials">
                <span style="display:${
                  codepen == null ? "none !important" : "block"
                };"><a href="https://codepen.io/${codepen}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:codepen"></span></a></span>
                <span style="display:${
                  dev == null ? "none !important" : "block"
                };"><a href="https://dev.to/${dev}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="fa-brands:dev"></span></a></span>
                <span style="display:${
                  dribbble == null ? "none !important" : "block"
                };"><a href="https://www.dribbble.com/${dribbble}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:dribbble"></span></a></span>
                <span style="display:${
                  facebook == null ? "none !important" : "block"
                };"><a href="https://facebook.com/${facebook}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:facebook"></span></a></span>
                <span style="display:${
                  gravatar == null ? "none !important" : "block"
                };"><a href="https://gravatar.com/${gravatar}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:gravatar"></span></a></span>
                <span style="display:${
                  instagram == null ? "none !important" : "block"
                };"><a href="https://www.instagram.com/${instagram}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:instagram"></span></a></span>
                <span style="display:${
                  keybase == null ? "none !important" : "block"
                };"><a href="https://keybase.io/${keybase}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:keybase"></span></a></span>
                <span style="display:${
                  medium == null ? "none !important" : "block"
                };"><a href="https://medium.com/@${medium}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="ant-design:medium-circle-filled" data-width="24" data-height="24"></span></a></span>
                <span style="display:${
                  pinterest == null ? "none !important" : "block"
                };"><a href="https://pinterest.com/${pinterest}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:pinterest"></span></a></span>
                <span style="display:${
                  reddit == null ? "none !important" : "block"
                };"><a href="https://www.reddit.com/u/${reddit}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:reddit"></span></a></span>
                <span style="display:${
                  stackexchange == null ? "none !important" : "block"
                };"><a href="https://stackexchange.com/users/${stackexchange}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="fa-brands:stack-exchange"></span></a></span>
                <span style="display:${
                  steam == null ? "none !important" : "block"
                };"><a href="https://steamcommunity.com/id/${steam}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:steam"></span></a></span>
                <span style="display:${
                  telegram == null ? "none !important" : "block"
                };"><a href="https://t.me/${telegram}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="fa-brands:telegram"></span></a></span>
                <span style="display:${
                  twitter == null ? "none !important" : "block"
                };"><a href="https://www.twitter.com/${twitter}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="ant-design:twitter-circle-filled" data-width="24" data-height="24"></span></a></span>
                <span style="display:${
                  xda == null ? "none !important" : "block"
                };"><a href="https://forum.xda-developers.com/member.php?u=${xda}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="simple-icons:xdadevelopers"></span></a></span>
                <span style="display:${
                  youtube == null ? "none !important" : "block"
                };"><a href="https://www.youtube.com/channel/${youtube}" target="_blank" class="socials" rel="noopener"><span class="iconify" data-icon="entypo-social:youtube-with-circle"></span></a></span>
                </div>
                </div>
                `;

          document.getElementById("script").innerHTML = `<script>
            //Magic Grid
            const magicProjectsGrid = new MagicGrid({
              container: "#work_section",
              animate: false,
              gutter: 30, // default gutter size
              static: true,
              useMin: false,
              maxColumns: 2,
              useTransform: true
            });

            const magicForksGrid = new MagicGrid({
              container: "#forks_section",
              animate: false,
              gutter: 30, // default gutter size
              static: true,
              useMin: false,
              maxColumns: 2,
              useTransform: true
            });

            $("document").ready(() => {
              magicProjectsGrid.listen();
              magicForksGrid.listen();
            });
          </script>`;

          //add data to config.json
          const data = await getConfig();
          data[0].username = user.login;
          data[0].name = user.name;
          data[0].userimg = user.avatar_url;

          await fs.writeFile(
            `${outDir}/config.json`,
            JSON.stringify(data, null, " "),
            function (err) {
              if (err) throw err;
              console.log("Config file updated.");
            }
          );
          await fs.writeFile(
            `${outDir}/index.html`,
            "<!DOCTYPE html>" + window.document.documentElement.outerHTML,
            function (error) {
              if (error) throw error;
              console.log(`Build Complete, Files can be Found @ ${outDir}\n`);
            }
          );
        } catch (error) {
          console.log(error);
        }
      })();
    })
    .catch(function (error) {
      console.log(error);
    });
};
