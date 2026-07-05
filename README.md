# pufferfishmusic.net

Personal game-audio portfolio of **Shangyi Zhu** — a fast, static site hosted for free on
GitHub Pages. No build step, no framework: plain HTML + CSS + vanilla JS you can edit directly.

Live at: https://www.pufferfishmusic.net (once DNS is set up — see below)
Preview URL: https://pufferfish-sz.github.io/pufferfishmusic/

---

## File map — where everything lives

```
index.html          Home (hero, demo reel, about, skills, timeline)
projects.html       Projects overview (3 cards)
ue5-ambience.html   Project 01 — UE5 environmental ambience documentation
game-jams.html      Project 02 — game jams & programming
music.html          Project 03 — music compositions
internships.html    Tencent + Lilith internships
contact.html        Contact form + social links + piano video

css/style.css       ALL styling. Colors/fonts live in the :root block at the top.
js/videos.js        ★ ALL video IDs live here — the only file to edit for videos.
js/embed.js         The dual YouTube/Bilibili player (don't edit).
js/main.js          Nav menu, hero waveform, scroll animations, contact form (don't edit).

assets/img/         Images (AVIF, already compressed)
assets/fonts/       Self-hosted fonts (no Google Fonts request — loads fine in China too)
assets/audio/       Drop MP3s here for the music page
CNAME.disabled      Custom domain marker — rename to CNAME when switching DNS (see below)
.nojekyll           Tells GitHub Pages to serve files as-is (don't delete)
```

## How to edit content

Every page is plain HTML — open it, find the text, change it, save. Then publish with:

```
git add -A
git commit -m "Update content"
git push
```

GitHub Pages redeploys automatically within a minute or two.

### Update video IDs (the placeholders!)

Open **`js/videos.js`**. Each video has a YouTube ID and a Bilibili BV id:

```js
demoreel: {
  title: "Audio Demo Reel",
  yt: "YT_VIDEO_ID_DEMOREEL",   // ← replace with e.g. "dQw4w9WgXcQ"
  bili: "BILI_BVID_DEMOREEL",   // ← replace with e.g. "BV1xx411c7mD"
},
```

- YouTube ID = the part after `watch?v=` in the video URL.
- Bilibili BV id = the `BV...` part of the video URL.
- Until you replace a placeholder, the site shows a "coming soon" panel for it (on the
  YouTube tab, the Bilibili tab, or both — each side works independently).

### Add a new project

1. Copy an existing project page (e.g. `game-jams.html`) to a new file, say `my-project.html`.
2. Edit the `<title>`, the `page-hero` block, and the sections.
3. Add a card linking to it on `projects.html` (copy one of the three `<a class="card">` blocks).
4. Need a video? Add an entry in `js/videos.js`, then put
   `<div class="video-embed" data-video="your_key"></div>` where the player should appear.

### Change colors / fonts

Everything is defined once in the `:root` block at the top of `css/style.css`.

## Contact form — one-time setup (2 minutes)

The form uses [Web3Forms](https://web3forms.com) (free, no account required):

1. Go to https://web3forms.com, enter your email (the one that should RECEIVE messages),
   and click **Create Access Key**. The key arrives by email instantly.
2. Open `contact.html`, find `WEB3FORMS_ACCESS_KEY_HERE`, and replace it with your key.
3. Commit + push. Test the form on the live site — submissions arrive in your inbox.

(Alternative: [Formspree](https://formspree.io) also works — create a form there and swap the
form `action` URL instead.)

## Custom domain: pufferfishmusic.net

The domain marker currently sits at **`CNAME.disabled`** so that the temporary
`*.github.io` preview URL keeps working while `pufferfishmusic.net` still points at Wix.
Going live is three steps:

### 0. Activate the CNAME file (when you're ready to switch)

```
git mv CNAME.disabled CNAME
git commit -m "Go live on pufferfishmusic.net"
git push
```

(While `CNAME` is active, the github.io URL redirects to the custom domain — that's
expected.)

### 1. DNS records at your registrar

Your domain is currently managed through **Wix**. Log in to Wix → **Domains** →
`pufferfishmusic.net` → **Manage DNS records** (if you cancel the Wix site plan, you keep the
domain — DNS editing stays available). Add:

| Type  | Host / Name | Value                    |
|-------|-------------|--------------------------|
| A     | @           | 185.199.108.153          |
| A     | @           | 185.199.109.153          |
| A     | @           | 185.199.110.153          |
| A     | @           | 185.199.111.153          |
| CNAME | www         | pufferfish-sz.github.io  |

Delete any existing A / CNAME records on `@` and `www` that point to Wix, otherwise the old
site keeps loading. DNS changes can take up to a few hours to propagate.

> Prefer to leave Wix entirely? Transfer the domain to a registrar like Cloudflare or
> Namecheap (Wix → Domains → Transfer away). After the transfer, create the same records
> there. The transfer takes ~5-7 days; the site keeps working during it if the records match.

### 2. GitHub settings

Repo → **Settings → Pages**:
- **Custom domain**: enter `www.pufferfishmusic.net` → Save.
- Wait for the DNS check to pass, then tick **Enforce HTTPS**
  (the certificate can take up to ~24 h to provision).

## How deployment works

GitHub Pages serves the `main` branch of this repo directly — every push to `main` is a
deploy. There is no build step and nothing else to configure.
