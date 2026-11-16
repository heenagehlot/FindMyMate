import { demoConversations, demoMatches, demoNotifications, demoProfiles, lifestyleChoices } from "./data.js";

export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function field(name, label, options = {}) {
  const { type = "text", value = "", checked = false, required = false, hint = "", placeholder = "", min, max, minLength, step, autocomplete = "" } = options;
  const id = `field-${name}`;
  const requiredMark = required ? '<span aria-hidden="true"> *</span>' : "";
  const attributes = [
    `id="${id}"`,
    `name="${escapeHtml(name)}"`,
    `type="${escapeHtml(type)}"`,
    required ? "required" : "",
    min !== undefined ? `min="${escapeHtml(min)}"` : "",
    max !== undefined ? `max="${escapeHtml(max)}"` : "",
    minLength !== undefined ? `minlength="${escapeHtml(minLength)}"` : "",
    step !== undefined ? `step="${escapeHtml(step)}"` : "",
    autocomplete ? `autocomplete="${escapeHtml(autocomplete)}"` : "",
    placeholder ? `placeholder="${escapeHtml(placeholder)}"` : "",
    type === "checkbox" && checked ? "checked" : "",
    type === "checkbox" ? "" : `value="${escapeHtml(value)}"`,
  ].filter(Boolean).join(" ");

  if (type === "checkbox") {
    return `<label class="check-field" for="${id}"><input ${attributes}><span>${label}${requiredMark}</span></label><p class="field-hint">${hint}</p><p class="field-error" data-error-for="${escapeHtml(name)}"></p>`;
  }

  return `<div class="form-field"><label for="${id}">${label}${requiredMark}</label><input ${attributes}><span class="field-hint">${hint}</span><span class="field-error" data-error-for="${escapeHtml(name)}"></span></div>`;
}

function textarea(name, label, value = "", options = {}) {
  const { required = false, rows = 3, placeholder = "", hint = "" } = options;
  const id = `field-${name}`;
  return `<div class="form-field"><label for="${id}">${label}${required ? '<span aria-hidden="true"> *</span>' : ""}</label><textarea id="${id}" name="${escapeHtml(name)}" rows="${rows}" ${required ? "required" : ""} ${placeholder ? `placeholder="${escapeHtml(placeholder)}"` : ""}>${escapeHtml(value)}</textarea><span class="field-hint">${hint}</span><span class="field-error" data-error-for="${escapeHtml(name)}"></span></div>`;
}

function selectField(name, label, values, selected = "", options = {}) {
  const { required = false, hint = "" } = options;
  const id = `field-${name}`;
  const choices = values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
  return `<div class="form-field"><label for="${id}">${label}${required ? '<span aria-hidden="true"> *</span>' : ""}</label><select id="${id}" name="${escapeHtml(name)}" ${required ? "required" : ""}><option value="">Select an option</option>${choices}</select><span class="field-hint">${hint}</span><span class="field-error" data-error-for="${escapeHtml(name)}"></span></div>`;
}

function radioGroup(name, label, values, selected = "") {
  return `<fieldset class="choice-field"><legend>${label}</legend><div class="choice-options">${values.map((value) => `<label><input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${selected === value ? "checked" : ""}><span>${escapeHtml(value)}</span></label>`).join("")}</div><span class="field-error" data-error-for="${escapeHtml(name)}"></span></fieldset>`;
}

function checkGroup(name, label, values, selected = []) {
  return `<fieldset class="choice-field"><legend>${label}</legend><div class="choice-options">${values.map((value) => `<label><input type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${selected.includes(value) ? "checked" : ""}><span>${escapeHtml(value)}</span></label>`).join("")}</div></fieldset>`;
}

function pageHeader(kicker, title, description = "") {
  return `<header class="screen-heading"><p class="section-kicker">${kicker}</p><h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</header>`;
}

function demoNotice(text = "Prototype only. This is a local demo, not a live roommate-matching service.") {
  return `<p class="demo-notice" role="note"><span aria-hidden="true">✳</span>${text}</p>`;
}

function avatar(profile) {
  return `<span class="small-avatar portrait-${escapeHtml(profile.color)}" aria-hidden="true">${escapeHtml(profile.initials)}</span>`;
}

function profileCard(profile, state, showActions = true) {
  const liked = state.likes.has(profile.id);
  return `<article class="v2-profile-card">
    <div class="v2-profile-cover portrait-${escapeHtml(profile.color)}">
      ${avatar(profile)}<span class="cover-city">${escapeHtml(profile.city)}</span>
      <span class="cover-label">FICTIONAL DEMO PROFILE</span>
    </div>
    <div class="v2-profile-body">
      <div class="profile-topline"><div><h2>${escapeHtml(profile.name)}, ${escapeHtml(profile.age)}</h2><p>${escapeHtml(profile.role)}</p></div><span class="budget-tag">₹${Number(profile.budget).toLocaleString("en-IN")} / mo</span></div>
      <p class="profile-area">${escapeHtml(profile.area)} · ${escapeHtml(profile.city)} · Move-in ${escapeHtml(profile.moveIn)}</p>
      <p class="profile-intro">${escapeHtml(profile.intro)}</p>
      <div class="trait-list">${profile.traits.map((trait) => `<span>${escapeHtml(trait)}</span>`).join("")}</div>
      <p class="compatibility"><span aria-hidden="true">✳</span>${escapeHtml(profile.match)}</p>
      <div class="profile-card-actions">
        <a class="button button-outline" href="#detail/${escapeHtml(profile.id)}">View profile</a>
        ${showActions ? `<button class="button button-soft" type="button" data-action="pass" data-id="${escapeHtml(profile.id)}">Pass</button><button class="button button-dark" type="button" data-action="like" data-id="${escapeHtml(profile.id)}" aria-pressed="${liked}">${liked ? "Interested ✓" : "I'm interested"}</button>` : ""}
      </div>
    </div>
  </article>`;
}

function renderSignUp() {
  return `<section class="app-screen auth-screen">
    ${pageHeader("CREATE A DEMO ACCOUNT", "Start with the basics.", "These are the only registration fields in this version. You can suggest additional fields later.")}
    ${demoNotice("Do not enter real personal information. Nothing is sent to a server, and passwords are never saved.")}
    <form class="panel form-panel" id="signup-form" novalidate>
      <div class="form-grid">
        ${field("displayName", "Display name", { required: true, autocomplete: "name", hint: "This name would be shown on your profile." })}
        ${field("email", "Email address", { type: "email", required: true, autocomplete: "email" })}
        ${field("phone", "Phone number (optional)", { type: "tel", autocomplete: "tel", placeholder: "+91 98765 43210", hint: "Optional. Use a fictional number in this demo." })}
        ${field("password", "Password", { type: "password", required: true, minLength: 8, autocomplete: "new-password", hint: "At least 8 characters. Used only for this form demonstration." })}
        ${field("confirmPassword", "Confirm password", { type: "password", required: true, autocomplete: "new-password" })}
      </div>
      ${field("termsAccepted", "I agree to the Terms of Service and Privacy Notice.", { type: "checkbox", required: true, hint: "Review the prototype notices: Terms and Privacy." })}
      <div class="form-actions"><button class="button button-dark" type="submit">Continue to demo profile <span aria-hidden="true">↗</span></button><a class="text-link" href="#signin">Already have an account? Sign in</a></div>
      <p class="form-feedback" id="signup-feedback" role="status"></p>
    </form>
  </section>`;
}

function renderSignIn() {
  return `<section class="app-screen auth-screen">
    ${pageHeader("WELCOME BACK", "Sign in to your demo.", "Authentication is not connected in this prototype.")}
    ${demoNotice("Do not use a real password. This form does not create a session or send credentials.")}
    <form class="panel form-panel narrow-panel" id="signin-form" novalidate>
      ${field("email", "Email address", { type: "email", required: true, autocomplete: "email" })}
      <div class="form-field"><label for="field-password">Password<span aria-hidden="true"> *</span></label><div class="password-control"><input id="field-password" name="password" type="password" required autocomplete="current-password"><button type="button" class="password-toggle" data-action="toggle-password" aria-controls="field-password" aria-pressed="false">Show</button></div><span class="field-error" data-error-for="password"></span></div>
      <a class="text-link" href="#recover">Forgot password?</a>
      <div class="form-actions"><button class="button button-dark" type="submit">Sign in</button><button class="button button-outline" type="button" data-action="demo-signin">Use the fictional demo</button></div>
      <p class="form-feedback" id="signin-feedback" role="status"></p>
      <p class="auth-switch">New to FindMyMate? <a href="#signup">Create a demo account</a></p>
    </form>
  </section>`;
}

const onboardingTitles = [
  "A little about you",
  "Where are you headed?",
  "Your room plans",
  "Everyday living",
  "A profile preview",
  "Review your demo profile",
];

function onboardingStepContent(step, answer, state) {
  if (step === 1) {
    return `<div class="form-grid">
      ${field("displayName", "Display name", { value: answer.displayName || state.user?.displayName || "", required: true })}
      ${selectField("ageRange", "Age range", ["18–20", "21–24", "25–29", "30–34", "35+", "Prefer not to say"], answer.ageRange, { required: true, hint: "Choose an age range only; do not enter a date of birth." })}
      ${field("occupation", "Profession or study status", { value: answer.occupation || "", required: true, placeholder: "e.g. Student, engineer, designer" })}
      ${field("languages", "Languages (optional)", { value: answer.languages || "", placeholder: "e.g. English, Hindi" })}
      ${textarea("introduction", "A short introduction (optional)", answer.introduction || "", { hint: "Share only what you are comfortable including in a demo profile." })}
    </div>`;
  }
  if (step === 2) {
    return `<div class="form-grid">
      ${selectField("currentCity", "Current city", ["Bengaluru", "Mumbai", "Pune", "Delhi", "Other"], answer.currentCity, { required: true })}
      ${selectField("destinationCity", "Destination city", ["Bengaluru", "Mumbai", "Pune", "Delhi", "Other"], answer.destinationCity, { required: true })}
      ${field("preferredAreas", "Preferred neighbourhoods (optional)", { value: answer.preferredAreas || "", placeholder: "Broad areas only, no street address" })}
      ${selectField("moveReason", "Reason for moving", ["Study", "Work", "Internship", "Job search", "Personal", "Other"], answer.moveReason, { required: true })}
      ${field("moveInDate", "Preferred move-in date", { type: "date", value: answer.moveInDate || "" })}
      ${selectField("stayDuration", "Expected stay", ["Under 3 months", "3–6 months", "6–12 months", "12+ months", "Flexible"], answer.stayDuration, { required: true })}
      ${field("workLocation", "Work or study area (optional)", { value: answer.workLocation || "" })}
      ${selectField("commute", "Preferred commute (optional)", ["Up to 30 minutes", "Up to 45 minutes", "Up to 60 minutes", "Flexible"], answer.commute)}
      ${field("moveInFlexible", "My move-in date is flexible", { type: "checkbox", checked: Boolean(answer.moveInFlexible), hint: "Optional." })}
    </div><p class="privacy-inline">Do not provide an exact home address. City and broad area are enough.</p>`;
  }
  if (step === 3) {
    return `<div class="form-grid">
      ${radioGroup("roomIntent", "What are you looking for?", ["I need a room", "I have a room to share"], answer.roomIntent)}
      ${selectField("accommodationType", "Accommodation type", ["Flat", "Private room", "Shared room", "PG / hostel", "Flexible"], answer.accommodationType, { required: true })}
      ${field("minBudget", "Minimum monthly budget (₹)", { type: "number", min: 0, step: 500, value: answer.minBudget || "", required: true })}
      ${field("maxBudget", "Maximum monthly budget (₹)", { type: "number", min: 0, step: 500, value: answer.maxBudget || "", required: true })}
      ${field("roommates", "Roommates needed / spaces available", { type: "number", min: 1, max: 10, value: answer.roommates || "1", required: true })}
      ${selectField("furnishing", "Furnishing", ["Furnished", "Partly furnished", "Unfurnished", "Flexible"], answer.furnishing, { required: true })}
      ${checkGroup("facilities", "Facilities you prefer", ["Wi-Fi", "Laundry", "Kitchen", "Air conditioning", "Accessible entry"], answer.facilities || [])}
      ${textarea("roomDescription", "Accommodation notes (optional)", answer.roomDescription || "", { hint: "Never include an exact address or private contact details." })}
    </div><p class="privacy-inline">For this prototype, exact addresses are neither requested nor displayed.</p>`;
  }
  if (step === 4) {
    const preference = (key, label) => selectField(key, label, lifestyleChoices[key], answer[key], { required: true });
    return `<div class="form-grid lifestyle-grid">
      <fieldset class="lifestyle-section"><legend>Daily routine</legend>${preference("wake", "Usual wake-up time")}${preference("sleep", "Usual sleep schedule")}${selectField("schedule", "Work / study routine", ["Mostly at home", "Mostly outside", "Mixed", "Flexible", "Prefer not to say"], answer.schedule, { required: true })}${selectField("weekendRoutine", "Weekday / weekend routine", ["Similar every day", "Different on weekends", "Varies", "Prefer not to say"], answer.weekendRoutine)}</fieldset>
      <fieldset class="lifestyle-section"><legend>Home environment</legend>${preference("noise", "Preferred noise level")}${preference("guests", "Guests and gatherings")}${selectField("quietHours", "Quiet hours", ["Before 9 pm", "9–11 pm", "After 11 pm", "Discuss together", "Prefer not to say"], answer.quietHours, { required: true })}${selectField("musicTv", "Music and TV at home", ["Usually quiet", "At a considerate volume", "Enjoy a lively home", "Discuss together", "Prefer not to say"], answer.musicTv)}${selectField("workFromHome", "Working or studying from home", ["Often", "Sometimes", "Rarely", "Discuss together", "Prefer not to say"], answer.workFromHome)}</fieldset>
      <fieldset class="lifestyle-section"><legend>Food and kitchen</legend>${preference("food", "Food preference")}${preference("cooking", "Cooking frequency")}${selectField("kitchenSharing", "Sharing the kitchen", ["Happy to share", "Prefer separate times", "Discuss together", "Prefer not to say"], answer.kitchenSharing)}${selectField("foodSharing", "Sharing groceries or food", ["Happy to share", "Prefer to keep separate", "Discuss together", "Prefer not to say"], answer.foodSharing)}</fieldset>
      <fieldset class="lifestyle-section"><legend>Cleanliness and chores</legend>${preference("cleanliness", "Cleanliness expectations")}${selectField("cleaningFrequency", "Cleaning frequency", ["Daily tidy-up", "Weekly routine", "As needed", "Discuss together", "Prefer not to say"], answer.cleaningFrequency)}${preference("chores", "Sharing chores")}${checkGroup("choresDetails", "Chores to discuss", ["Dishes", "Kitchen", "Floors", "Dusting", "Waste disposal", "Shared areas"], answer.choresDetails || [])}</fieldset>
      <fieldset class="lifestyle-section"><legend>Lifestyle and boundaries</legend>${preference("pets", "Pets at home")}${preference("smoking", "Household smoking preference")}${selectField("hobbies", "Hobbies (optional)", ["Creative activities", "Sports and outdoors", "Reading and quiet time", "Social activities", "Prefer not to say"], answer.hobbies)}${selectField("exercise", "Exercise routine (optional)", ["Often", "Sometimes", "Rarely", "Prefer not to say"], answer.exercise)}${selectField("socialHome", "Social or quiet home", ["Mostly quiet", "A mix of both", "Often social", "Discuss together", "Prefer not to say"], answer.socialHome)}${selectField("communication", "Communication style", ["Direct and open", "Check in regularly", "Discuss as needed", "Prefer not to say"], answer.communication, { required: true })}${selectField("boundaries", "Personal boundaries", ["Talk openly and agree together", "Give each other space", "Discuss as needed", "Prefer not to say"], answer.boundaries)}</fieldset>
    </div><p class="privacy-inline">You can edit these preferences later in the prototype. There are no character judgements or validated compatibility scores.</p>`;
  }
  if (step === 5) {
    const colors = ["coral", "blue", "yellow", "green"];
    return `<div class="photo-choice">
      <p>Choose an illustrated placeholder. Photo uploads and identity documents are not collected.</p>
      <div class="avatar-choices">${colors.map((color, index) => `<label><input type="radio" name="avatarColor" value="${color}" ${answer.avatarColor === color || (!answer.avatarColor && index === 0) ? "checked" : ""}><span class="small-avatar portrait-${color}" aria-hidden="true">${escapeHtml((answer.displayName || state.user?.displayName || "F").charAt(0).toUpperCase())}</span><span>Illustration ${index + 1}</span></label>`).join("")}</div>
    </div>`;
  }
  const rows = [
    ["Name", answer.displayName],
    ["Age range", answer.ageRange],
    ["Profession / study", answer.occupation],
    ["Moving to", answer.destinationCity],
    ["Preferred areas", answer.preferredAreas],
    ["Move-in", answer.moveInFlexible ? "Flexible" : (answer.moveInDate || "Not set")],
    ["Stay duration", answer.stayDuration],
    ["Accommodation", answer.accommodationType],
    ["Monthly budget", answer.maxBudget ? `₹${Number(answer.minBudget || 0).toLocaleString("en-IN")}–₹${Number(answer.maxBudget).toLocaleString("en-IN")}` : "Not set"],
    ["Living preferences", [answer.sleep, answer.noise, answer.chores].filter(Boolean).join(" · ")],
  ];
  return `<div class="review-list">${rows.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || "Not provided")}</strong></div>`).join("")}</div><p class="privacy-inline">Review before completing. Only this browser session holds these demo answers. They are not submitted to a service.</p>`;
}

function renderOnboarding(state) {
  const step = state.onboardingStep;
  return `<section class="app-screen">
    ${pageHeader("PROFILE SETUP · DEMO", onboardingTitles[step - 1], "Complete this guided preview with fictional information. You can go back and change your answers.")}
    ${demoNotice("Onboarding answers stay in this page session only. Do not enter real personal or sensitive information.")}
    <div class="progress-label"><span>Step ${step} of 6</span><span>${Math.round((step / 6) * 100)}%</span></div>
    <progress max="6" value="${step}" aria-label="Onboarding progress"></progress>
    <form class="panel form-panel" id="onboarding-form" data-step="${step}" novalidate>
      ${onboardingStepContent(step, state.onboarding, state)}
      <div class="form-actions onboarding-actions">
        ${step > 1 ? '<button class="button button-outline" type="button" data-action="onboarding-back">Back</button>' : ""}
        <button class="button button-dark" type="submit">${step === 6 ? "Complete demo profile" : "Continue"} <span aria-hidden="true">↗</span></button>
      </div>
      <p class="form-feedback" id="onboarding-feedback" role="status"></p>
    </form>
  </section>`;
}

function renderProfile(state) {
  const profile = state.userProfile;
  if (!profile) {
    return `<section class="app-screen">${pageHeader("MY PROFILE", "Your demo profile", "Create a fictional profile to preview how your information could appear.")}${demoNotice()}<div class="panel empty-panel"><p>No demo profile has been completed in this session.</p><a class="button button-dark" href="#onboarding">Start profile setup</a></div></section>`;
  }
  const name = profile.displayName || state.user?.displayName || "Demo member";
  const lifestyle = [
    profile.sleep && `Sleep: ${profile.sleep}`,
    profile.noise && `Noise: ${profile.noise}`,
    profile.chores && `Chores: ${profile.chores}`,
    profile.socialHome && `Home style: ${profile.socialHome}`,
    profile.communication && `Communication: ${profile.communication}`,
  ].filter(Boolean);
  return `<section class="app-screen">
    ${pageHeader("MY PROFILE · SESSION ONLY", "Your profile preview", "This preview is visible only in this browser session. Private registration details are not shown.")}
    <div class="profile-preview panel">
      <div class="profile-preview-top"><span class="large-avatar portrait-${escapeHtml(profile.avatarColor || "coral")}" aria-hidden="true">${escapeHtml(name.charAt(0).toUpperCase())}</span><div><h2>${escapeHtml(name)}${profile.ageRange ? ` · ${escapeHtml(profile.ageRange)}` : ""}</h2><p>${escapeHtml(profile.occupation || "Occupation not provided")}</p></div></div>
      <div class="profile-preview-grid">
        <div><span>Moving to</span><strong>${escapeHtml(profile.destinationCity || "Not provided")}</strong></div>
        <div><span>Area</span><strong>${escapeHtml(profile.preferredAreas || "Flexible")}</strong></div>
        <div><span>Budget</span><strong>${profile.maxBudget ? `₹${Number(profile.minBudget || 0).toLocaleString("en-IN")}–₹${Number(profile.maxBudget).toLocaleString("en-IN")} / month` : "Not provided"}</strong></div>
        <div><span>Move-in</span><strong>${escapeHtml(profile.moveInFlexible ? "Flexible" : profile.moveInDate || "Flexible")}</strong></div>
        <div><span>Expected stay</span><strong>${escapeHtml(profile.stayDuration || "Not provided")}</strong></div>
        <div><span>Accommodation</span><strong>${escapeHtml(profile.accommodationType || "Flexible")}</strong></div>
        <div><span>Search type</span><strong>${escapeHtml(profile.roomIntent || "Room seeker")}</strong></div>
        <div><span>Roommates / spaces</span><strong>${escapeHtml(profile.roommates || "Not provided")}</strong></div>
      </div>
      ${profile.introduction ? `<p class="profile-intro">${escapeHtml(profile.introduction)}</p>` : ""}
      ${lifestyle.length ? `<div class="trait-list">${lifestyle.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
      ${demoNotice("Email, phone, exact address, birth date, passwords, and verification material are never displayed here.")}
      <div class="form-actions"><a class="button button-dark" href="#onboarding">Edit demo profile</a><a class="button button-outline" href="#discover">Explore profiles</a></div>
    </div>
  </section>`;
}

function renderDiscover(state) {
  const filtered = demoProfiles.filter((profile) => {
    if (state.blocked.has(profile.id) || state.passed.has(profile.id)) return false;
    if (state.filters.city !== "all" && profile.city !== state.filters.city) return false;
    if (state.filters.budget !== "all" && profile.budget > Number(state.filters.budget)) return false;
    if (state.filters.accommodation !== "all" && profile.accommodation !== state.filters.accommodation) return false;
    if (state.filters.moveIn === "flexible" && profile.moveIn !== "Flexible") return false;
    if (state.filters.moveIn === "soon" && profile.moveIn === "Flexible") return false;
    if (state.filters.lifestyle !== "all" && !profile.traits.some((trait) => trait.toLowerCase().includes(state.filters.lifestyle))) return false;
    return true;
  });
  if (state.filters.sort === "move-in") {
    filtered.sort((a, b) => a.moveInDate.localeCompare(b.moveInDate));
  }
  const budgetValues = ["all", "15000", "20000", "25000"];
  const budgetLabels = ["Any budget", "Up to ₹15,000", "Up to ₹20,000", "Up to ₹25,000"];
  return `<section class="app-screen">
    ${pageHeader("DISCOVER · FICTIONAL PROFILES", "Find your kind of roommate.", "Explore fictional profiles using practical filters. Compatibility highlights are illustrative, not guarantees.")}
    ${demoNotice("All profiles are fictional. Likes and passes are demo actions; no one is contacted.")}
    <form class="filter-panel" id="discovery-filters">
      <label><span>Destination city</span><select name="city">${["all", "Bengaluru", "Mumbai", "Pune", "Delhi"].map((city) => `<option value="${city}" ${state.filters.city === city ? "selected" : ""}>${city === "all" ? "Any city" : city}</option>`).join("")}</select></label>
      <label><span>Monthly budget</span><select name="budget">${budgetValues.map((value, index) => `<option value="${value}" ${state.filters.budget === value ? "selected" : ""}>${budgetLabels[index]}</option>`).join("")}</select></label>
      <label><span>Move-in</span><select name="moveIn">${[["all", "Any timing"], ["soon", "Date set"], ["flexible", "Flexible"]].map(([value, label]) => `<option value="${value}" ${state.filters.moveIn === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <label><span>Accommodation</span><select name="accommodation">${["all", "Private room", "Flat share", "Room in shared flat"].map((value) => `<option value="${value}" ${state.filters.accommodation === value ? "selected" : ""}>${value === "all" ? "Any type" : value}</option>`).join("")}</select></label>
      <label><span>Lifestyle highlight</span><select name="lifestyle">${[["all", "Any highlight"], ["quiet", "Quiet"], ["cook", "Cooking"], ["tidy", "Tidy"], ["plant", "Plants"]].map(([value, label]) => `<option value="${value}" ${state.filters.lifestyle === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <label><span>Sort by</span><select name="sort">${[["relevance", "Relevance"], ["move-in", "Move-in date"]].map(([value, label]) => `<option value="${value}" ${state.filters.sort === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <button class="button button-outline" type="button" data-action="clear-filters">Clear filters</button>
    </form>
    <div class="results-heading"><h2>Profiles to explore</h2><span>${filtered.length} fictional ${filtered.length === 1 ? "profile" : "profiles"}</span></div>
    ${filtered.length ? `<div class="v2-profile-grid">${filtered.map((profile) => profileCard(profile, state)).join("")}</div>` : `<div class="panel empty-panel"><h2>No profiles match these filters.</h2><p>Clear one or more filters to see other fictional profiles.</p><button class="button button-outline" type="button" data-action="clear-all-filters">Clear filters</button></div>`}
  </section>`;
}

function renderDetail(profile, state) {
  if (!profile) return `<section class="app-screen">${pageHeader("PROFILE DETAILS", "Profile not found", "This fictional profile may no longer be available.")}<a class="button button-dark" href="#discover">Back to Discover</a></section>`;
  return `<section class="app-screen">
    <a class="back-link" href="#discover">← Back to Discover</a>
    ${pageHeader("FICTIONAL PROFILE", `${escapeHtml(profile.name)}, ${escapeHtml(profile.age)}`, `${escapeHtml(profile.role)} · ${escapeHtml(profile.city)} · ${escapeHtml(profile.area)}`)}
    ${demoNotice()}
    <div class="detail-grid">
      <div class="panel detail-main"><div class="profile-preview-top">${avatar(profile)}<div><h2>${escapeHtml(profile.name)}</h2><p>${escapeHtml(profile.role)}</p></div></div><h3>About</h3><p>${escapeHtml(profile.intro)}</p><h3>Living preferences</h3><div class="trait-list">${profile.traits.map((trait) => `<span>${escapeHtml(trait)}</span>`).join("")}</div><dl class="detail-facts"><div><dt>Sleep schedule</dt><dd>${escapeHtml(profile.lifestyle.sleep)}</dd></div><div><dt>Home noise</dt><dd>${escapeHtml(profile.lifestyle.noise)}</dd></div><div><dt>Cooking</dt><dd>${escapeHtml(profile.lifestyle.cooking)}</dd></div><div><dt>Chores</dt><dd>${escapeHtml(profile.lifestyle.chores)}</dd></div><div><dt>Guests</dt><dd>${escapeHtml(profile.lifestyle.guests)}</dd></div></dl><p class="compatibility"><span aria-hidden="true">✳</span>${escapeHtml(profile.match)}. This highlight is illustrative only.</p></div>
      <aside class="panel detail-aside"><h2>Room plans</h2><p><strong>City:</strong> ${escapeHtml(profile.city)}</p><p><strong>Area:</strong> ${escapeHtml(profile.area)}</p><p><strong>Budget:</strong> ₹${Number(profile.budget).toLocaleString("en-IN")} / month</p><p><strong>Move-in:</strong> ${escapeHtml(profile.moveIn)}</p><p><strong>Stay:</strong> ${escapeHtml(profile.duration)}</p><p><strong>Accommodation:</strong> ${escapeHtml(profile.accommodation)}</p><p class="privacy-inline">No exact address or contact details are shown.</p><div class="stack-actions"><button class="button button-dark" type="button" data-action="like" data-id="${escapeHtml(profile.id)}" aria-pressed="${state.likes.has(profile.id)}">${state.likes.has(profile.id) ? "Interested ✓" : "I'm interested"}</button><button class="button button-outline" type="button" data-action="pass" data-id="${escapeHtml(profile.id)}">Pass on profile</button><a class="text-link" href="#report/${escapeHtml(profile.id)}">Report this profile</a><button class="text-link danger-link" type="button" data-action="block" data-id="${escapeHtml(profile.id)}">Block this profile</button></div></aside>
    </div>
  </section>`;
}

function renderLikes(state) {
  const liked = demoProfiles.filter((profile) => state.likes.has(profile.id) && !state.blocked.has(profile.id));
  return `<section class="app-screen">${pageHeader("YOUR DEMO ACTIVITY", "Likes", "Profiles you have shown interest in during this browser session.")}${demoNotice("Likes are session-only. They are not sent to anyone or stored after this page session.")}${liked.length ? `<div class="v2-profile-grid">${liked.map((profile) => `<div>${profileCard(profile, state, false)}<button class="text-link remove-like" type="button" data-action="remove-like" data-id="${escapeHtml(profile.id)}">Remove interest</button></div>`).join("")}</div>` : `<div class="panel empty-panel"><h2>No likes yet</h2><p>Explore fictional profiles and show interest to see them here.</p><a class="button button-dark" href="#discover">Go to Discover</a></div>`}</section>`;
}

function renderMatches(state) {
  const matches = demoMatches.filter((profile) => !state.unmatched.has(profile.id) && !state.blocked.has(profile.id));
  return `<section class="app-screen">${pageHeader("FICTIONAL MUTUAL INTEREST", "Demo matches", "These sample matches are provided to preview the intended connection flow.")}${demoNotice("All matches are fictional. In a real service, a match would require mutual interest confirmed by a backend.")}${matches.length ? `<div class="match-grid">${matches.map((profile) => `<article class="panel match-card">${avatar(profile)}<div><h2>${escapeHtml(profile.name)}, ${escapeHtml(profile.age)}</h2><p>${escapeHtml(profile.city)} · Demo match ${escapeHtml(profile.matchedOn)}</p><p>${escapeHtml(profile.match)}</p></div><div class="match-actions"><a class="button button-dark" href="#conversation/${escapeHtml(profile.id)}">Open demo conversation</a><button class="button button-outline" type="button" data-action="unmatch" data-id="${escapeHtml(profile.id)}">Unmatch</button></div></article>`).join("")}</div>` : `<div class="panel empty-panel"><h2>No demo matches</h2><a class="button button-dark" href="#discover">Explore profiles</a></div>`}</section>`;
}

function renderMessages(state, conversationId = "") {
  const conversations = demoConversations.filter((conversation) => !state.blocked.has(conversation.profileId));
  if (conversationId) {
    const conversation = conversations.find((item) => item.id === conversationId);
    if (!conversation) return `<section class="app-screen">${pageHeader("DEMO MESSAGES", "Conversation unavailable", "This fictional conversation is not available.")}<a class="button button-dark" href="#messages">Back to messages</a></section>`;
    const profile = demoProfiles.find((item) => item.id === conversation.profileId);
    const messages = state.messages[conversation.id] || conversation.messages;
    return `<section class="app-screen">${pageHeader("SIMULATED CONVERSATION", `Chat with ${escapeHtml(profile.name)}`, `${escapeHtml(profile.city)} · Fictional demo match`)}${demoNotice("Messages are simulated and are not delivered to another person. Do not type real personal information.")}<div class="chat-panel panel"><div class="chat-toolbar"><a class="back-link" href="#messages">← All messages</a><div><a class="text-link" href="#report/${escapeHtml(profile.id)}">Report</a><button class="text-link danger-link" type="button" data-action="block" data-id="${escapeHtml(profile.id)}">Block</button></div></div><div class="chat-messages" aria-live="polite">${messages.map((message) => `<div class="message-row ${message.from === "you" ? "message-own" : ""}"><p>${escapeHtml(message.text)}</p><span>${escapeHtml(message.time)} · Demo</span></div>`).join("")}</div><form class="chat-compose" id="message-form" data-conversation="${escapeHtml(conversation.id)}" novalidate><label class="visually-hidden" for="message-text">Demo message</label><textarea id="message-text" name="message" rows="2" maxlength="500" required placeholder="Write a demo message"></textarea><button class="button button-dark" type="submit">Send demo message</button><span class="field-error" data-error-for="message"></span></form></div></section>`;
  }
  return `<section class="app-screen">${pageHeader("FICTIONAL DEMO CONVERSATIONS", "Messages", "Explore a simulated conversation list. No messages are delivered.")}${demoNotice("These messages are fictional. New messages stay in this page session only.")}${conversations.length ? `<div class="conversation-list panel">${conversations.map((conversation) => { const profile = demoProfiles.find((item) => item.id === conversation.profileId); return `<a class="conversation-item" href="#conversation/${escapeHtml(conversation.id)}">${avatar(profile)}<span class="conversation-copy"><strong>${escapeHtml(profile.name)}</strong><span>${escapeHtml((state.messages[conversation.id] || conversation.messages).at(-1)?.text || conversation.preview)}</span></span><span class="conversation-time">${escapeHtml(conversation.time)}${conversation.unread ? '<i aria-label="Unread demo message"></i>' : ""}</span></a>`; }).join("")}</div>` : `<div class="panel empty-panel"><p>No demo conversations are available.</p></div>`}</section>`;
}

function renderNotifications(state) {
  const notifications = state.notifications;
  return `<section class="app-screen">${pageHeader("DEMO UPDATES", "Notifications", "Fictional reminders and product suggestions.")}${demoNotice("Notifications are local demo examples; nothing is sent to an account.")}<div class="notification-actions"><button class="button button-outline" type="button" data-action="mark-all-read">Mark all as read</button><button class="button button-outline" type="button" data-action="clear-notifications">Clear notifications</button></div>${notifications.length ? `<div class="notification-list panel">${notifications.map((item) => `<article class="notification-item ${item.read ? "is-read" : ""}"><span class="notification-dot" aria-hidden="true"></span><div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.body)}</p><span>${escapeHtml(item.time)} · Demo</span></div>${item.read ? "" : `<button class="text-link" type="button" data-action="mark-read" data-id="${escapeHtml(item.id)}">Mark read</button>`}</article>`).join("")}</div>` : `<div class="panel empty-panel"><p>No demo notifications.</p></div>`}</section>`;
}

function renderSettings(state) {
  const blockedProfiles = demoProfiles.filter((profile) => state.blocked.has(profile.id));
  return `<section class="app-screen">${pageHeader("DEMO PREFERENCES", "Settings and privacy", "Controls below only affect this page session.")}
    ${demoNotice("No settings are sent to a server. No account data is stored.")}
    <form class="panel form-panel settings-form" id="settings-form">
      <fieldset class="choice-field"><legend>Profile visibility</legend><div class="choice-options"><label><input type="radio" name="visibility" value="visible" ${state.visibility === "visible" ? "checked" : ""}><span>Visible in demo</span></label><label><input type="radio" name="visibility" value="paused" ${state.visibility === "paused" ? "checked" : ""}><span>Paused in demo</span></label></div></fieldset>
      ${selectField("searchStatus", "Search status", ["Actively looking", "Open to options", "Search fulfilled"], state.searchStatus)}
      <fieldset class="choice-field"><legend>Demo notifications</legend><div class="choice-options"><label><input type="checkbox" name="emailNotifications" ${state.notificationPreferences.email ? "checked" : ""}><span>Email notification demo</span></label><label><input type="checkbox" name="matchNotifications" ${state.notificationPreferences.matches ? "checked" : ""}><span>Match notification demo</span></label></div></fieldset>
      <button class="button button-dark" type="submit">Save demo settings</button>
      <p class="form-feedback" id="settings-feedback" role="status"></p>
    </form>
    <section class="panel settings-section"><h2>Blocked demo profiles</h2>${blockedProfiles.length ? blockedProfiles.map((profile) => `<p class="blocked-row">${escapeHtml(profile.name)} · ${escapeHtml(profile.city)} <button class="text-link" type="button" data-action="unblock" data-id="${escapeHtml(profile.id)}">Unblock</button></p>`).join("") : "<p>No profiles are blocked in this session.</p>"}</section>
    <section class="panel settings-section"><h2>Account and data</h2><p>Account deletion is not connected. Closing this page clears the session-only profile, messages, reports, and settings.</p><button class="button button-outline danger-button" type="button" data-action="demo-signout">End demo session</button></section>
    <p class="settings-links"><a href="#privacy">Privacy notice</a><a href="#safety">Safety and help</a><a href="#terms">Terms</a></p>
  </section>`;
}

function renderSafety() {
  return `<section class="app-screen safety-screen">${pageHeader("SAFETY AND TRUST", "Your wellbeing comes first.", "A roommate search should give you control over what you share and when.")}
    <div class="safety-guide-grid">
      <article class="panel"><span class="value-icon icon-leaf" aria-hidden="true">⌑</span><h2>Keep personal details private</h2><p>Do not publish an exact home address, phone number, email, identity document, or password. Share contact details only when you choose.</p></article>
      <article class="panel"><span class="value-icon icon-sun" aria-hidden="true">↗</span><h2>Meet thoughtfully</h2><p>Consider meeting in a public place first, tell someone you trust about your plans, and make your own transport arrangements.</p></article>
      <article class="panel"><span class="value-icon icon-heart" aria-hidden="true">!</span><h2>Watch for money requests</h2><p>Be cautious about urgent requests for deposits, fees, or transfers from people you have not independently verified. This demo does not handle payments.</p></article>
      <article class="panel"><span class="value-icon icon-leaf" aria-hidden="true">↗</span><h2>Use block and report</h2><p>In this prototype, block and report actions only change local demo state. They are not sent to a moderation team.</p></article>
    </div>
    <div class="safety-actions"><a class="button button-dark" href="#report">Report a concern (demo)</a><a class="button button-outline" href="#community">Community guidelines</a></div>
    ${demoNotice("A future live service would need a staffed support and moderation process. This preview is not an emergency support channel.")}</section>`;
}

function renderReport(profileId = "") {
  const profile = demoProfiles.find((item) => item.id === profileId);
  return `<section class="app-screen">${pageHeader("SAFETY · LOCAL DEMO", "Report a concern", profile ? `About fictional profile ${escapeHtml(profile.name)}.` : "Use this fictional form to preview a report flow.")}${demoNotice("Your report is not sent to a moderation team. Do not enter real names or sensitive details.")}<form class="panel form-panel narrow-panel" id="report-form" data-profile-id="${escapeHtml(profileId)}" novalidate>
    ${selectField("reason", "Reason for report", ["Harassment or abusive behaviour", "Threats or intimidation", "Fake or misleading profile", "Suspicious request for money", "Inappropriate content", "Privacy concern", "Other"], "", { required: true })}
    ${textarea("description", "Additional context (optional)", "", { rows: 5, hint: "Keep it fictional. Do not include contact details, exact addresses, or identity information." })}
    <div class="form-actions"><button class="button button-dark" type="submit">Submit demo report</button><a class="button button-outline" href="#safety">Cancel</a></div>
    <p class="form-feedback" id="report-feedback" role="status"></p>
  </form></section>`;
}

function renderAboutPage(route) {
  const pages = {
    about: ["ABOUT FINDMYMATE", "A more thoughtful roommate search.", "FindMyMate is an early, India-first concept for finding people whose everyday routines and shared-living expectations may fit yours. This repository contains a fictional frontend prototype, not an operating service."],
    contact: ["CONTACT", "Support is not connected yet.", "This prototype has no support mailbox or staffed response team. Do not send personal information or urgent safety matters through this demo."],
    terms: ["TERMS · PROTOTYPE NOTICE", "Terms of this demo.", "This site is a non-production concept using fictional profiles and simulated actions. It does not create accounts, provide housing, verify people, make matches, deliver messages, or handle payments. Do not submit real personal data. A real service would require reviewed terms before launch."],
    privacy: ["PRIVACY · PROTOTYPE NOTICE", "Privacy by design.", "This frontend does not send registration, profile, message, or report information to a server. The demo keeps interaction and form state in memory for the current page session; passwords are cleared and never stored. Do not enter real personal information. A future service would require a complete, legally reviewed privacy notice and data-handling implementation."],
    community: ["COMMUNITY GUIDELINES", "Make shared spaces respectful.", "Treat others with respect. Be honest about accommodation needs. Respect boundaries and privacy. Do not pressure anyone for money, an exact address, identity documents, or contact details. Use block/report controls in a future live service. These guidelines are illustrative and are not currently moderated."],
    recover: ["ACCOUNT RECOVERY", "Recovery is not connected.", "Password recovery requires a secure backend and verified contact channel. This prototype does not accept or store passwords, and it cannot recover an account."],
  };
  const [kicker, title, body] = pages[route] || pages.about;
  return `<section class="app-screen info-screen">${pageHeader(kicker, title, body)}${demoNotice()}<a class="button button-outline" href="#home">Back to home</a>${route === "contact" ? '<p class="privacy-inline">A support contact will be published only after the service has an operational support process.</p>' : ""}</section>`;
}

export function renderScreen(route, state) {
  if (route === "signup") return renderSignUp();
  if (route === "signin") return renderSignIn();
  if (route === "recover") return renderAboutPage(route);
  if (route === "onboarding") return renderOnboarding(state);
  if (route === "profile") return renderProfile(state);
  if (route === "discover") return renderDiscover(state);
  if (route.startsWith("detail/")) return renderDetail(demoProfiles.find((item) => item.id === route.slice(7)), state);
  if (route === "likes") return renderLikes(state);
  if (route === "matches") return renderMatches(state);
  if (route === "messages") return renderMessages(state);
  if (route.startsWith("conversation/")) return renderMessages(state, route.slice(13));
  if (route === "notifications") return renderNotifications(state);
  if (route === "settings") return renderSettings(state);
  if (route === "safety" || route === "report") return route === "safety" ? renderSafety() : renderReport();
  if (route.startsWith("report/")) return renderReport(route.slice(7));
  if (["about", "contact", "terms", "privacy", "community"].includes(route)) return renderAboutPage(route);
  return `<section class="app-screen">${pageHeader("FINDMYMATE", "Page not found", "Choose a destination from the navigation.")}<a class="button button-dark" href="#home">Back to home</a></section>`;
}

export { onboardingTitles };
