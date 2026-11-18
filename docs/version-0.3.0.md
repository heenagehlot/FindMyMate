# FindMyMate — Version 0.3.0 Development Plan

**Document type:** Product, architecture and implementation specification
**Repository:** https://github.com/heenagehlot/FindMyMate
**Baseline reviewed:** Public `main` branch, 18 November 2026
**Previous release:** 0.2.0 — multi-screen frontend prototype
**Target release:** 0.3.0 — first persistent backend-connected application foundation
**Status:** Proposed plan — local audit completed; implementation has not started

---

## 1. Executive decision

Version 0.3.0 should turn the existing FindMyMate frontend prototype into the first application that can create real accounts, save real user profiles, retrieve real profiles from a database, and record genuine likes and mutual matches.

It should **not** attempt to deliver every feature of the eventual platform.

The recommended 0.3.0 outcome is:

> A registered user can securely sign up and sign in, complete and edit a persistent roommate profile, discover other eligible profiles using server-side filters, express interest, and receive a real mutual match when interest is mutual.

The existing HTML/CSS/JavaScript interface should be preserved and connected incrementally. Do not replace the whole frontend or migrate to a frontend framework merely because a coding agent suggests it.

Version 0.3.0 is a development/staging milestone. It is not permission to invite the public to submit sensitive personal information. A security, privacy, operational and legal readiness review is still required before a public launch.

## 2. Repository review — current public baseline

### 2.1 Files and structure inspected

The public `main` branch contains or references the following relevant files:

- `index.html` — existing public landing/discovery markup and application shell.
- `styles.css` — existing visual system and responsive styling.
- `app.js` — root JavaScript entry point that imports `./js/app.js`.
- `js/app.js` — frontend controller, route handling, in-memory state, form handling and interactions.
- `js/data.js` — fictional profile, match, conversation and notification data.
- `js/screens.js` — screen templates and rendering helpers.
- `README.md` — project status and version record.
- `docs/version-0.1.0.md` — archived baseline overview.
- `docs/version-0.2.0.md` — completed frontend prototype specification.
- `.gitignore`, `.env.example`, and `LICENSE`.

The existing application is plain HTML, CSS and browser JavaScript using ES modules. The visible frontend entry point imports the JavaScript controller; the controller imports demo data and screen-rendering modules.

### 2.2 Version 0.1.0 — preserved foundation

The original experience includes:

- Responsive landing page.
- Fictional roommate cards.
- City and maximum-budget filters.
- Like/pass interactions.
- Illustrative compatibility highlights.

### 2.3 Version 0.2.0 — current frontend prototype

The README and version specification document these completed prototype areas:

- Public landing page and product explanation.
- Sign-up and sign-in demonstration screens.
- Six-step onboarding.
- Relocation preferences.
- Accommodation preferences for room seekers and room sharers.
- Lifestyle questionnaire.
- Profile preview and edit flow.
- Discovery, filters, sorting and profile detail.
- Likes and fictional matches.
- Simulated conversations and messages.
- Notifications.
- Settings and visibility controls.
- Block/unblock and report demonstrations.
- Safety information and prototype notices.
- Responsive layouts and form validation.

### 2.4 Important implementation observations

The publicly visible JavaScript confirms:

- The app uses in-memory application state for the current session.
- The state includes a demo user, profile, onboarding answers, likes, passed profiles, blocked profiles, messages, reports, notifications and visibility preferences.
- Demo profiles, matches, conversations and notifications are stored in JavaScript modules, not retrieved from a server.
- The sign-up handler validates the form, clears password fields, creates only a local demo user state and explicitly tells the user that no account was created and no details were sent or saved.
- The sign-in handler explicitly says authentication is not connected.
- Likes, passes, blocks, messages and reports are local demonstrations.
- A search of the public frontend controller found no `localStorage` use.
- Screen templates use `innerHTML`; the current code includes an `escapeHtml` helper and uses it for many dynamic profile and form values. This must be reviewed carefully before introducing user-generated content.
- The demo data module contains a small set of fictional profiles, fictional mutual matches and sample conversations.
- The frontend has been split into controller, data and screen modules, which is a useful starting point for gradual API integration.

### 2.5 What is not present in the public baseline

No working implementation is currently documented or visible for:

- Real account registration or authentication.
- A backend API.
- A database or database migrations.
- Persistent user profiles.
- Server-side discovery.
- Persistent likes or mutual-match records.
- Server-side authorization and ownership checks.
- Real-time messaging.
- Real notifications.
- Real image upload/storage.
- Production identity verification.
- A real moderation queue.
- Production account deletion and data-retention jobs.
- A verified production deployment pipeline.

The README explicitly describes the product as a frontend prototype and says not to enter personal information.

### 2.6 Audit limitation

This is a review of the publicly accessible repository files and its own development records. It is not a complete local execution, browser automation, dependency audit, penetration test or independent security assessment. The 0.2.0 completion record reports manual browser checks, but those checks have not been independently repeated as part of this document.

Before implementation, Copilot must inspect the complete local working tree and current Git status. If local files differ from the public `main` branch, the local code is the implementation baseline and the difference must be documented.

---

## 3. Version 0.3.0 goals

### Must be delivered

1. Preserve the current frontend and its visual design.
2. Establish a maintainable backend project.
3. Select and configure a relational database.
4. Create and apply versioned database migrations.
5. Implement real registration, sign-in, sign-out and session handling.
6. Persist a user's profile and onboarding answers.
7. Allow a signed-in user to retrieve and update only their own private profile data.
8. Retrieve eligible public discovery profiles from the backend.
9. Apply discovery filters on the server, not only in browser JavaScript.
10. Persist likes.
11. Create a match only when two eligible users have liked one another.
12. Prevent blocked users from discovering or interacting with one another.
13. Add automated tests for the important security and product rules.
14. Provide a repeatable local development setup and a staging deployment.
15. Update documentation so every real and simulated feature is clearly distinguished.

### Explicitly not a goal

Version 0.3.0 is not a full public launch. It does not need every future product feature.

---

## 4. Recommended technical direction

These are recommendations for the architecture review, not instructions to install everything immediately.

### 4.1 Frontend

- Keep the existing HTML, CSS and JavaScript.
- Keep the current design and screen structure.
- Introduce a small, central API client module.
- Replace one demo data flow at a time with API calls.
- Keep demo fixtures separate from production API data.
- Do not store passwords, session secrets or private profile data in `localStorage`.
- Do not expose backend secrets in browser JavaScript.

A framework migration is not required for this version.

### 4.2 Backend recommendation

Recommended default:

- Node.js LTS.
- Express for REST API routing.
- PostgreSQL for relational data.
- Prisma ORM for schema management and migrations.
- Zod or an equivalent schema validator for request validation.
- Vitest or Jest for unit/integration tests.
- Supertest for HTTP API tests.

Why this direction:

- The current frontend already uses JavaScript.
- A relational database suits users, profiles, preferences, likes, matches and blocks.
- Express is a straightforward API layer.
- Prisma provides explicit schema and migration history.
- The project can later add messaging, moderation and analytics without replacing its core data model.

### 4.3 Authentication decision — do not improvise cryptography

Before implementation, Copilot must compare a managed authentication provider with a custom authentication implementation and present a short Architecture Decision Record (ADR).

Preferred approach for a beginner-led project: use a reputable managed identity/authentication provider if its current pricing, regional availability, data-processing terms and integration fit the product.

If custom authentication is selected, it must be designed and reviewed before coding. It must include secure password hashing using a current password-hashing algorithm, secure session handling, session rotation, rate limiting, email verification strategy, CSRF protection where cookie-based sessions require it, secure cookies, logout/session revocation, and password reset controls. Never invent a home-grown password encryption scheme.

Do not store raw passwords or reversible password values. Do not store authentication tokens in `localStorage`.

### 4.4 Hosting and environments

Use separate environments:

- Local development.
- Staging/test deployment.
- Production (not part of the initial 0.3.0 release).

Use environment variables and separate credentials for each environment. No real production credentials should be committed to GitHub or pasted into Copilot prompts.

The first deployment target should be staging only. Choose a hosting/database provider after the architecture decision and cost review. Do not make a provider choice based only on a coding agent's preference.

---

## 5. Proposed application architecture

```text
Browser
  |
  | Existing HTML / CSS / JavaScript
  | API client module
  v
REST API (Node.js + Express)
  |
  | Authentication verification
  | Request validation
  | Authorization / ownership checks
  | Business rules
  v
PostgreSQL database
  |
  +-- users / authentication identity reference
  +-- profiles
  +-- relocation_preferences
  +-- accommodation_preferences
  +-- lifestyle_preferences
  +-- likes
  +-- matches
  +-- blocks
  +-- reports (minimal initial record, if enabled)
```

The browser must never connect using a database administrator credential. The API must enforce authorization on every private operation. Hiding a button in the frontend is not access control.

---

## 6. Proposed data model

Copilot must first map the existing onboarding field names to this model and report any mismatch. Do not silently discard answers.

### 6.1 User

Suggested fields:

- `id` — UUID primary key.
- `auth_provider_id` or equivalent identity reference.
- `email` — private, unique where appropriate.
- `account_status` — pending, active, suspended, deletion_pending, deleted.
- `email_verified_at` — nullable timestamp.
- `created_at`, `updated_at`.

Avoid duplicating password hashes if a managed identity provider owns authentication.

### 6.2 Profile

Suggested fields:

- `id` — UUID primary key.
- `user_id` — unique foreign key to User.
- `display_name`.
- `age_range` or a privacy-minimised age field; do not expose full date of birth.
- `occupation_or_study_status`.
- `introduction`.
- `room_intent` — needs_room or has_room.
- `destination_city`.
- `preferred_areas` — structured values.
- `profile_visibility` — visible or paused.
- `search_status`.
- `onboarding_completed_at`.
- `created_at`, `updated_at`.

### 6.3 Relocation preferences

Suggested fields:

- `profile_id`.
- `current_city`.
- `destination_city`.
- `move_reason`.
- `move_in_date` or flexible indicator.
- `stay_duration`.
- Optional broad work/study area.
- Optional commute preference.

Do not collect exact residential addresses.

### 6.4 Accommodation preferences

Suggested fields:

- `profile_id`.
- `accommodation_type`.
- `minimum_budget`.
- `maximum_budget`.
- `preferred_areas`.
- `roommates_or_spaces_count`.
- `furnishing_preference`.
- `facilities` as structured values.
- Optional description.

Store budget in a consistent numeric currency representation. Version 0.3.0 is India-first, so define INR as the initial currency and store currency explicitly if future expansion is anticipated.

### 6.5 Lifestyle preferences

Use structured fields or a carefully validated JSON column for grouped answers:

- Daily routine.
- Sleep/wake schedule.
- Noise and quiet hours.
- Guests and gatherings.
- Food and cooking.
- Cleanliness and chores.
- Pets and hobbies.
- Shared-space expectations.
- Communication and boundaries.

Avoid collecting sensitive information that is not necessary to roommate discovery. Allow optional answers and “prefer not to say” where relevant.

### 6.6 Like

Suggested fields:

- `id`.
- `actor_user_id`.
- `target_user_id`.
- `created_at`.

Rules:

- A user cannot like themselves.
- A user cannot create duplicate active likes for the same target.
- A blocked relationship prevents likes.
- Removing a like must have a defined effect on any existing match.
- Add database uniqueness constraints, not only frontend checks.

### 6.7 Match

Suggested fields:

- `id`.
- `user_a_id`.
- `user_b_id` in a canonical order.
- `status` — active, unmatched, blocked, closed.
- `created_at`.
- `ended_at`.

Rules:

- A match is created only when both users have active likes for each other.
- There must be at most one active match for a user pair.
- Match creation must be transaction-safe to prevent duplicate matches during simultaneous likes.
- A user may only view their own matches.
- Unmatch must update server state and must not be a purely visual action.

### 6.8 Block

Suggested fields:

- `id`.
- `blocker_user_id`.
- `blocked_user_id`.
- `created_at`.

Rules:

- No self-block.
- No duplicate active block.
- Blocked profiles must not appear in discovery for either party.
- Block must prevent new likes and matches.
- Existing match state must be handled consistently.
- Do not reveal private information to the blocked person.

### 6.9 Reports

If report persistence is included in 0.3.0, keep the initial scope minimal:

- `id`.
- `reporter_user_id`.
- `reported_user_id`.
- `reason_code`.
- `description` with strict length limits and safe handling.
- `status` — pending, reviewed, actioned, dismissed.
- `created_at`.

A report submission must not automatically and permanently ban another user. Automated signals can flag urgency, but human review and a documented escalation policy are needed.

---

## 7. API scope

Use a versioned prefix such as `/api/v1`. The exact endpoint names may be adjusted in the ADR, but the behaviour must remain.

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

If managed authentication is selected, use its supported flow rather than creating duplicate password endpoints.

### Own profile

- `GET /api/v1/profile/me`
- `PUT /api/v1/profile/me`
- `PATCH /api/v1/profile/me/visibility`

### Discovery

- `GET /api/v1/discovery`

Support validated filters for:

- Destination city.
- Budget range.
- Move-in timing.
- Accommodation type.
- Broad lifestyle preferences.
- Pagination and sorting.

The server must exclude the signed-in user's own profile, paused/ineligible profiles, blocked relationships, and profiles that should not be discoverable.

### Likes and matches

- `POST /api/v1/users/:userId/like`
- `DELETE /api/v1/users/:userId/like`
- `GET /api/v1/likes`
- `GET /api/v1/matches`
- `POST /api/v1/matches/:matchId/unmatch`

All operations must check identity, permissions, blocks and valid state transitions on the server.

### Blocks and reports

- `POST /api/v1/users/:userId/block`
- `DELETE /api/v1/users/:userId/block`
- `GET /api/v1/blocks`
- `POST /api/v1/reports`

Only implement report persistence if the API and review-handling implications are clearly documented. A local-only report form must not be presented as a real moderation channel.

### API behaviour

- Use consistent JSON response shapes.
- Use correct HTTP status codes.
- Validate all inputs server-side.
- Return useful but non-sensitive error messages.
- Never return password hashes, session secrets, private contact details or internal moderation notes.
- Add pagination limits and request-size limits.
- Avoid exposing whether an email address belongs to a registered user where that would enable account enumeration.

---

## 8. Security and privacy requirements

These requirements are release blockers, not optional polish.

1. Authentication must use a reviewed provider or a reviewed implementation.
2. Authorization must be checked server-side for every private resource.
3. Users must not be able to edit another user's profile by changing an ID in a request.
4. Passwords must never be stored in plaintext or reversible form.
5. Secrets must remain outside Git and browser bundles.
6. Apply rate limits to authentication and sensitive endpoints.
7. Validate and constrain every incoming field.
8. Use parameterised database access through the ORM.
9. Configure CORS narrowly for known frontend origins.
10. Use HTTPS in staging and production.
11. Use secure cookie settings if cookie sessions are used.
12. Add CSRF protection where required by the selected session design.
13. Prevent exact addresses, phone numbers and email addresses from appearing in public discovery responses.
14. Use safe output encoding for user-generated text. Do not trust client-provided HTML.
15. Do not store passwords, tokens or private data in browser local storage.
16. Add a documented account deletion workflow that removes or anonymises data according to the approved retention policy.
17. Avoid collecting Aadhaar or other identity documents in this version.
18. Add audit-friendly logs without logging passwords, tokens, message contents or unnecessary personal data.
19. Keep database backups and test restoration before production use.
20. Conduct an independent security review before public users are invited.

The privacy policy and terms must be reviewed for the actual data collected, service providers, retention, user rights and applicable Indian requirements. A generated template is not legal approval.

---

## 9. Frontend integration strategy

Do not replace the current screens all at once.

Create a small API layer, for example:

```text
js/
  api/
    client.js
    auth-api.js
    profile-api.js
    discovery-api.js
    likes-api.js
  data/
    demo-data.js
  app.js
  screens.js
```

This is illustrative. Copilot must inspect the current structure and propose exact file changes before moving anything.

Integration sequence:

1. Keep the public landing page working.
2. Connect sign-up and sign-in to the real authentication flow.
3. Connect onboarding completion to profile creation.
4. Connect profile preview/edit to the authenticated profile API.
5. Connect discovery to server data.
6. Connect likes and matches to persistent APIs.
7. Keep messages, notifications, image upload, verification and advanced safety workflows explicitly labelled as demo/deferred until implemented.

Every API-backed screen must support loading, empty, success and error states. If the API is unavailable, do not silently fall back to fictional data while presenting it as real.

---

## 10. Milestone plan

Each milestone must be completed, tested, documented and approved before the next begins.

### Milestone 0 — Local repository audit and architecture decisions

**Goal:** establish the exact current local baseline and avoid unsafe rewrites.

Tasks:
- Inspect Git status, current branch and recent commits.
- Inspect every tracked file and dependency.
- Run the existing application.
- Verify all Version 0.2.0 routes and interactions.
- Identify any mismatch between README claims and actual behaviour.
- Confirm the API/backend/database/authentication architecture.
- Produce an ADR and proposed file tree.
- Create a rollback point/tag or branch before structural work.

Acceptance:
- Existing frontend runs.
- No uncommitted user work is overwritten.
- Architecture and data model are reviewed.
- No code is changed before approval.

### Milestone 1 — Backend skeleton and environment configuration

**Goal:** create a clean backend that can start and respond safely.

Tasks:
- Create a separate backend directory, recommended `server/`.
- Add package scripts and pinned dependencies.
- Add environment-variable validation.
- Add health endpoint, error middleware and request logging.
- Configure CORS, security headers and request limits.
- Add `.env.example` placeholders and verify `.env` is ignored.
- Add a local development command.
- Do not add production secrets.

Acceptance:
- Backend starts locally.
- Health endpoint returns expected status.
- Invalid/missing environment variables fail with a clear safe message.
- No secrets are committed.
- Existing frontend still works independently.

### Milestone 2 — Database schema and migrations

**Goal:** establish persistent data safely.

Tasks:
- Configure PostgreSQL.
- Add ORM schema and initial migration.
- Implement users/identity reference, profile, relocation, accommodation, lifestyle, likes, matches and blocks.
- Add foreign keys, indexes, uniqueness constraints and timestamps.
- Add development-only fictional seed data.
- Document migration and reset commands.
- Never seed real personal data.

Acceptance:
- Migrations apply to a clean local database.
- Schema constraints prevent duplicate likes and invalid self-relations.
- Seed data is clearly fictional.
- A reset/rebuild can be repeated without manual database editing.

### Milestone 3 — Authentication and account lifecycle

**Goal:** make account access real.

Tasks:
- Implement the approved authentication-provider flow.
- Register, sign in, sign out and retrieve current identity.
- Implement email verification strategy.
- Implement session expiry and revocation.
- Add rate limits and generic safe authentication errors.
- Ensure private routes reject unauthenticated requests.
- Add tests for invalid credentials, duplicate registration, expired sessions and unauthorized access.

Acceptance:
- A test user can register and sign in.
- Passwords are never stored or returned by the application.
- A logged-out user cannot access private APIs.
- One user's session cannot access another user's private resources.

### Milestone 4 — Persistent profile and onboarding

**Goal:** save the actual profile created by onboarding.

Tasks:
- Map all current onboarding fields to the database schema.
- Save profile, relocation, accommodation and lifestyle answers.
- Retrieve the signed-in user's profile.
- Update profile fields.
- Add server-side validation and sensible field limits.
- Implement profile visibility and search status.
- Ensure private account fields are never part of public profile responses.

Acceptance:
- User A completes onboarding and the data persists after refresh and a new login.
- User A can edit their own profile.
- User A cannot read or edit User B's private data.
- Public profile output contains only approved discovery fields.

### Milestone 5 — Real discovery and server-side filtering

**Goal:** replace fictional discovery data with database-backed profiles.

Tasks:
- Fetch profiles from the API.
- Implement pagination and validated filters.
- Exclude own, paused, incomplete or otherwise ineligible profiles.
- Exclude blocked relationships.
- Preserve the current card and detail design.
- Add loading, empty, error and retry states.
- Provide clear messaging when no real profiles are available.

Acceptance:
- Two or more test accounts can discover each other when eligible.
- Filters are applied by the server.
- Changing browser parameters cannot reveal private fields.
- Empty database results are shown honestly; demo profiles are not mixed into real results.

### Milestone 6 — Persistent likes and mutual matches

**Goal:** implement the first genuine connection mechanic.

Tasks:
- Persist like and unlike actions.
- Prevent self-likes and duplicate likes.
- Create a match only when likes exist in both directions.
- Use a database transaction or equivalent concurrency-safe operation.
- Show the current user's likes and matches.
- Implement unmatch.
- Define and test what happens when either user blocks the other.

Acceptance:
- User A liking User B alone does not create a match.
- User B liking User A creates exactly one match.
- Repeated or simultaneous requests do not create duplicate matches.
- Unmatch and block behaviour is consistent on the server.

### Milestone 7 — Integration, test hardening and staging

**Goal:** verify the connected application end to end.

Tasks:
- Run frontend and backend together.
- Add automated API and integration tests.
- Test authorization boundaries and privacy output.
- Test validation, empty states and network failures.
- Add staging environment configuration.
- Deploy to staging only.
- Add database backup/restore notes.
- Update README and release notes.
- Prepare a list of remaining production blockers.

Acceptance:
- A clean setup can be reproduced from documentation.
- Critical user journeys pass automated and manual tests.
- Staging uses separate credentials and database.
- No production launch claims are made.
- Security/privacy review is scheduled before public launch.

---

## 11. Features explicitly deferred beyond 0.3.0

These should not be squeezed into this release:

- Real-time messaging and message delivery.
- Push/email notifications.
- Secure user photo upload and media moderation.
- Identity/KYC verification.
- Advanced matching score or AI-based recommendations.
- Group matching for multiple roommates.
- Property listings, owner/landlord tools and payments.
- Admin moderation dashboard and automated moderation workflows.
- Analytics and relocation market insights.
- Native iOS and Android apps.
- Public production launch.

These can be assessed for Version 0.4.0 and later after the core account/profile/discovery/matching foundation is stable.

---

## 12. Testing requirements

Minimum automated coverage for 0.3.0:

### Authentication
- Registration success.
- Duplicate account rejection.
- Invalid input rejection.
- Login success/failure.
- Logout and session revocation.
- Unauthenticated access rejection.

### Authorization and privacy
- User A cannot retrieve User B's private profile.
- User A cannot update User B's profile.
- Public discovery never returns email, phone, exact address, auth IDs or private fields.
- Blocked users are excluded as specified.
- Paused profiles are not discoverable.

### Profiles
- Valid onboarding persists.
- Invalid budgets are rejected.
- Maximum budget cannot be lower than minimum budget.
- Optional answers can be omitted.
- Profile edits persist.

### Likes and matches
- Self-like rejected.
- Duplicate like handled safely.
- One-way like does not create a match.
- Reciprocal likes create one match.
- Concurrent reciprocal likes do not create duplicates.
- Unmatch works.
- Block prevents future interactions.

### Operations
- Database migration works from a clean state.
- Backend health endpoint works.
- Error responses do not expose stack traces or secrets.
- Staging environment does not use development credentials.

---

## 13. Definition of done for Version 0.3.0

Version 0.3.0 can be marked complete only when:

- [ ] The existing frontend is preserved and still works.
- [ ] Backend project and API structure are documented.
- [ ] Database schema and migrations are committed.
- [ ] Authentication is real and reviewed.
- [ ] Profile onboarding and editing persist in the database.
- [ ] Discovery reads real profiles from the backend.
- [ ] Server-side filters and authorization are tested.
- [ ] Likes persist.
- [ ] Mutual matches are created correctly and exactly once.
- [ ] Blocks are enforced server-side.
- [ ] Private fields are excluded from public API responses.
- [ ] Automated tests cover critical paths.
- [ ] Staging deployment is documented and verified.
- [ ] README accurately identifies implemented and deferred features.
- [ ] No unresolved critical security issue is known.
- [ ] Public launch remains blocked pending independent security, privacy and legal review.

---

## 14. Copilot working agreement

Copilot is the implementation assistant. It must not independently expand the release scope or make unreviewed architecture/security decisions.

For every milestone it must:

1. Read `README.md`, `docs/version-0.1.0.md`, `docs/version-0.2.0.md` and this document.
2. Inspect the complete local repository before editing.
3. Report the exact current branch, Git status and relevant files.
4. Explain the proposed change in beginner-friendly language.
5. List every file it will create, modify, move or delete.
6. Explain new dependencies and why they are needed.
7. Identify security and privacy implications.
8. Implement only the approved milestone.
9. Run relevant tests and show the actual results.
10. Explain how the user can manually verify the feature.
11. Update documentation and progress only after the work is verified.
12. Stop and wait for approval before the next milestone.

Copilot must never:
- Replace the whole application without approval.
- Delete working screens to make implementation easier.
- invent successful test results.
- label simulated functionality as real.
- commit secrets or credentials.
- weaken authorization to make tests pass.
- use production data in local development.
- automatically deploy to production.
- add real-time chat, payments, KYC or other deferred features without a new approved specification.

---

## 15. First prompt to give GitHub Copilot

Paste this prompt into Copilot Chat in the local FindMyMate repository. This is an **audit-only prompt**. It must not edit files.

> We are beginning FindMyMate Version 0.3.0.
>
> Read these files completely:
> - README.md
> - docs/version-0.1.0.md
> - docs/version-0.2.0.md
> - docs/version-0.3.0.md
>
> Inspect the entire current local repository, including all frontend JavaScript modules, HTML, CSS, configuration, Git status, package files, tests and existing dependencies.
>
> Do not create, modify, move or delete any file. Do not install packages. Do not run database setup or deployment commands.
>
> Produce an audit report containing:
> 1. Current branch and Git working-tree status.
> 2. Complete file/folder tree.
> 3. What is genuinely implemented and how each major flow works.
> 4. What is still simulated or missing.
> 5. Existing bugs, risks, duplicate logic, unsafe rendering concerns and accessibility gaps.
> 6. Existing dependencies and whether any backend/database already exists locally.
> 7. Whether the current frontend can be preserved and connected incrementally.
> 8. Recommended backend/auth/database architecture, with alternatives and trade-offs.
> 9. Proposed database entities and relationships.
> 10. Exact proposed files for Milestone 1 only.
> 11. Tests and manual checks that will prove Milestone 1 works.
> 12. Any decisions that require the project owner's approval.
>
> Be precise. Distinguish facts found in code from assumptions. Do not claim a feature works merely because a screen exists. Do not start implementation. Wait for approval.

---

## 16. Release record

| Version | Scope | Status |
|---|---|---|
| 0.1.0 | Responsive landing and discovery concept | Completed baseline |
| 0.2.0 | Multi-screen frontend prototype | Documented complete |
| 0.3.0 | Backend, database, authentication, persistent profiles, discovery, likes and mutual matches | Planned |
| 0.4.0 | Messaging, notifications, media, moderation and advanced matching | Future assessment |
| 1.0.0 | Public MVP after operational, security, privacy and legal readiness | Future |

**Final principle:** Build the real foundation first. Do not rush to make every feature look operational. A smaller application with genuine authentication, persistent profiles, secure discovery and correct mutual matching is more valuable than a large application whose important interactions are still simulations.
