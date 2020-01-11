const fs = require("fs");
const emoji = require("github-emoji");
const jsdom = require("jsdom").JSDOM;
const options = {
	resources: "usable"
};
const {getConfig, outDir} = require("./utils");
const {getRepos, getUser} = require("./api");

function convertToEmoji(text) {
	if (text === null) {
		return;
	}

	text = text.toString();
	const pattern = /(?<=:\s*).*?(?=\s*:)/gs;
	if (text.match(pattern) !== null) {
		let str = text.match(pattern);
		str = str.filter(arr => {
			return /\S/.test(arr);
		});
		for (i = 0; i < str.length; i++) {
			if (emoji.URLS[str[i]] !== undefined) {
				text = text.replace(
					`:${str[i]}:`,
					`<img src="${emoji.URLS[str[i]]}" class="emoji">`
				);
			}
		}

		return text;
	}

	return text;
}

module.exports.updateHTML = (username, opts) => {
	const {
		includeFork,
		codepen,
		dev,
		dribbble,
		email,
		instagram,
		reddit,
		telegram,
		twitter
	} = opts;
	// add data to assets/index.html
	jsdom
		.fromFile(`${__dirname}/assets/index.html`, options)
		.then(dom => {
			const {window} = dom;
			const {document} = window;
			(async () => {
				try {
					console.log("Building HTML/CSS...");
					const repos = await getRepos(username, opts);

					for (const element of repos) {
						let element;
						if (element.fork === false) {
							element = document.querySelector("#work_section");
						} else if (includeFork === true) {
							document.querySelector("#forks").style.display = "block";
							element = document.querySelector("#forks_section");
						} else {
							continue;
						}

						element.innerHTML += `
                        <a href="${element.html_url}" target="_blank">
                        <section>
                            <div class="section_title">${element.name}</div>
                            <div class="about_section">
                            <span style="display:${
															element.description === undefined
																? "none"
																: "block"
														};">${convertToEmoji(element.description)}</span>
                            </div>
                            <div class="bottom_section">
                                <span style="display:${
																	element.language === null
																		? "none"
																		: "inline-block"
																};"><i class="mdi mdi-code-tags"></i>&nbsp; ${
							element.language
						}</span>
                                <span><i class="mdi mdi-star"></i>&nbsp; ${
																	element.stargazers_count
																}</span>
                                <span><i class="mdi mdi-source-branch"></i>&nbsp; ${
																	element.forks_count
																}</span>
                            </div>
                        </section>
                        </a>`;
					}

					const user = await getUser(username);
					document.title = user.login;
					const icon = document.createElement("link");
					icon.setAttribute("rel", "icon");
					icon.setAttribute("href", user.avatar_url);
					icon.setAttribute("type", "image/png");

					document.querySelectorAll("head")[0].append(icon);
					document.querySelectorAll("head")[0].innerHTML += `
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
					document.querySelector(
						"#username"
					).innerHTML = `<span id="text" style="display:${
						user.name === null || !user.name ? "none" : "block"
					};"></span><div class='console-underscore' id='console'>&#95;</div><br><a href="${
						user.html_url
					}">@${user.login}</a>`;
					// document.getElementById("github_link").href = `https://github.com/${user.login}`;
					document.querySelector("#userbio").innerHTML = convertToEmoji(
						user.bio
					);
					document.querySelector("#userbio").style.display =
						user.bio == null || !user.bio ? "none" : "block";
					document.querySelector("#about").innerHTML = `
                <span style="display:${
									user.company == null || !user.company ? "none" : "block"
								};"><i class="mdi-face"></i> &nbsp; ${user.company}</span>
                <span style="display:${
									user.email == null || !user.email ? "none" : "block"
								};"><i class="mdi mdi-email"></i> &nbsp; ${user.email}</span>
                <span style="display:${
									user.location == null || !user.location ? "none" : "block"
								};"><i class="mdi mdi-map-marker"></i> &nbsp;&nbsp; ${
						user.location
					}</span>
                <span style="display:${
									user.hireable == false || !user.hireable ? "none" : "block"
								};"><i class="mdi mdi-account-tie"></i> &nbsp;&nbsp; Available for hire</span>
                <div class="socials">
                <span style="display:${
									codepen == null ? "none !important" : "block"
								};"><a href="https://codepen.io/${codepen}" target="_blank" class="socials"><i class="mdi mdi-codepen"></i></a></span>
                <span style="display:${
									dev == null ? "none !important" : "block"
								};"><a href="https://dev.to/${dev}" target="_blank" class="socials"><i class="mdi mdi-dev-to"></i></a></span>
                <span style="display:${
									dribbble == null ? "none !important" : "block"
								};"><a href="https://www.dribbble.com/${dribbble}" target="_blank" class="socials"><i class="mdi mdi-dribbble"></i></a></span>
                <span style="display:${
									email == null ? "none !important" : "block"
								};"><a href="mailto:${email}" target="_blank" class="socials"><i class="mdi mdi-email"></i></a></span>
                <span style="display:${
									instagram == null ? "none !important" : "block"
								};"><a href="https://www.instagram.com/${instagram}" target="_blank" class="socials"><i class="mdi mdi-instagram"></i></a></span>
                <span style="display:${
									reddit == null ? "none !important" : "block"
								};"><a href="https://www.reddit.com/u/${reddit}" target="_blank" class="socials"><i class="mdi mdi-reddit"></i></a></span>
                <span style="display:${
									telegram == null ? "none !important" : "block"
								};"><a href="https://t.me/${telegram}" target="_blank" class="socials"><i class="mdi mdi-telegram"></i></a></span>
                <span style="display:${
									twitter == null ? "none !important" : "block"
								};"><a href="https://www.twitter.com/${twitter}" target="_blank" class="socials"><i class="mdi mdi-twitter"></i></a></span>
                </div>
                `;
					// add data to config.json
					const data = await getConfig();
					data[0].username = user.login;
					data[0].name = user.name;
					data[0].userimg = user.avatar_url;

					await fs.writeFile(
						`${outDir}/config.json`,
						JSON.stringify(data, null, " "),
						err => {
							if (err) {
								throw err;
							}

							console.log("Config file updated.");
						}
					);
					await fs.writeFile(
						`${outDir}/index.html`,
						"<!DOCTYPE html>" + window.document.documentElement.outerHTML,
						error => {
							if (error) {
								throw error;
							}

							console.log(`Build Complete, Files can be Found @ ${outDir}\n`);
						}
					);
				} catch (error) {
					console.log(error);
				}
			})();
		})
		.catch(error => {
			console.log(error);
		});
};
