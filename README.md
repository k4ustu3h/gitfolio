[![Build Status](https://img.shields.io/travis/com/k4ustu3h/gitfolio?logo=travis&style=for-the-badge)](https://travis-ci.org/k4ustu3h/gitfolio)
[![Codacy Badge](https://img.shields.io/codacy/grade/f5dd63eb7ece4716906a4aeeb9ea1b25?logo=codacy&style=for-the-badge)](https://www.codacy.com/manual/k4ustu3h/gitfolio)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&style=for-the-badge)](https://github.com/prettier/prettier)
[![Dependency Status](https://img.shields.io/david/k4ustu3h/gitfolio?style=for-the-badge)](https://david-dm.org/k4ustu3h/gitfolio)
[![devDependencies Status](https://img.shields.io/david/dev/k4ustu3h/gitfolio?style=for-the-badge)](https://david-dm.org/k4ustu3h/gitfolio?type=dev)
[![GitHub release](https://img.shields.io/github/release/imfunniee/gitfolio.svg?style=for-the-badge)](https://github.com/imfunniee/gitfolio/releases/latest)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/k4ustu3h/gitfolio?logo=snyk&style=for-the-badge)](https://snyk.io/test/github/k4ustu3h/gitfolio?targetFile=package.json)

# Gitfolio

### personal website + blog for every github user

Gitfolio will help you get started with a portfolio website where you could showcase your work + a blog that will help you spread your ideas into real world.

<img src="https://i.imgur.com/eA6clZr.png">

---

Check out this [live demo](https://k4ustu3h.cf) to see gitfolio in action.

---

# Getting Started

### Let's Install

Install gitfolio

```sh
➜  ~ git clone https://github.com/k4ustu3h/gitfolio.git
➜  ~ cd gitfolio
➜  ~ npm install -g
```

### Let's Build

Using the UI

```sh
➜  ~ gitfolio ui
```

> Tip: You can use ui for updating your gitfolio too.

or

```sh
➜  ~ gitfolio build <username>
```

`<username>` is your username on github. This will build your website using your GitHub username and put it in the `/dist` folder.

To run your website use `run` command, Default port is 3000

```sh
➜  ~ gitfolio run -p [port]
```

🎉 Congrats, you just made yourself a personal website!

---

### Let's Customize

#### Forks

To include forks on your personal website just provide `-f` or `--fork` argument while building

```sh
➜  ~ gitfolio build <username> -f
```

#### Sorting Repos

To sort repos provide `--sort [sortBy]` argument while building. Where `[sortBy]` can be `star`, `created`, `updated`, `pushed`,`full_name`. Default: `created`

```sh
➜  ~ gitfolio build <username> --sort star
```

#### Ordering Repos

To order the sorted repos provide `--order [orderBy]` argument while building. Where `[orderBy]` can be `asc` or `desc`. Default: `asc`

```sh
➜  ~ gitfolio build <username> --sort star --order desc
```

#### Customize Themes

Themes are specified using the `--theme [theme-name]` flag when running the `build` command. The available themes are

-   `light`
-   `dark`

> TODO: Add more themes

For example, the following command will build the website with the dark theme

```sh
➜  ~ gitfolio build <username> --theme dark
```

#### Customize background image

To customize the background image just provide `--background [url]` argument while building.

```sh
➜  ~ gitfolio build <username> --background https://images.unsplash.com/photo-1557277770-baf0ca74f908?w=1634
```

You could also add in your custom CSS inside `index.css` to give it a more personal feel.

#### Customize profile picture

You can either use your GitHub profile picture or you can add your initials in an animated gradient. Just provide `-i` or `--initials` argument while building.

```sh
➜  ~ gitfolio build <username> --initials K_
```

#### Add Social Media links on your profile

gitfolio supports adding the following Social links

-   Codepen `-c, --codepen <username>`
-   Dev.to `-d, --dev <username>`
-   Dribbble `-D, --dribbble <username>`
-   Email `-e, --email <email>`
-   Facebook `-F, --facebook <username>`
-   Gravatar `-g, --gravatar <username>`
-   Instagram `-I, --instagram <username>`
-   Keybase `-k, --keybase <username>`
-   Medium `-m, --medium <username>`
-   Pinterest `-p, --pinterest <username>`
-   Reddit `-r, --reddit <username>`
-   Stack Exchange `-E, --stackexchange <user id>`
-   Steam `-S, --steam <username>`
-   Telegram `-T, --telegram <username>`
-   Twitter `-w, --twitter <username>`
-   XDA Developers `-x, --xda <user id>`
-   YouTube `-y, --youtube <channel id>`

```sh
➜  ~ gitfolio build <username> --twitter <twitter_username> --dribbble <dribbble_username>
```

---

### Let's Publish

Head over to GitHub and create a new repository named `username.github.io`, where username is your username. Push the files inside`/dist` folder to repo you just created.

Go To `username.github.io` your site should be up!!

---

### Updating

To update your info, simply run

```sh
➜  ~ gitfolio update
```

or use the `Update` options in gitfolio's UI

This will update your info and your repository info.

To Update background or theme you need to run `build` command again.

---

### License

[![License](https://img.shields.io/github/license/k4ustu3h/gitfolio.svg?style=for-the-badge)](https://github.com/k4ustu3h/gitfolio/blob/master/LICENSE)

---

## Acknowledgments

-   Hat tip to anyone who's code was used
-   The original [gitfolio](https://github.com/imfunniee/gitfolio) made by [@imfunniee](https://github.com/imfunniee/)

---

[![CSS](https://img.shields.io/badge/uses-css-1572B6?logo=css3&style=for-the-badge)](https://github.com/topics/css)
[![h9rbs.js](https://img.shields.io/badge/uses-h9rbs.js-473349?style=for-the-badge)](https://html9responsiveboilerstrapjs.com/)
[![HTML](https://img.shields.io/badge/uses-html-E34F26?logo=html5&style=for-the-badge)](https://github.com/topics/html)
[![JavaScript](https://img.shields.io/badge/made_with-javascript-F7DF1E?logo=javascript&style=for-the-badge)](https://github.com/topics/javascript)
