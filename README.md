# Manual of Me — TANG Onboarding MVP

A dependency-free static site that combines a bite-sized **Manual of Me** builder with a personalized **onboarding flight plan**, **Slack intro card**, **onboarding-team brief**, **team directory**, and **resource library**.

## What changed in this pass

- Added approved teammate headshots for Jackson, Patrick, Amy, and Maria
- Reworked the People tab into a bite-sized onboarding crew directory: one-sentence bio, quick background, off-the-clock note, and a clear “reach out for” reason
- Replaced the landing-page Jackson initials with his real headshot in the example Manual
- Header renamed to **Manual of Me — Brought to you by TANG Onboarding**
- Primary navigation centered on desktop
- Official public TANG website linked from the banner
- More energetic Book306-aligned visual language using TANG navy, blue, orange, yellow, pink, graphic marks, clapperboard stripes, and field-guide styling
- Fresh storage key so a new teammate begins at **0%**, not with pre-populated support answers
- Progress now reflects **answered content**, not simply how far someone clicked through the flow
- First-screen Back button returns Home
- Identity step now captures career stage + TANG connection + optional APL area / partner organization
- Bio step includes additional “think about” prompts
- Work-style prompts include fill-in options
- “I’m at my best” changed from a pick-three list to four five-point work-style spectra
- Onboarding support and tool preferences are explicitly included in a shareable onboarding-team brief
- Tool step now captures current access status
- Final screen now gives a concrete handoff: review → download → send
- Resource library now has an **RP1** filter; Beverage Co-Op, Little Library, and Letters to a Teammate live there instead of appearing under every filter
- Major emoji UI elements replaced with local graphic marks and visual cards
- Public DVIDS design-thinking story added as mission-context inspiration
- Language revised to sound like a trusted teammate rather than an AI-generated onboarding product
- Intro-card language updated to **New Teammate Unlocked**

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
- Responsive Manual of Me page
- Downloadable Manual PNG + print/save-as-PDF path
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
