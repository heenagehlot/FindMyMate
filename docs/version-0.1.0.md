# FindMyMate

**Find yourself roommates.**

FindMyMate is an India-first, web-first roommate discovery concept. It helps people moving to a new city find potential roommates based on practical living preferences—not just rent and location.

## Project status

This repository contains the first frontend concept: a responsive landing page and an interactive discovery demo populated with fictional profiles. It is not a production roommate-matching service.

The demo has no account system, backend, messaging, verification, or real profile data. Like/pass choices exist only in the current page session. Do not enter personal information.

## Run locally

No package installation is required. From this directory, start a local static server:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## What's included

- Responsive product landing page
- Fictional roommate cards with transparent lifestyle compatibility highlights
- City and preference filters
- Session-only like/pass interactions
- Privacy and safety principles for the planned product

## Product direction

The initial product is intended to help room seekers and room sharers:

1. Create a profile and describe their accommodation needs.
2. Share relevant routines and shared-living preferences.
3. Discover profiles by city, budget, move-in timing, and lifestyle.
4. Express interest and connect after mutual interest.
5. Pause or close a search, and block or report concerning behaviour.

Exact addresses and private contact details must never appear on public profiles. Compatibility explanations should be understandable and must not be presented as a guarantee.

## Planned next steps

- Validate the first-launch cities and onboarding needs with prospective users.
- Finalise privacy, retention, safety, and moderation requirements.
- Choose an authentication, API, database, and private media-storage approach.
- Build real profiles, mutual matching, messaging, and report handling only after the backend and access controls are designed.
- Conduct India-specific legal and security reviews before any public launch.

## Development notes

- The current demo is plain HTML, CSS, and JavaScript with no third-party runtime dependencies.
- Keep secrets out of source control. `.env.example` contains placeholders only.
- Do not add real user profiles, identity documents, home addresses, or private uploads to the repository.

## Disclaimer

FindMyMate is an early product concept. Compatibility is subjective; this demo's sample indicators are illustrative only and are not a validated matching score or a guarantee of a successful living arrangement. This README is not legal advice or a declaration of regulatory compliance.
