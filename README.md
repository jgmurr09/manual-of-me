# Manual of Me — TANG Onboarding MVP

A static site with no installation or build step that combines a bite-sized **Manual of Me** builder and **Project Kickoffs** with a personalized **onboarding flight plan**, **Slack intro card**, **onboarding-team brief**, **team directory**, and **resource library**.

## Project Kickoffs and teammate feedback

**Project Kickoffs** is a separate collaboration flow designed for about 4–5 minutes. Open `index.html#kickoffs` to go straight there, including on a fresh browser.

1. **My part:** name, effort, and one short sentence about what teammates can count on you for. A nickname and photo are optional.
2. **Skills + growth:** add your own skill tags across disciplines, choose optional Power Skills, and describe something you want to try or learn on this effort.
3. **Working together:** four optional sliders capture today's preferences. An untouched midpoint is not saved as an answer; “Use the middle” records it deliberately. Contact details and working hours are optional extras.
4. **The human:** what helps you contribute, support when stuck, a conversation starter, and optional kickoff energy.

Saved identity and working preferences can be copied into a new project card. Every project has independent answers; revising a project card never rewrites the general Manual. Growth and roles stay specific to the effort. These are conversation starters for multidisciplinary teams, not a prescribed team process or personality scores.

The finished card offers a landscape PNG for Miro, a portrait layout, a paginated PDF, plain text, and an editable JSON backup. All answers wrap in full. Photos are optional and use a cover crop with adjustable horizontal and vertical framing. Drafts save in the current browser and resume at the saved step.

### Restore a lost Manual

Use **Restore a Manual** from the header, mobile menu, welcome screen, or kickoff page. It accepts PNG, JPG, WebP, and JSON backups.

- New PNG exports include editable recovery data for the answers represented by that output. Uploading an original export restores those fields exactly, including skill tags, sliders, and a photo when present. A kickoff PNG does not include unrelated profiles or other projects.
- Older PNGs and screenshots can be read locally with the bundled English text reader. Review, edit, and select the recovered fields before applying them. Small type, multiple columns, screenshots, and image edits can reduce accuracy. Photos and graphical slider positions may need to be re-added.
- Choose the general Manual, a new kickoff, or the current kickoff as the destination. By default, existing answers are kept and only empty answers are filled. Replacing selected answers is an explicit choice. Full JSON backups can also restore the onboarding section and multiple projects.
- Keep original PNGs or JSON backups. Miro and other image editors can strip recovery data when they re-export an image; the visible text can still be offered for review.

New PNG recovery, normal form entry, and exports work when opening `index.html` directly. Reading older images uses a Web Worker and WebAssembly, so use a hosted copy or the included local server. See `START_HERE.txt`. All OCR assets and language data are bundled; no image is sent to a remote recognition service. Vendor licenses are included under `assets/vendor/ocr/`.

The Photos tab, gallery code, and gallery assets have been removed. Onboarding crew portraits and the existing RP1 resource images are retained.

The general Manual now includes:

- Full name plus an optional nickname or preferred name. The full name remains on exports; “Call me…” connects the two.
- An optional **TANG Leadership** connection. Set `SHOW_TANG_LEADERSHIP` in `app.js` to `false` after the initial rollout; existing answers stay intact.
- Clear required and optional labels. Personal stories, growth prompts, and hospitality are optional. Required Manual content is a name, introduction, at least one Power Skill, communication style, working style, feedback preference, and a way to help when stuck.
- Work location, usual hours and time zone, preferred contact methods, and a “think out loud / time to process / both” discussion preference.
- Optional military experience, branch, and domain tags.
- Power Skills mini descriptions visible on touch screens as well as desktop, based on the supplied TANG Power Skills reference.
- Expandable help explaining Navy and mission context, including learning a new domain.
- A clear stopping point after the Manual. Slack introductions and the onboarding flight plan can be added separately later.
- Optional empty sections omitted from completed outputs. PNGs grow to fit answers; Manual PDFs paginate at a readable size. Teammate cards include complete answers instead of shortening or dropping blocks.

`kickoffs.js` holds the project flow and shared export layout. `manual-transfer.js` handles image recovery and photo framing. Keep both beside `app.js`, `index.html`, and `styles.css`; `index.html` loads them before `app.js`. Existing browser profiles and older JSON backups are retained.

## What is in the build

- One-screen-at-a-time reflection inspired by the existing Creativity Archetype experience
- Chunked dashboard: Meet Me / How I Work / Show Me Around / The Important Stuff
- Photo upload, resized in-browser
- 13 TANG Power Skills with the first five marked as core day-to-day skills
- Communication, teaming, feedback, work-style spectra, support, growth, and hospitality prompts
- Topic-by-topic onboarding support matrix
- Tool support matrix for Miro, Slack, Box, Flank Speed/NVD, and Zoom/Teams
- Current-access check
- Learning-mode + pacing preferences
- Responsive Manual of Me and project-specific kickoff Manuals
- Downloadable Manual PNG + paginated PDF
- Three shuffle-able intro card layouts + downloadable PNG
- Copyable Slack intro text
- Personalized onboarding flight plan
- Downloadable onboarding-team brief + copyable text version
- Existing Day 1 → Months 2–3+ onboarding timeline
- Team cards with headshots, one-sentence bios, compact background / off-the-clock notes, and “reach out for…” descriptions
- Resource library with Public / Internal / Gated access labels
- RP1 culture cards using the supplied photos
- Local browser autosave
- JSON backup/import model for moving all answers to another browser without a database
- Responsive layout, visible focus states, and reduced-motion support

## Run it

Open `index.html` directly, or for the most reliable behavior:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

This has no build step. It can be pushed to a GitHub repository and served with GitHub Pages, or dropped onto Netlify/Vercel as a static site.

## Information-handling note

This build saves answers in the user's browser using `localStorage`. A profile photo is resized before it is stored. **Do not use a public/static deployment to collect CUI, classified, export-controlled, sensitive mission information, or information someone would not be comfortable sharing with the intended onboarding audience.**

Before a centrally stored team database is built, define the approved hosting environment, access model, retention rules, data owner, and which profile fields are appropriate to store/share.

## Where to add internal Slack / Box links

The site intentionally leaves internal URLs blank rather than embedding them in a potentially public build.

Open `app.js` and edit:

- `TEAM` → add a person's approved internal profile link in `link:`
- `RESOURCES` → add an approved internal URL in `url:`

The UI already handles empty internal links and displays **Available after access** / **Slack link can be added**.

This makes it possible to maintain a public/external-safe configuration and an internal configuration later without redesigning the UI.

## Where to add or replace team photos

In `app.js`, add a relative asset path to a TEAM entry:

```js
{
  name: 'Example Teammate',
  image: 'assets/people/example.jpg',
  ...
}
```

Create `assets/people/` and drop the approved photos there.

## Where to add more tabs later

The current navigation remains route-based so future modules can be added without rebuilding the profile model. Good candidates include:

1. Searchable team database
2. Stakeholder map
3. Project matching
4. Experiences + event opportunities
5. TANGline / project history
6. Power Skills growth opportunities
7. Mentorship / TANGmate matching
8. Admin resource editor

## Suggested next validation pass

1. Add Moriah’s approved photo / compact bio when available.
2. Add approved internal URLs for Slack, Box, Miro Hub, Navy 101, Book306, and access-controlled impact sources.
3. Create 2–3 example completed Manuals representing different onboarding needs and work styles.
4. Pilot the flow with recent onboarders and time each chapter.
5. Ask whether the generated Manual sounds like them, whether the onboarding brief would genuinely change how the team supports them, and which questions feel repetitive or too personal.
6. Only then decide whether centrally stored profiles are worth the governance and engineering cost.

## Supplied assets included

The `assets/` folder contains the provided brand references, TANG logo references, RP1 culture photos, and onboarding checklist image. `tang-logo-white.png` and `tang-t-white.png` are transparent variants for dark UI surfaces.

## Browser notes

- Open `index.html` to start the prototype.
- The header **TANG website** link and the Official TANG Website resource intentionally use the `microsoft-edge:` URL scheme so the NAVSEA TANG page opens in Microsoft Edge when Edge is installed.
- The browser favicon uses the TANG T mark.

## V3.3 export-layout updates

- Removed the ME / HI / GO graphic labels from the Hand It Off deliverable cards.
- Gave the three deliverables distinct TANG-color treatments instead.
- Manual of Me PNG exports now measure content before drawing, grow vertically when needed, and add more breathing room between sections.
- Paired Manual fields now share the height of the longer neighbor; exceptionally long paired answers automatically reflow to full-width stacked cards.
- Longer answers gently reduce type size within readable limits rather than overlapping other content.
- Onboarding brief exports now grow vertically as content grows, so the footer cannot collide with the brief.

## V3.4 progressive workflow update

The onboarding experience is now intentionally non-linear. Teammates can complete Meet Me, How I Work, Show Me Around, or the optional welcome details in separate sessions.

- Completing **Meet Me** prompts a starter intro-card download.
- Completing **How I Work** prompts a Manual of Me download.
- Completing **Show Me Around** prompts an onboarding-brief download.
- The onboarding tab can be completed first and exported independently of the rest of the Manual.
- After each completed chunk, the tool recommends the next unfinished chunk instead of assuming everyone follows the same sequence.
- The onboarding page now surfaces a clear "build / continue / download" state at the top so the export does not depend on reaching the final handoff screen.
- Starter intro cards progressively fill in as more profile data is added rather than showing placeholder content for unfinished sections.

## V3.5 output-examples update

- Added a dedicated **Examples** tab to the primary and mobile navigation.
- The landing-page **See example outputs** action now opens this tab before a teammate has to start their own Manual.
- Added a complete Patrick Alfonzo example showing the four practical outcomes: Manual of Me, New Teammate intro card, personalized onboarding flight plan, and onboarding-team brief.
- Patrick's factual bio content is condensed from the provided teammate bio. Work-style, growth, tool, and onboarding-preference responses are clearly labeled as illustrative sample answers rather than confirmed personal preferences.
- All three downloadable example artifacts can be downloaded directly from the Examples tab without changing or overwriting the user's own saved profile.

## Regression checks

The normal form flows have no external runtime dependencies; optional image reading uses the bundled OCR assets. The optional export checks use Node.js and `@napi-rs/canvas` for real font measurement and raster output. With that package installed, run:

```bash
node tests/manual.test.cjs
```

If it is installed outside this checkout, set `NODE_PATH` to that package location. Set `MANUAL_QA_OUTPUT` to a temporary directory to write the test PNGs and PDF for visual review. The checks cover old-profile migration, Manual-only completion, separate project records, draft resume data, JSON import, maximum-length answers, long unbroken text, and PDF pagination.
