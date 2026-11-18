# Version 0.3.0 Architecture Decision

**Status:** Milestone 1 direction approved and implemented locally; authentication-provider selection remains open
**Date:** 2026-11-18
**Scope:** Authentication and backend direction for Version 0.3.0

## Context

Version 0.2.0 is a static HTML, CSS, and JavaScript prototype. It has no API, database, package manifest, authentication service, or automated test suite. Version 0.3.0 needs persistent profiles and server-enforced authorization while preserving the existing frontend.

The project owner approved a managed-auth direction, Node.js/Express/PostgreSQL/Prisma, an India-only data storage/processing requirement, and the local Milestone 1 skeleton. This record compares managed authentication with custom authentication and identifies provider and data-location decisions that remain open.

## Proposed direction

- Prefer a managed identity provider over writing password and session handling from scratch.
- Keep the existing browser frontend and connect it incrementally to a separately hosted API.
- Use Node.js LTS and Express for the API, PostgreSQL for relational data, and Prisma for schema and migrations as the approved backend direction.
- Keep the authentication provider unselected until data-processing terms, regional availability, pricing, and integration are confirmed.
- Use fictional test accounts only until the security, privacy, and legal review is complete.

## Milestone 1 dependency choices

- Express provides the REST application and routing layer.
- Zod validates environment configuration.
- Helmet adds standard security response headers.
- `cors` applies the explicit browser-origin allow-list.
- `express-rate-limit` provides a local in-memory request limit.
- Node's built-in `--env-file-if-exists` and test runner are used instead of adding dotenv, Vitest, or Supertest dependencies.

Runtime dependencies are pinned in `server/package.json` and `server/package-lock.json`. The in-memory rate limiter is suitable only for this single-process local skeleton; a deployed multi-instance service needs a reviewed shared store and proxy configuration.

## Authentication options reviewed

| Option | Benefits | Trade-offs and open checks |
|---|---|---|
| **Managed identity provider (preferred direction)** | Avoids implementing password storage and account recovery directly. Firebase documents email/password and federated sign-in, and supports verifying client ID tokens in a custom backend. Clerk offers a managed user/authentication service. | Vendor dependency; provider-specific session/token verification is still required. Confirm current price, export/deletion process, DPA, support, and data-processing locations before selecting a vendor. |
| **Custom authentication** | Maximum control over identity data and hosting choices. | Adds substantial security responsibility: password hashing, verification, reset, session rotation/revocation, CSRF, rate limits, abuse handling, and ongoing security review. Not recommended for this milestone without a separately designed and reviewed implementation. |

### Provider notes

- **Firebase Authentication:** Firebase documentation describes SDK-managed password and federated sign-in. Its pricing page currently lists a no-cost allowance for eligible authentication usage, while phone authentication is billed per SMS. Firebase's location guidance says there is no single project-wide location setting; locations are configured per supported product/resource, and some products do not offer selection. Firebase terms state that Google may process and store customer data in locations it operates unless a data-location selection is offered and selected. Confirm the specific authentication data locations and applicable terms before using real user data.
- **Clerk:** Its pricing page currently describes a free allowance of 50,000 monthly retained users. That is not directly comparable to Firebase's MAU measure. Regional residency and contract terms were not established in this review and must be checked before selection.

These are time-sensitive summaries, not a price quote, legal conclusion, or assurance of Indian data residency. Recheck provider terms and pricing before implementation and deployment.

## Security and privacy constraints

- Treat India-only storage and processing as a hard provider-selection requirement. The reviewed Firebase terms do not by themselves establish that guarantee; Clerk's regional terms remain unverified.
- The API must verify provider-issued credentials on every authenticated request; a browser-supplied user ID is not proof of identity.
- Store provider identity references in the application database, not passwords or provider secrets.
- Keep service credentials on the server and out of the frontend bundle, Git, and user prompts.
- Do not put access tokens, session secrets, or private profile data in `localStorage`.
- Do not accept real personal data in development or staging until the owner has reviewed the provider's data processing terms and region choices.
- Database and API authorization, privacy-safe public profile responses, rate limits, input validation, and automated security tests remain required.

## Data-model mapping to the existing onboarding

The current form field names can be mapped without discarding answers:

- **Profile:** `displayName`, `ageRange`, `occupation`, `introduction`, `roomIntent`, `destinationCity`, `preferredAreas`.
- **Relocation:** `currentCity`, `destinationCity`, `moveReason`, `moveInDate`, `moveInFlexible`, `stayDuration`, `workLocation`, `commute`.
- **Accommodation:** `accommodationType`, `minBudget`, `maxBudget`, `roommates`, `furnishing`, `facilities`, `roomDescription`.
- **Lifestyle:** `wake`, `sleep`, `schedule`, `weekendRoutine`, `noise`, `guests`, `quietHours`, `musicTv`, `workFromHome`, `food`, `cooking`, `kitchenSharing`, `foodSharing`, `cleanliness`, `cleaningFrequency`, `chores`, `choresDetails`, `pets`, `smoking`, `hobbies`, `exercise`, `socialHome`, `communication`, `boundaries`.
- **Illustration only:** `avatarColor` is a demo placeholder and is not an uploaded photo.
- **Account-only/private:** registration `email` and optional `phone` belong in private account/auth storage and must never be returned by public discovery. Password fields are never persisted by the prototype.

The API schema should distinguish optional and multi-select values, store budgets as INR numeric values, and exclude `currentCity`, private contact fields, and any exact address from public discovery unless an explicit product decision later approves otherwise.

## Milestone 1 files delivered

Subject to owner approval of the backend direction:

- `server/package.json` and the generated package lockfile.
- `server/src/config/env.js` for validated environment configuration.
- `server/src/app.js` and `server/src/server.js` for app construction and startup.
- `server/src/routes/health.js` for the health endpoint.
- `server/src/middleware/error-handler.js`, `server/src/middleware/not-found.js`, and `server/src/middleware/request-logger.js`.
- `server/tests/env.test.js` and `server/tests/health.test.js` for configuration, CORS, security-header, error, and request-size checks.
- `server/package-lock.json` for reproducible dependency installation.
- `.env.example` for non-secret variable names and placeholders.
- `README.md` for local server setup and environment instructions.

The health endpoint verifies API liveness only; it does not check a database. Milestone 1 did not include real authentication, database migrations, production credentials, staging services, or deployment. The existing frontend files remain unchanged.

## Remaining owner decisions

1. Select an authentication provider only after verifying India-only storage/processing, current terms, pricing, and integration behavior.
2. Confirm the currency for the stated staging budget of `3000` (currency was not specified); no paid service has been provisioned.
3. Approve the provider, database hosting region, and staging deployment as separate future decisions.

## Sources checked

- [Firebase Authentication documentation](https://firebase.google.com/docs/auth)
- [Firebase pricing](https://firebase.google.com/pricing)
- [Google Identity Platform pricing](https://cloud.google.com/identity-platform/pricing)
- [Firebase product locations](https://firebase.google.com/docs/projects/locations)
- [Firebase terms](https://firebase.google.com/terms/)
- [Firebase ID-token verification for custom backends](https://firebase.google.com/docs/auth/admin/verify-id-tokens)
- [Clerk pricing](https://clerk.com/pricing)
