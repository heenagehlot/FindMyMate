# FindMyMate — Version 0.2.0 Development Requirements

**Document type:** Next-version product and development specification
**Current baseline:** Version 0.1.0 — frontend concept / discovery dashboard
**Target:** Version 0.2.0 — complete multi-screen frontend prototype
**Status:** Proposed
**Repository:** https://github.com/heenagehlot/FindMyMate

---

## 1. Purpose

Version 0.1.0 established the visual direction of FindMyMate. The public repository currently contains a responsive landing/discovery demo, fictional roommate profiles, city and budget filters, and session-only like/pass interactions. It does not yet contain real accounts, a backend, messaging, verification, or persistent user data.

Version 0.2.0 should turn the single-screen concept into a coherent, navigable product prototype. It should demonstrate the complete user journey: arrive, understand the product, create a demo profile, enter relocation and living preferences, discover people, express interest, view demo matches, explore messaging, and manage privacy and safety settings.

**This version is still a frontend prototype.** Do not pretend that authentication, messaging, matching, identity verification, or moderation is connected to a real server.

## 2. Version 0.2.0 objectives

By the end of this version, FindMyMate should have:

- Consistent navigation and reusable page layouts.
- Sign-up and sign-in screens with client-side validation.
- Guided multi-step onboarding.
- Relocation and accommodation preference forms.
- A structured lifestyle questionnaire.
- Profile preview and edit screens.
- Improved discovery, filters, and profile details.
- Separate Likes and Matches screens.
- A simulated conversation list and chat screen.
- Notifications, settings, privacy, safety, block, and report screens.
- Fictional demo data and safe local persistence for non-sensitive demo state.
- Responsive layouts, accessible controls, and useful empty/error states.

## 3. Product principles

1. Lifestyle compatibility matters alongside budget and location.
2. Privacy by default: never expose phone numbers, email addresses, identity documents, or exact home addresses on public profiles.
3. Users control whether their profile is visible, paused, or closed.
4. Simulated functionality must be labelled as demo functionality.
5. Design mobile-first, then refine for desktop.
6. Use accessible semantic HTML, labels, keyboard support, visible focus, and readable contrast.
7. Build one milestone at a time and test before moving on.

## 4. Existing baseline — preserve it

The current repository is a small static project containing `index.html`, `styles.css`, `app.js`, `.env.example`, `.gitignore`, `README.md`, and `LICENSE`.

The current JavaScript uses a small hard-coded collection of fictional profiles, city and budget filtering, and in-memory like/pass sets. Those choices reset on refresh.

Requirements:
- Preserve the working Version 0.1.0 baseline in Git history.
- Do not remove existing working functionality until an improved replacement is tested.
- Keep all sample profiles and contact details fictional.
- Avoid unnecessary framework migrations in this version.
- Keep the project runnable with clear instructions.
- Update README to explain which features are simulated.

## 5. Information architecture

### Public navigation
- Home
- How it works
- Safety
- Sign in
- Create account

### Signed-in prototype navigation
- Dashboard / Overview
- Discover
- Likes
- Matches
- Messages
- My Profile
- Settings

Navigation must work on desktop and mobile. The active destination must be clear. Every visible button/link must work or be explicitly labelled as unavailable in this prototype. Use a compact mobile menu or bottom navigation if appropriate.

## 6. Required screens and functionality

### 6.1 Landing page
Include brand name, product value proposition, primary actions (“Find a roommate” and “I have a room to share”), how it works, lifestyle compatibility benefits, safety/privacy summary, FAQs, and footer links for About, Contact, Safety, Terms, and Privacy.

Do not claim that users are verified, listings are live, or matches are real.

### 6.2 Sign-up
Fields: display name, email, optional phone number, password, confirm password, and required Terms/Privacy acceptance.

Validate required fields, email format, password confirmation, and terms acceptance. Show field-level errors. Do not store real passwords in browser storage. The prototype may use a clearly fictional demo-user state.

### 6.3 Sign-in
Include email, password, show/hide password, demo sign-in, and create-account link. Password recovery may be a clearly labelled placeholder because real account recovery requires a backend.

### 6.4 Multi-step onboarding
Create a progress-indicated flow. Users can move backwards without losing demo answers.

Suggested steps:
1. Basic profile.
2. Relocation details.
3. Accommodation requirements.
4. Lifestyle questionnaire.
5. Photo placeholder/demo selection.
6. Review and complete.

Clearly identify required/optional fields, explain why information is requested, and allow review before completion. Do not request real identity documents or sensitive data in this version.

### 6.5 Relocation details
Fields:
- Current city.
- Destination city.
- Preferred neighbourhoods.
- Reason for moving: study, work, internship, job search, personal, other.
- Move-in date or flexible.
- Expected stay: under 3 months, 3–6 months, 6–12 months, 12+ months, flexible.
- Work/study location (optional).
- Preferred commute range (optional).

Do not request a precise home address.

### 6.6 Accommodation preferences
Fields:
- Need a room / have a room to share.
- Accommodation type: flat, private room, shared room, PG/hostel, flexible.
- Monthly budget minimum and maximum.
- Preferred areas.
- Number of roommates needed / spaces available.
- Furnishing preference.
- Move-in date.
- Basic facilities.
- Optional description.

For room sharers, show a privacy notice: exact addresses are not displayed on public profiles. Use only city and broad area in the demo.

### 6.7 Lifestyle questionnaire
Organise the questions into sections:

**Daily routine:** wake-up time, sleep time, work/study schedule, weekday/weekend routine.

**Home environment:** noise level, quiet hours, music/TV, guests, gatherings, work/study from home.

**Food and kitchen:** food preference, cooking frequency, kitchen sharing, food sharing.

**Cleanliness and chores:** cleanliness expectations, cleaning frequency, willingness to share chores, dishes, kitchen, mopping, dusting, waste disposal, shared areas.

**Lifestyle and boundaries:** pets, hobbies, exercise, social/quiet home preference, communication expectations, personal boundaries, and household smoking preference where appropriate.

Provide “Prefer not to say” where appropriate. Avoid collecting unnecessary sensitive information. Allow answers to be edited later. Do not make unsupported character judgements based on answers.

### 6.8 Profile preview and edit
Show display name, age/age range according to the privacy design, profession/study status, destination city, broad preferred area, budget, move-in timing, stay duration, introduction, lifestyle highlights, room-seeker/room-sharer status, and demo photo.

Provide Edit actions. Never show email, phone, exact address, full date of birth, or private verification material.

### 6.9 Discover
Improve the existing discovery screen with:
- Profile cards.
- City, budget, move-in, accommodation-type, and lifestyle filters.
- Clear-all-filters.
- Sort options such as relevance and move-in date.
- Profile detail view.
- Like and Pass actions.
- Empty state and reset demo data action.

Cards show only discovery-appropriate information. Do not show contact details.

Compatibility should be explained through understandable highlights (similar sleep schedules, overlapping budgets, similar noise preferences, close move-in dates, shared chore expectations). Any numeric score must be labelled experimental and not validated or guaranteed.

### 6.10 Profile details
Show introduction, relocation details, accommodation needs/available-room summary, budget, move-in timing, lifestyle answers, compatibility highlights, Like, Pass, Report, and Block controls. Report/block are demo interactions only. No exact address or contact details.

### 6.11 Likes
Show profiles liked by the demo user, allow removal of interest and opening profile details, and provide an empty state linking to Discover. Explain that likes are local demo actions.

### 6.12 Matches
Create a separate screen using fictional demo mutual matches. Show profile summary, demo match date, Open Conversation, and Unmatch with confirmation. Explain that a real match requires mutual interest confirmed by a backend; one like alone is not a match.

### 6.13 Messages
Create a conversation list and conversation detail screen.

Conversation list: fictional participant, avatar, last-message preview, timestamp, unread demo indicator.

Conversation detail: message bubbles, timestamps, text input, send action, Block and Report controls.

Messages may be stored in local demo state. Clearly state that messages are simulated and are not delivered to another person. Do not claim real-time messaging or end-to-end encryption.

### 6.14 Notifications
Demo notifications for profile completion, suggested profiles, demo matches, and profile expiry reminders. Allow marking as read and clearing.

### 6.15 Settings and privacy
Include edit profile, profile visibility (visible/paused), search status, demo notification preferences, blocked profiles, privacy information, account-deletion information, and demo sign-out. Local controls must not claim to change a server-side profile.

### 6.16 Safety and help
Explain privacy precautions, meeting in public for first meetings, avoiding money transfers to unknown people, and how to block/report suspicious or abusive behaviour.

Demo report form: reason, optional description, submit. Confirmation must say the report is stored only in the local demo and is not sent to a moderation team.

## 7. Demo data and local persistence

Use fictional local data for profiles, matches, conversations, notifications, and reports.

- Keep sample data separate from screen logic where practical.
- Use stable IDs.
- Store only non-sensitive demo preferences/interactions in localStorage if needed.
- Never store passwords, identity documents, private addresses, or real personal information in browser storage.
- Handle missing or invalid stored data without crashing.
- Provide Reset Demo Data.
- Keep the data layer easy to replace with API calls in a later version.

## 8. Design system and responsive quality

Create reusable tokens for colours, typography, spacing, borders, radii, shadows, and states.

Reusable components should include navigation, buttons, form fields, select/multi-select controls, profile cards, compatibility highlights, empty states, alerts/toasts, confirmation dialogs, and page containers.

Test at 320–375px, 390–430px, 768px, 1366px, and 1440px+ widths. Avoid horizontal scrolling. Forms, cards, menus, and dialogs must fit small screens.

Accessibility:
- Semantic HTML.
- Labels for all form controls.
- Keyboard-operable actions and navigation.
- Visible focus indicators.
- Sufficient contrast.
- Alternative text for meaningful images.
- Status must not be communicated by colour alone.
- Respect reduced-motion preferences.

## 9. Technical requirements

- Continue with HTML, CSS, and JavaScript unless a documented reason justifies a change.
- Organise code into logical modules as the project grows.
- Avoid placing all data and all page logic in one large JavaScript file.
- Render user-entered text safely; avoid unsafe `innerHTML` insertion.
- Client-side validation is for usability only; real server-side validation is required in a future backend.
- Handle browser-storage errors.
- Keep secrets out of source control and `.env.example` placeholders only.
- Do not add dependencies without explaining why.

Suggested future structure (Copilot must inspect the existing project and propose a safe migration before moving files):

```text
FindMyMate/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── index.html
├── pages/
│   ├── signup.html
│   ├── login.html
│   ├── onboarding.html
│   ├── profile.html
│   ├── discover.html
│   ├── likes.html
│   ├── matches.html
│   ├── messages.html
│   ├── settings.html
│   └── safety.html
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── app.js
│   ├── data/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
└── docs/
    ├── version-0.1.0.md
    └── version-0.2.0.md
```

This is a proposed structure, not an instruction to move all files immediately.

## 10. Development milestones

### Milestone 1 — Organisation and navigation
Inspect current files, identify working features, propose a minimal structure, establish shared styles/layout, implement navigation, and test that the original demo still works.

**Done when:** all main destinations are reachable and no existing working feature is broken.

### Milestone 2 — Account UI and onboarding
Build sign-up/sign-in demo screens, validation, multi-step onboarding, relocation, accommodation, lifestyle questionnaire, review, and completion.

**Done when:** a user can complete demo onboarding and view a profile preview without entering real sensitive data.

### Milestone 3 — Profile and discovery
Build profile preview/edit, improved cards, filters, sorting, profile details, compatibility explanations, and empty/reset states.

**Done when:** the user can edit a demo profile, filter sample profiles, and inspect details.

### Milestone 4 — Likes, matches, and messaging demo
Build separate Likes and Matches pages, conversation list/detail, local demo sending, and unmatch confirmation.

**Done when:** the user can explore the intended connection journey and every simulated action is labelled.

### Milestone 5 — Settings, privacy, and safety
Build visibility controls, block list, report form, safety information, notifications, settings, and demo sign-out.

**Done when:** users can find safety information and try the demo privacy/report controls.

### Milestone 6 — Responsive testing and release cleanup
Test target widths, fix accessibility/layout issues, check console errors, test empty/invalid/long content, update README, and add release notes.

**Done when:** the prototype is navigable, consistent, responsive, and honestly documented.

## 11. Explicitly deferred to Version 0.3.0

Do not build fake production versions of these features in 0.2.0. Version 0.3.0 should focus on the transition to a real application foundation:

- Backend project and API design.
- Database schema and migrations.
- Real registration, authentication, and sessions.
- Server-side profile creation/editing.
- Secure photo upload and private media storage.
- Server-side discovery and filtering.
- Persistent likes and mutual-match logic.
- Authorisation and data-access controls.
- Account deletion and data-retention implementation.
- Backend validation, logging, backups, and tests.

Real-time messaging, identity verification, advanced group matching, payments, property-owner tools, and analytics should be assessed as later milestones.

## 12. Acceptance checklist

- [ ] Version 0.1.0 remains available in Git history.
- [ ] Consistent navigation works on desktop and mobile.
- [ ] All main destinations open a real screen.
- [ ] Sign-up/sign-in demo forms validate inputs.
- [ ] Onboarding covers relocation, accommodation, and lifestyle preferences.
- [ ] Demo profile can be previewed and edited.
- [ ] Discovery has multiple filters and clear-all.
- [ ] Profile details are accessible.
- [ ] Likes, demo matches, and demo messages have separate screens.
- [ ] Simulated features are clearly labelled.
- [ ] Privacy and safety information is accessible.
- [ ] Block/report controls have clear demo behaviour.
- [ ] No exact addresses, real identity documents, or real contact information are shown.
- [ ] App works at mobile, tablet, and desktop widths.
- [ ] Forms have labels, validation, and keyboard support.
- [ ] No known blocking browser-console errors remain.
- [ ] README explains how to run the project and what is not real yet.
- [ ] Changes are committed in small, understandable Git commits.

## 13. Copilot working agreement

Copilot must:
1. Read the repository README and this document before editing.
2. Inspect existing files and explain what already works.
3. Compare the current implementation against Version 0.2.0.
4. Propose changes before writing code.
5. List the exact files it intends to create, move, or modify.
6. Work on one milestone only.
7. Avoid deleting working files without explaining why.
8. Explain what changed and how to test it.
9. Never describe demo functionality as real backend functionality.
10. Wait for approval before starting the next milestone.

### First prompt for Copilot

```text
Read the current FindMyMate repository and docs/version-0.2.0.md completely.

We are beginning Version 0.2.0. Do not write or modify code yet.

Inspect the existing HTML, CSS, and JavaScript. Compare the implementation
with the Version 0.2.0 requirements and report:

1. What already exists and works.
2. What is missing.
3. Technical or structural problems that should be addressed.
4. A safe, minimal refactoring plan.
5. The exact files you propose to create, move, or modify for Milestone 1.
6. How Milestone 1 can be tested without breaking Version 0.1.0.

Do not implement Milestone 2 or later. Do not replace the project or
introduce a framework without explaining and receiving approval.
Wait for my approval before making changes.
```

## 14. Version history

| Version | Scope | Status |
|---|---|---|
| 0.1.0 | Responsive landing/discovery demo with fictional profiles and session-only interactions | Completed |
| 0.2.0 | Multi-screen frontend prototype: onboarding, profile, discovery, likes, matches, messaging demo, settings, safety | Next |
| 0.3.0 | Backend, database, real authentication, persistent profiles, API foundation | Planned |
| 0.4.0 | Production-oriented matching, messaging, notifications, moderation workflows | Future |
| 1.0.0 | Reviewed and tested public MVP with operational and legal readiness | Future |

---

## 15. Final direction

Version 0.2.0 is about completing the user experience, not pretending the platform is already operational.

**Prototype the journey → validate the screens → build the backend → connect real data → test safety and security → prepare for public release.**

A polished dashboard is a good beginning. A coherent end-to-end user journey is the next milestone.
