const profiles = [
  {
    id: "anaya",
    name: "Anaya",
    age: 26,
    initials: "A",
    city: "Bengaluru",
    area: "Indiranagar",
    role: "UX designer",
    budget: 18000,
    moveIn: "Flexible",
    duration: "12+ months",
    color: "coral",
    traits: ["Early riser", "Loves to cook", "Keeps it tidy"],
    match: "Both love a calm, tidy home",
  },
  {
    id: "rohan",
    name: "Rohan",
    age: 28,
    initials: "R",
    city: "Mumbai",
    area: "Andheri West",
    role: "Product designer",
    budget: 22000,
    moveIn: "1 Dec",
    duration: "6–12 months",
    color: "blue",
    traits: ["Night owl", "Mostly vegetarian", "Weekend hikes"],
    match: "You both enjoy an easygoing home",
  },
  {
    id: "meera",
    name: "Meera",
    age: 24,
    initials: "M",
    city: "Pune",
    area: "Koregaon Park",
    role: "Graduate student",
    budget: 14000,
    moveIn: "15 Dec",
    duration: "12+ months",
    color: "yellow",
    traits: ["Quiet evenings", "Plant person", "Shares the chores"],
    match: "Similar routines, shared-space style",
  },
  {
    id: "kabir",
    name: "Kabir",
    age: 27,
    initials: "K",
    city: "Delhi",
    area: "Hauz Khas",
    role: "Architect",
    budget: 20000,
    moveIn: "Flexible",
    duration: "6–12 months",
    color: "green",
    traits: ["Early riser", "Enjoys hosting", "Likes a shared meal"],
    match: "You both like a little company",
  },
];

const profileGrid = document.querySelector("#profile-grid");
const emptyState = document.querySelector("#empty-state");
const cityFilter = document.querySelector("#city-filter");
const budgetFilter = document.querySelector("#budget-filter");
const toast = document.querySelector("#toast");
const likedProfiles = new Set();
const passedProfiles = new Set();
let toastTimeout;

function renderProfiles() {
  const city = cityFilter.value;
  const maxBudget = budgetFilter.value === "all" ? Infinity : Number(budgetFilter.value);
  const visibleProfiles = profiles.filter((profile) => {
    return profile.city === city || city === "all"
      ? profile.budget <= maxBudget
      : false;
  }).filter((profile) => !passedProfiles.has(profile.id));

  profileGrid.innerHTML = visibleProfiles.map((profile) => {
    const liked = likedProfiles.has(profile.id);
    return `
      <article class="profile-card">
        <div class="profile-portrait portrait-${profile.color}">
          <span class="portrait-initial" aria-hidden="true">${profile.initials}</span>
          <span class="portrait-city">${profile.city}</span>
          <span class="profile-badge">♡ A LITTLE IN COMMON</span>
        </div>
        <div class="profile-info">
          <div class="profile-heading">
            <div><h3>${profile.name}, ${profile.age}</h3><p>${profile.role}</p></div>
            <button class="save-button${liked ? " is-liked" : ""}" type="button"
              data-action="like" data-id="${profile.id}"
              aria-label="${liked ? "Remove interest in" : "Show interest in"} ${profile.name}"
              aria-pressed="${liked}">${liked ? "♥" : "♡"}</button>
          </div>
          <div class="profile-location"><span aria-hidden="true">⌖</span> ${profile.area} · ${profile.city}</div>
          <div class="profile-facts">
            <span>₹${profile.budget.toLocaleString("en-IN")} / month</span>
            <span>Move-in: ${profile.moveIn}</span>
          </div>
          <div class="trait-list">${profile.traits.map((trait) => `<span>${trait}</span>`).join("")}</div>
          <div class="compatibility"><span class="compatibility-icon" aria-hidden="true">✳</span>${profile.match}</div>
          <div class="card-actions">
            <button class="pass-button" type="button" data-action="pass" data-id="${profile.id}">Pass</button>
            <button class="interest-button${liked ? " is-liked" : ""}" type="button"
              data-action="like" data-id="${profile.id}" aria-pressed="${liked}">
              ${liked ? "Interested ✓" : "I'm interested"} <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  emptyState.hidden = visibleProfiles.length > 0;
  profileGrid.hidden = visibleProfiles.length === 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

profileGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const profile = profiles.find((item) => item.id === button.dataset.id);
  if (!profile) return;

  if (button.dataset.action === "like") {
    if (likedProfiles.has(profile.id)) {
      likedProfiles.delete(profile.id);
      showToast(`Interest in ${profile.name} removed. Your choice stays on this page only.`);
    } else {
      likedProfiles.add(profile.id);
      showToast(`You showed interest in ${profile.name}. This is a demo—nothing was sent.`);
    }
  } else {
    passedProfiles.add(profile.id);
    showToast(`${profile.name}'s fictional profile was passed.`);
  }
  renderProfiles();
});

cityFilter.addEventListener("change", renderProfiles);
budgetFilter.addEventListener("change", renderProfiles);

document.querySelector("#reset-demo").addEventListener("click", () => {
  likedProfiles.clear();
  passedProfiles.clear();
  cityFilter.value = "all";
  budgetFilter.value = "all";
  renderProfiles();
  showToast("Demo choices reset.");
});

renderProfiles();
