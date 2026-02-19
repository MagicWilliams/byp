# Black Youth Project: Website Architecture + Content Management Guide

This document outlines how the Black Youth Project website is structured, how content flows from the WordPress admin into the public site, and how staff can manage and publish updates. The goal is to make the editing process clear and straightforward, especially for the Issues feature powering the Black Life Everywhere section.

---

## 1. Overview of the System

The site uses two main components:

- **WordPress** — Where all editorial content lives. This includes:
  - Articles (standard WordPress posts)
  - Categories and tags
  - The Issues content type (for Black Life Everywhere)
  - Pages (About, Contact Us, Submissions, Get Involved)

  All changes made in WordPress flow to the front-end automatically.

- **Next.js** — The public-facing website. It fetches published content from the WordPress back-end and renders it in a fast, modern UI.

**What's new since the last guide:** About, Contact Us, Submissions, and Get Involved are now **editable in WordPress** (no longer hard-coded). Search, clickable tags, and caching behavior are also documented here.

---

## 2. Deployment & Hosting

- **Public website (BYP):** Deployed on **Netlify**. The BYP team has access to the Netlify account.
- **WordPress (content backend):** Hosted on **Site Engine**. This is where you log in to manage articles, Issues, pages, and settings.

**Why it matters:** Content changes in WordPress flow to the live site automatically. The Netlify deployment rebuilds when content is updated, which is why caching delays (1–5 minutes) can occur after publishing.

---

## 3. Home Page

- **Latest Articles:** The home page automatically displays the most recent published WordPress posts. No action is needed on the front-end — publishing a post in WordPress is all that's required.
- **Featured Post:** The hero image and featured content come from posts in the **Featured** category. To feature a post, assign it to the "Featured" category in WordPress.
- **Category / Topic Filter:** The category strip on the home page pulls directly from WordPress categories and tags. To add a new topic, rename an existing one, or merge/remove tags, make changes under **Posts → Categories** or **Posts → Tags**. The front-end will update automatically.

---

## 4. The Issue Post Type (WordPress Admin → Issues)

This is the content type that powers the Black Life Everywhere section. It gives the team a clean way to publish themed "Issues" that bundle multiple articles together.

### Where to Find Issues

In WordPress, go to:

**WordPress Admin → Issues**

This appears in the sidebar with a book icon. Creating an Issue behaves very similarly to creating a new post, with a few additional fields.

### Required / Key Fields

- **Title** — The name of the issue. This is displayed on the Black Life Everywhere page (e.g., "BLE Issue 6").
- **Content** (main editor) — A short description (1–3 sentences) that introduces the issue's theme and context. This appears as the "About this issue" / letter from the editor text at the top of the issue on the front-end.
- **Featured Image** — This functions as the issue's cover photo. It appears in the main Black Life Everywhere listing and at the top of the individual issue page. Use high-quality images that represent the issue's theme.

### Issue Extras (ACF Meta Box)

Under the main editor, you'll see a custom meta box titled **Issue Extras**. This is where the special fields live:

- **Associated Articles** — Here you can link any existing WordPress posts to this issue. To add articles:
  1. Open the Issue Extras box
  2. Search for or select articles already published in WordPress
  3. Add as many as needed

  These articles will appear grouped under the issue on the front-end in the Table of Contents.

- **Gradient Start / Gradient End** — These fields accept hex color codes (for example: `#FF5733` or `#1A1A1A`). They generate a gradient background theme for the issue page.
  - **Gradient Start** = top left
  - **Gradient End** = bottom right

  The goal is to give each issue its own feel while staying brand-consistent.

### Publishing Workflow

Publishing an issue is no different than publishing a post:

1. Fill in the title and content (overview text)
2. Add articles in the Issue Extras section
3. Add gradient colors (optional but recommended)
4. Upload a featured image
5. Hit **Publish**

Once published, the issue appears on the Black Life Everywhere page, and the associated articles appear inside it. Any updates in WordPress will reflect automatically on the site. No extra steps are required.

---

## 5. Black Life Everywhere Page (Redesigned)

**URL:** `/black-life-everywhere`

### Content Sources

1. **Issues** (from the Issue post type) — Each issue shows its associated posts in a table-of-contents layout. The latest issue is displayed as the hero and expanded by default. Older issues appear as collapsible cards.
2. **"More from BLE"** section — Regular posts tagged `ble` or `black-life-everywhere`, or in the category `blacklifeeverywhere`, appear in this horizontal scroll section.

**Important:** Only content explicitly linked to an Issue (via Associated Articles) or tagged/categorized as above appears on this page.

### Layout

Magazine cover hero → expandable issue cards → "More from BLE" horizontal scroll

---

## 6. Customizable Pages (Previously Static)

**Note for returning editors:** About, Contact Us, Submissions, and Get Involved are now editable in WordPress. Edit them under **Pages** → find by title.

| Page | WordPress Slug | Key Editable Fields |
|------|----------------|---------------------|
| **About** | `about-us` | Hero title/subtitle, main content, hero image, team members (name, bio, image), history sections, CTA link |
| **Contact Us** | `contact-us` | Page title, get-in-touch text, contact email, address lines, FAQ items |
| **Submissions** | `submissions` | Guidelines, content types, requirements, process steps, contact info |
| **Get Involved** | `get-involved` | Hero image, intro text, pitch section, republish section, submissions link |

- **Where to edit:** WordPress Admin → Pages → find the page by title (About Us, Contact Us, etc.)
- **Fallback:** If ACF fields are empty, the site shows built-in default content.

---

## 7. Search Page

**URL:** `/search` (also accessible via the search icon in the header)

### Features

- **Text search** — Searches post titles and content
- **Tag filter** — Clicking a tag on any article takes you to `/search?tag=tag-slug` to see all articles with that tag
- **Combined search** — You can search by text within a specific tag
- **Pagination** — 12 results per page

### How to Use

Enter a term in the search bar, or click a tag on any article to see all content with that tag.

---

## 8. Clickable Tags

- **Where:** Tags appear on individual article pages, below the title.
- **Behavior:** Each tag links to the Search page filtered by that tag. Readers can click a tag to discover more articles on that topic.
- **Editor impact:** Add tags to posts as usual in WordPress (Posts → Tags). They automatically become clickable on the site. No extra setup required.

---

## 9. Caching and Content Workflow

The site caches content for performance (faster load times). Here's what editors need to know:

- **New or edited posts** may take **1–5 minutes** to appear on the live site
- **Issues** are cached for about 1 minute
- **Pages, posts, and tags** are cached for about 5 minutes

### Process for Adding or Editing Content

1. Create or edit in WordPress as usual
2. Publish
3. Wait 1–5 minutes for the site to refresh its cache
4. If content still doesn't appear, try a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac) or wait a bit longer

> **Tip:** We cache for performance so the site loads quickly for readers. If you've just published something and don't see it yet, give it a minute or two — it will surface soon.

---

## 10. Troubleshooting + Tips

- **Issue not showing up?** Make sure it is published (not in draft mode) and has a featured image.
- **Article not appearing under the issue?** Confirm that the article is added in Issue Extras → Associated Articles.
- **Colors not rendering?** Ensure you are entering valid hex codes with a leading `#` (e.g., `#FF5733`).
- **New content not appearing?** Caching may delay visibility by 1–5 minutes. Wait or try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R).

---

## 11. Other Features

- **Author pages** — Each author has a page at `/author/{username}`. Authors are WordPress users; add bios in user profiles if you want them to appear on article pages.
- **Related articles** — Shown at the bottom of each article; based on shared tags.
- **Email signup** — Footer newsletter signup (MailerLite).
- **Navigation** — Header: Home, About, Black Life Everywhere, Get Involved. Footer: Contact, Submissions, About, Terms, Donate.

---

## 12. Quick Reference

| What | Where / How |
|------|-------------|
| **WordPress page slugs** | about-us, contact-us, submissions, get-involved |
| **BLE "More" section** | Tag posts `ble` or `black-life-everywhere`, or use category `blacklifeeverywhere` |
| **Featured homepage** | Assign posts to the "Featured" category |

---

## 13. Support

If the team needs help creating their first issue, revising gradients, updating page content, or troubleshooting anything in the WordPress back-end or the public site, we're happy to assist.

The overall process is designed to be simple and familiar: everything runs through WordPress, just like articles. The only new concept is Issues, and once you create one, the workflow becomes straightforward.
