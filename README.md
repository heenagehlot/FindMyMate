# FindMyMate

**Find yourself roommates.**

FindMyMate is an India-first roommate discovery concept. It is intended to help people moving to a new city find potential roommates based on day-to-day living preferences as well as practical needs such as budget and location.

## Project and version status

| Version | Scope | Status |
|---|---|---|
| **0.1.0** | Responsive landing and discovery demo with fictional profiles, city and budget filters, and session-only like/pass actions | **Completed baseline** |
| **0.2.0** | Multi-screen frontend prototype covering the user journey from account and onboarding screens through discovery, demo connections, settings, and safety | **Milestone 1 complete; later milestones pending** |
| **0.3.0** | Backend and application foundation, including API, database, authentication, and persistent profiles | **Planned** |

Version 0.1.0 remains the preserved starting point. Its baseline overview is archived in [`docs/version-0.1.0.md`](docs/version-0.1.0.md), and its implementation remains available in Git history. Version 0.2.0 is a separately documented next phase; its requirements are in [`docs/version-0.2.0.md`](docs/version-0.2.0.md). The v0.2.0 brief requires a review and approval of Milestone 1 before product code changes begin.

## Current application

The application preserves the v0.1.0 static frontend concept and adds the approved v0.2.0 Milestone 1 navigation shell:

- Responsive landing page and roommate discovery section.
- Fictional sample profiles with illustrative shared-living highlights.
- Destination-city and maximum-budget filters.
- Like, pass, and reset actions held in page memory only.
- Privacy and safety principles for the planned product.
- Responsive navigation for the public sections and planned prototype destinations.
- Clearly labelled placeholder screens for features scheduled in later milestones.

There is no account system, backend, real matching, messaging, verification, moderation service, or persistent profile data. Demo interactions do not contact another person. Do not enter real personal information. Compatibility descriptions are illustrative and are not validated recommendations or guarantees.

## Run locally

No package installation is required. From the repository directory, start a static server:

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Version 0.2.0 development approach

Version 0.2.0 is scoped as a frontend prototype, not a production service. Its development brief calls for a guided, multi-screen experience with clearly labelled simulated features and fictional data. Real authentication, server-backed profiles, persistent matching, and production messaging are explicitly deferred.

Development is proceeding one approved milestone at a time. Milestone 1 established project navigation while preserving the existing v0.1.0 functionality. The current navigation shell routes to the landing/discovery experience and clearly labelled placeholders for screens scheduled in later milestones. No account, matching, or messaging service is implemented.

## Progress record

### 2026-11-16 — Version 0.2.0 kickoff

- Archived the v0.1.0 project overview and preserved the original application code unchanged.
- Added the supplied v0.2.0 development requirements to the repository.
- Reviewed the existing implementation against the v0.2.0 requirements.
- Recorded the review and proposed Milestone 1 approach below.
- Received approval to begin Milestone 1 implementation.
- Added responsive site/prototype navigation and explicit placeholders for future screens; the v0.1.0 discovery filters and demo actions remain available.
- Verified all navigation destinations, the existing discovery interactions, and layouts at 320px, 375px, 390px, 430px, 768px, 1366px, and 1440px.

### Repository review and proposed first milestone

**What exists and works:** the project uses plain HTML, CSS, and JavaScript; the landing page and discovery cards are responsive; the four fictional profiles can be filtered by city and maximum budget; users can like, pass, and reset demo choices for the current page session.

**Not yet implemented:** account screens, onboarding, editable profiles, profile details, dedicated likes/matches/messages screens, notifications, settings, safety/report workflows, persistent demo state, and the broader navigation.

**Technical considerations:** the current app is a single HTML page with styles and interactions in root-level files. Profile cards are constructed with `innerHTML`; current profile content is fixed demo data, but future user-entered content must be rendered safely. There is no shared application navigation, multi-screen routing, persistence layer, form-validation approach, or automated test suite.

**Milestone 1 scope:** make the smallest safe change needed to establish consistent navigation and reusable page structure, without introducing a framework or moving the working v0.1.0 files before a migration is justified. Preserve current discovery behavior and clearly identify any destinations that are not yet implemented.

**Files changed for Milestone 1:** `index.html`, `styles.css`, and `app.js`. No existing files were moved or deleted.

**Validation performed:** checked JavaScript syntax, verified every placeholder destination and return-to-discovery navigation in the browser, rechecked city filtering and like/reset actions, and tested the mobile navigation at 375px with no page-level horizontal overflow. The local static page continues to respond successfully.

## Product and privacy principles

- Keep exact residential addresses and private contact details out of public profiles.
- Collect only information needed for a clear product purpose.
- Clearly distinguish fictional or simulated prototype interactions from real services.
- Do not add real user profiles, identity documents, home addresses, credentials, or private uploads to the repository.
- Review legal, privacy, security, and operational requirements before a public launch.

## Development requirements

- Continue with HTML, CSS, and JavaScript unless a documented reason supports a change.
- Keep secrets out of source control; `.env.example` contains placeholders only.
- Avoid dependencies unless their need is explained.
- Test changes at mobile, tablet, and desktop sizes and preserve existing behavior.
- Refer to the v0.2.0 document for its complete requirements, milestones, acceptance checklist, and working agreement.

## Disclaimer

FindMyMate is an early product concept. Compatibility is subjective; the sample indicators are illustrative and are not a validated matching score or a guarantee of a successful living arrangement. This README is not legal advice or a declaration of regulatory compliance.
