import { demoConversations, demoNotifications, demoProfiles } from "./data.js";
import { escapeHtml, renderScreen } from "./screens.js";

const landing = document.querySelector("#main-content");
const appMain = document.querySelector("#app-main");
const screenRoot = document.querySelector("#screen-root");
const toast = document.querySelector("#toast");
const defaultFilters = {
  city: "all",
  budget: "all",
  moveIn: "all",
  accommodation: "all",
  lifestyle: "all",
  sort: "relevance",
};
const state = {
  user: null,
  userProfile: null,
  onboarding: {},
  onboardingStep: 1,
  likes: new Set(),
  passed: new Set(),
  blocked: new Set(),
  unmatched: new Set(),
  filters: { ...defaultFilters },
  messages: {},
  reports: [],
  notifications: demoNotifications.map((item) => ({ ...item })),
  visibility: "visible",
  searchStatus: "Actively looking",
  notificationPreferences: { email: false, matches: true },
};

let toastTimeout;

function currentRoute() {
  return window.location.hash.slice(1).toLowerCase() || "home";
}

function isLandingRoute(route) {
  return ["home", "dashboard", "how-it-works", "faq"].includes(route);
}

function activePage(route) {
  if (route.startsWith("detail/")) return "discover";
  if (route.startsWith("conversation/")) return "messages";
  if (route.startsWith("report")) return "safety";
  if (route === "home") return "home";
  if (route === "dashboard") return "dashboard";
  return route;
}

function render() {
  const route = currentRoute();
  const showLanding = isLandingRoute(route);
  landing.hidden = !showLanding;
  appMain.hidden = showLanding;
  if (showLanding) {
    screenRoot.replaceChildren();
    renderLandingDiscovery();
    document.title = "FindMyMate — find your kind of roommate";
    if (route === "how-it-works" || route === "faq") {
      requestAnimationFrame(() => document.getElementById(route)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  } else {
    screenRoot.innerHTML = renderScreen(route, state);
    const title = screenRoot.querySelector("h1")?.textContent || "Prototype";
    document.title = `${title} — FindMyMate`;
    window.scrollTo(0, 0);
  }

  const active = activePage(route);
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderLandingDiscovery() {
  const grid = document.querySelector("#profile-grid");
  const emptyState = document.querySelector("#empty-state");
  const city = document.querySelector("#city-filter");
  const budget = document.querySelector("#budget-filter");
  if (!grid || !emptyState || !city || !budget) return;

  city.value = state.filters.city;
  budget.value = state.filters.budget;
  const maxBudget = state.filters.budget === "all" ? Infinity : Number(state.filters.budget);
  const visible = demoProfiles.filter((profile) => {
    return (state.filters.city === "all" || profile.city === state.filters.city)
      && profile.budget <= maxBudget
      && !state.passed.has(profile.id)
      && !state.blocked.has(profile.id);
  });

  grid.innerHTML = visible.map((profile) => {
    const liked = state.likes.has(profile.id);
    return `<article class="profile-card">
      <div class="profile-portrait portrait-${escapeHtml(profile.color)}">
        <span class="portrait-initial" aria-hidden="true">${escapeHtml(profile.initials)}</span>
        <span class="portrait-city">${escapeHtml(profile.city)}</span>
        <span class="profile-badge">♡ A LITTLE IN COMMON</span>
      </div>
      <div class="profile-info">
        <div class="profile-heading"><div><h3>${escapeHtml(profile.name)}, ${escapeHtml(profile.age)}</h3><p>${escapeHtml(profile.role)}</p></div>
          <button class="save-button${liked ? " is-liked" : ""}" type="button" data-action="like" data-id="${escapeHtml(profile.id)}" aria-label="${liked ? "Remove interest in" : "Show interest in"} ${escapeHtml(profile.name)}" aria-pressed="${liked}">${liked ? "♥" : "♡"}</button>
        </div>
        <div class="profile-location"><span aria-hidden="true">⌖</span> ${escapeHtml(profile.area)} · ${escapeHtml(profile.city)}</div>
        <div class="profile-facts"><span>₹${Number(profile.budget).toLocaleString("en-IN")} / month</span><span>Move-in: ${escapeHtml(profile.moveIn)}</span></div>
        <div class="trait-list">${profile.traits.map((trait) => `<span>${escapeHtml(trait)}</span>`).join("")}</div>
        <div class="compatibility"><span class="compatibility-icon" aria-hidden="true">✳</span>${escapeHtml(profile.match)}</div>
        <div class="card-actions"><button class="pass-button" type="button" data-action="pass" data-id="${escapeHtml(profile.id)}">Pass</button>
          <button class="interest-button${liked ? " is-liked" : ""}" type="button" data-action="like" data-id="${escapeHtml(profile.id)}" aria-pressed="${liked}">${liked ? "Interested ✓" : "I'm interested"} <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>`;
  }).join("");
  emptyState.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
}

function navigate(route) {
  const hash = `#${route}`;
  if (window.location.hash === hash) render();
  else window.location.hash = route;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function fieldError(form, name, message) {
  const error = form.querySelector(`[data-error-for="${CSS.escape(name)}"]`);
  const input = form.elements.namedItem(name);
  if (error) error.textContent = message;
  if (input instanceof RadioNodeList) {
    Array.from(input).forEach((item) => item.setAttribute("aria-invalid", "true"));
  } else if (input instanceof HTMLElement) {
    input.setAttribute("aria-invalid", "true");
  }
}

function clearErrors(form) {
  form.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  form.querySelectorAll("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
  const feedback = form.querySelector(".form-feedback");
  if (feedback) feedback.textContent = "";
}

function validateForm(form, customValidation = () => true) {
  clearErrors(form);
  let valid = true;
  for (const control of form.elements) {
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) continue;
    if (control.type === "radio" && control !== form.querySelector(`input[name="${CSS.escape(control.name)}"]`)) continue;
    if (!control.checkValidity()) {
      const message = control.validity.valueMissing
        ? "This field is required."
        : control.validity.typeMismatch
          ? "Enter a valid email address."
          : control.validity.tooShort
            ? `Enter at least ${control.minLength} characters.`
            : control.validationMessage || "Check this value.";
      fieldError(form, control.name, message);
      valid = false;
    }
  }
  if (!customValidation(form, fieldError)) valid = false;
  if (!valid) form.querySelector("[aria-invalid='true']")?.focus();
  return valid;
}

function collectForm(form) {
  const values = {};
  new FormData(form).forEach((value, name) => {
    if (Object.hasOwn(values, name)) values[name] = [].concat(values[name], value);
    else values[name] = value;
  });
  const checkboxNames = new Set(Array.from(form.querySelectorAll('input[type="checkbox"][name]'), (input) => input.name));
  checkboxNames.forEach((name) => {
    const controls = Array.from(form.querySelectorAll(`input[type="checkbox"][name="${CSS.escape(name)}"]`));
    const checkedValues = controls.filter((input) => input.checked).map((input) => input.value);
    values[name] = controls.length === 1 ? checkedValues.length > 0 : checkedValues;
  });
  return values;
}

function signupValidation(form, setError) {
  let valid = true;
  const phone = form.elements.namedItem("phone").value.trim();
  const password = form.elements.namedItem("password").value;
  if (phone && !/^\+?[\d\s()-]{7,20}$/.test(phone)) {
    setError(form, "phone", "Enter a valid phone format or leave this optional field blank.");
    valid = false;
  }
  if (password.length < 8) {
    setError(form, "password", "Enter at least 8 characters.");
    valid = false;
  }
  if (password !== form.elements.namedItem("confirmPassword").value) {
    setError(form, "confirmPassword", "Passwords do not match.");
    valid = false;
  }
  return valid;
}

function onboardingValidation(form, setError) {
  let valid = true;
  const step = Number(form.dataset.step);
  if (step === 3) {
    if (!form.querySelector('input[name="roomIntent"]:checked')) {
      setError(form, "roomIntent", "Choose whether you need a room or have one to share.");
      valid = false;
    }
    const min = Number(form.elements.namedItem("minBudget").value);
    const max = Number(form.elements.namedItem("maxBudget").value);
    if (max < min) {
      setError(form, "maxBudget", "Maximum budget must be at least the minimum budget.");
      valid = false;
    }
  }
  if (step === 5 && !form.querySelector('input[name="avatarColor"]:checked')) {
    setError(form, "avatarColor", "Choose an illustration to continue.");
    valid = false;
  }
  return valid;
}

function handleSignup(form) {
  if (!validateForm(form, signupValidation)) return;
  const values = collectForm(form);
  const displayName = values.displayName.trim();
  const email = values.email.trim();
  form.elements.namedItem("password").value = "";
  form.elements.namedItem("confirmPassword").value = "";
  state.user = { displayName, email };
  state.onboarding = { ...state.onboarding, displayName };
  state.onboardingStep = 1;
  navigate("onboarding");
  showToast("Demo only: no account was created and no registration details were sent or saved.");
}

function handleSignin(form) {
  if (!validateForm(form)) return;
  form.elements.namedItem("password").value = "";
  const feedback = form.querySelector("#signin-feedback");
  feedback.textContent = "Sign-in is not connected. Use the fictional demo option instead.";
}

function handleOnboarding(form) {
  if (!validateForm(form, onboardingValidation)) return;
  const step = Number(form.dataset.step);
  state.onboarding = { ...state.onboarding, ...collectForm(form) };
  if (step < 6) {
    state.onboardingStep += 1;
    render();
    return;
  }
  state.user = state.user || { displayName: state.onboarding.displayName || "Demo member" };
  state.userProfile = { ...state.onboarding };
  state.onboardingStep = 1;
  navigate("profile");
  showToast("Your profile preview is ready for this page session only.");
}

function updateFilters(form) {
  const values = collectForm(form);
  state.filters = { ...defaultFilters, ...state.filters, ...values };
  render();
}

function handleSettings(form) {
  const values = collectForm(form);
  state.visibility = values.visibility || "visible";
  state.searchStatus = values.searchStatus || "Actively looking";
  state.notificationPreferences = {
    email: Boolean(values.emailNotifications),
    matches: Boolean(values.matchNotifications),
  };
  render();
  showToast("Demo settings updated for this page session only.");
}

function handleReport(form) {
  if (!validateForm(form)) return;
  const values = collectForm(form);
  state.reports.push({
    profileId: form.dataset.profileId || "",
    reason: values.reason,
    description: values.description || "",
  });
  navigate("safety");
  showToast("Demo report recorded in this page session only. It was not sent to a moderation team.");
}

function handleMessage(form) {
  if (!validateForm(form)) return;
  const message = form.elements.namedItem("message").value.trim();
  if (!message) {
    fieldError(form, "message", "Write a short demo message first.");
    return;
  }
  const conversationId = form.dataset.conversation;
  const conversation = demoConversations.find((item) => item.id === conversationId);
  if (!conversation) {
    showToast("This demo conversation is unavailable.");
    return;
  }
  const messages = state.messages[conversationId] || conversation.messages.slice();
  messages.push({ from: "you", text: message, time: "Just now" });
  state.messages[conversationId] = messages;
  render();
  showToast("Demo message added to this page session. It was not delivered.");
}

function confirmAction(message) {
  return window.confirm(message);
}

function handleAction(button) {
  const { action, id } = button.dataset;
  if (action === "like") {
    state.likes.add(id);
    state.passed.delete(id);
    showToast("Interest recorded for this demo session only. Nothing was sent.");
  } else if (action === "pass") {
    state.passed.add(id);
    state.likes.delete(id);
    showToast("Profile passed in this demo session.");
  } else if (action === "remove-like") {
    state.likes.delete(id);
    showToast("Demo interest removed.");
  } else if (action === "reset-demo") {
    state.likes.clear();
    state.passed.clear();
    state.filters = { ...defaultFilters };
    showToast("Demo choices reset for this page session.");
  } else if (action === "clear-filters" || action === "clear-all-filters") {
    state.filters = { ...defaultFilters };
  } else if (action === "block") {
    if (!confirmAction("Block this fictional profile in the current demo session?")) return;
    state.blocked.add(id);
    state.likes.delete(id);
    showToast("Fictional profile blocked for this page session.");
    navigate("discover");
    return;
  } else if (action === "unblock") {
    state.blocked.delete(id);
    showToast("Demo profile unblocked.");
  } else if (action === "unmatch") {
    if (!confirmAction("Remove this fictional demo match?")) return;
    state.unmatched.add(id);
    showToast("Fictional demo match removed.");
  } else if (action === "demo-signin") {
    state.user = { displayName: "Sam Demo", email: "sam.demo@example.test" };
    showToast("Signed in to the fictional demo only.");
    navigate("discover");
    return;
  } else if (action === "toggle-password") {
    const input = document.getElementById(button.getAttribute("aria-controls"));
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.textContent = visible ? "Hide" : "Show";
    button.setAttribute("aria-pressed", String(visible));
    return;
  } else if (action === "mark-read") {
    state.notifications = state.notifications.map((item) => item.id === id ? { ...item, read: true } : item);
  } else if (action === "mark-all-read") {
    state.notifications = state.notifications.map((item) => ({ ...item, read: true }));
  } else if (action === "clear-notifications") {
    state.notifications = [];
  } else if (action === "onboarding-back") {
    const form = screenRoot.querySelector("#onboarding-form");
    if (form) state.onboarding = { ...state.onboarding, ...collectForm(form) };
    state.onboardingStep = Math.max(1, state.onboardingStep - 1);
    render();
    return;
  } else if (action === "demo-signout") {
    if (!confirmAction("End this demo session and clear its in-memory profile, messages, and preferences?")) return;
    state.user = null;
    state.userProfile = null;
    state.onboarding = {};
    state.onboardingStep = 1;
    state.likes.clear();
    state.passed.clear();
    state.blocked.clear();
    state.unmatched.clear();
    state.messages = {};
    state.reports = [];
    state.filters = { ...defaultFilters };
    state.notifications = demoNotifications.map((item) => ({ ...item }));
    state.visibility = "visible";
    state.searchStatus = "Actively looking";
    state.notificationPreferences = { email: false, matches: true };
    navigate("home");
    showToast("Demo session cleared.");
    return;
  }
  render();
}

function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  const handlers = {
    "signup-form": handleSignup,
    "signin-form": handleSignin,
    "onboarding-form": handleOnboarding,
    "settings-form": handleSettings,
    "report-form": handleReport,
    "message-form": handleMessage,
  };
  const handler = handlers[form.id];
  if (!handler) return;
  event.preventDefault();
  handler(form);
}

function handleChange(event) {
  const form = event.target.closest("form");
  if (form?.id === "discovery-filters") updateFilters(form);
  if (event.target.id === "city-filter" || event.target.id === "budget-filter") {
    state.filters.city = document.querySelector("#city-filter").value;
    state.filters.budget = document.querySelector("#budget-filter").value;
    renderLandingDiscovery();
  }
}

screenRoot.addEventListener("submit", handleSubmit);
screenRoot.addEventListener("change", handleChange);
screenRoot.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    event.preventDefault();
    handleAction(actionButton);
    return;
  }
  const onboardingBack = event.target.closest("[data-action='onboarding-back']");
  if (onboardingBack) handleAction(onboardingBack);
});
landing.addEventListener("change", handleChange);
landing.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) handleAction(actionButton);
});
window.addEventListener("hashchange", render);

render();
