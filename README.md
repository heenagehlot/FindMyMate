# FindMyMate

**Find yourself roommates.**

**Project owner:** Heenagehlot

FindMyMate is an India-first roommate discovery concept. It is intended to help people moving to a new city find potential roommates based on day-to-day living preferences as well as practical needs such as budget and location.

## Project and version status

| Version | Scope | Status |
|---|---|---|
| **0.1.0** | Responsive landing and discovery demo with fictional profiles, city and budget filters, and session-only like/pass actions | **Completed baseline** |
| **0.2.0** | Multi-screen frontend prototype covering account UI, onboarding, profile, discovery, demo connections, settings, notifications, and safety | **Frontend prototype complete** |
| **0.3.0** | Backend and application foundation, including API, database, authentication, and persistent profiles | **Audit and proposed architecture decision complete; owner approval pending** |

Version 0.1.0 remains the preserved starting point. Its baseline overview is archived in [`docs/version-0.1.0.md`](docs/version-0.1.0.md), and its implementation remains available in Git history. Version 0.2.0 scope, progress, and acceptance status are documented in [`docs/version-0.2.0.md`](docs/version-0.2.0.md).

## Current application

The application preserves the v0.1.0 landing and discovery concept and adds the v0.2.0 multi-screen prototype:

- Sign-up and sign-in forms with client-side validation, password visibility, and a fictional demo sign-in.
- Six-step onboarding for profile basics, relocation, accommodation, lifestyle preferences, illustration selection, and review.
- Session-only profile preview and edit flow.
- Fictional discovery profiles with city, budget, timing, accommodation, lifestyle, and sort controls; profile details; likes and passes.
- Separate demo likes, matches, conversations, and notifications, with local-only actions.
- Session-only settings, visibility controls, block/unblock, and report flows.
- Safety guidance, FAQs, and About, Contact, Terms, Privacy, and Community prototype notices.
- Responsive navigation and layouts for public and prototype screens.

This is a frontend prototype, not an operating service. There is no real account system, backend, matching, messaging, verification, moderation, or persistent profile data. Form and interaction state remains in page memory; passwords are cleared and are never saved or sent. All sample profiles are fictional. Do not enter real personal information. Compatibility descriptions are illustrative and are not validated recommendations or guarantees.

## Run locally

No package installation is required. From the repository directory, start a static server:

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Version 0.2.0 development approach

Version 0.2.0 is scoped as a frontend prototype, not a production service. Its guided screens and simulated features use fictional data. Real authentication, server-backed profiles, persistent matching, and production messaging are explicitly deferred to later development.

The six v0.2.0 frontend milestones are complete. The original v0.1.0 landing/discovery experience remains available, and every implemented account, profile, matching, messaging, settings, and safety action is labelled as a local simulation. No backend or production account, matching, or messaging service is implemented.

## Version 0.3.0 development approach

The proposed Version 0.3.0 plan is recorded in [`docs/version-0.3.0.md`](docs/version-0.3.0.md). Its first milestone is an audit and architecture decision only; backend implementation must wait for the project owner's approval.

The local audit confirmed that the project remains a static HTML/CSS/JavaScript application. The repository has no package manifest or lockfile, backend directory, database schema/migrations, automated test suite, or API integration. Registration, sign-in, profile setup, discovery, likes, matches, messages, settings, and reports are still client-side demonstrations. The current frontend can be retained and connected gradually; no framework rewrite is needed.

The [proposed architecture decision](docs/architecture-decision-v0.3.0.md) favors managed authentication and recommends Node.js/Express, PostgreSQL, and Prisma for owner review. No authentication provider has been selected: current provider pricing, data-processing terms, regional availability, and staging cost need owner review. No backend, database, real authentication, deployment, or dependency changes have been started.

## Progress record

### 2026-11-16 — Version 0.2.0 kickoff

- Archived the v0.1.0 project overview and preserved the original application code unchanged.
- Added the supplied v0.2.0 development requirements to the repository.
- Reviewed the existing implementation against the v0.2.0 requirements.
- Recorded the review and proposed Milestone 1 approach below.
- Received approval to begin Milestone 1 implementation.
- Added responsive site/prototype navigation and explicit placeholders for future screens; the v0.1.0 discovery filters and demo actions remain available.
- Verified all navigation destinations, the existing discovery interactions, and layouts at 320px, 375px, 390px, 430px, 768px, 1366px, and 1440px.

### 2026-11-16 — Version 0.2.0 frontend prototype

- Completed the account, six-step onboarding, profile preview/edit, discovery, likes, matches, conversation, notification, settings, and safety/report screens with fictional data and session-only state.
- Added password length, confirmation, email, optional phone, terms acceptance, required-field, and budget-range validation. Passwords are cleared after validation and are not sent or persisted.
- Expanded lifestyle questions to cover daily routine, home environment, food and kitchen, chores, and household preferences; profile review preserves answers when navigating backward.
- Added discovery filters, clear-all, move-in sorting, profile details, and the landing-page action for people who have a room to share.
- Updated this README to distinguish the completed frontend prototype from future backend work; `docs/version-0.1.0.md` remains the archived v0.1.0 overview.
- Exercised sign-up and onboarding in the browser, including invalid password and budget cases, back-navigation retention, profile completion, and checks that no password fields or local-storage data remain after registration.
- Verified the prototype flows and no horizontal overflow at 320px, 375px, 390px, 430px, 768px, 1366px, and 1440px; browser checks found no page-level errors. All interactions remain local demonstrations and are not delivered to other users or services.

### 2026-11-18 — Version 0.3.0 audit

- Added the supplied Version 0.3.0 development plan to `docs/version-0.3.0.md`.
- Rechecked all 23 public and prototype routes; they loaded without page-level browser errors.
- Rechecked sign-up validation and password clearing, the six-step profile journey, profile-edit prefill, discovery filters, likes, match removal, simulated messaging, notifications, settings, block/unblock, and sign-out.
- Confirmed the repository has no backend, package manifest, database, migrations, or automated test suite; the current interactions remain frontend-only.
- Milestone 0 audit is complete. Architecture/provider decisions and owner approval are required before Milestone 1 implementation.
- Prepared a proposed architecture decision comparing managed authentication with custom authentication, mapping onboarding fields, and listing the proposed Milestone 1 files. No provider or backend implementation has been approved.

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
