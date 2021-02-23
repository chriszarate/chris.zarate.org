# Eleventy / 11y WordPress.com static site generator

This is an [Eleventy / 11y][11y] static site generator using a [WordPress.com][wp]
blog as its data source. It pulls posts and pages from the WordPress.com REST
API, supplies the data to Eleventy templates, uploads the result to an S3 bucket,
and optionally invalidates a CloudFront distribution.

It also provides dark-mode-aware syntax highlighting using [Prism][prism].

In other words, it allows you to use WordPress.com as your CMS but publish a
static site to S3. This repo powers my [personal site][me] but you are free to
fork and adapt it for your own purposes.

## Setup

Copy `config.example.js` to `config.js` and edit it to provide your site details.

Start Eleventy's dev server to work on your templates. Note that data will only
be fetched once and cached. If you make changes in WordPress.com, you'll need to
stop and restart.

```sh
npm start
```

Publishing is manual. Make sure your AWS credentials are available via
environment variables or `~/.aws/credentials`.

```sh
npm run deploy
```

[11y]: https://www.11ty.dev
[me]: https://chris.zarate.org
[prism]: https://prismjs.com
[wp]: https://wordpress.com
