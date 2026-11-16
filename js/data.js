export const demoProfiles = [
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
    moveInDate: "2026-12-01",
    duration: "12+ months",
    accommodation: "Private room",
    color: "coral",
    traits: ["Early riser", "Loves to cook", "Keeps it tidy"],
    match: "Both love a calm, tidy home",
    lifestyle: { sleep: "Early", noise: "Quiet", cooking: "Often", chores: "Shared", guests: "Sometimes" },
    intro: "I like a relaxed, tidy home, trying new recipes, and weekend walks.",
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
    moveInDate: "2026-12-01",
    duration: "6–12 months",
    accommodation: "Flat share",
    color: "blue",
    traits: ["Night owl", "Mostly vegetarian", "Weekend hikes"],
    match: "You both enjoy an easygoing home",
    lifestyle: { sleep: "Late", noise: "Moderate", cooking: "Sometimes", chores: "Shared", guests: "Sometimes" },
    intro: "Designer, curious eater, and usually out hiking when the weekend arrives.",
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
    moveInDate: "2026-12-15",
    duration: "12+ months",
    accommodation: "Private room",
    color: "yellow",
    traits: ["Quiet evenings", "Plant person", "Shares the chores"],
    match: "Similar routines, shared-space style",
    lifestyle: { sleep: "Early", noise: "Quiet", cooking: "Often", chores: "Shared", guests: "Rarely" },
    intro: "I enjoy plants, quiet evenings, and keeping shared spaces comfortable for everyone.",
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
    moveInDate: "2026-12-01",
    duration: "6–12 months",
    accommodation: "Room in shared flat",
    color: "green",
    traits: ["Early riser", "Enjoys hosting", "Likes a shared meal"],
    match: "You both like a little company",
    lifestyle: { sleep: "Early", noise: "Moderate", cooking: "Often", chores: "Shared", guests: "Often" },
    intro: "Architect who enjoys cooking for friends and finding new corners of the city.",
  },
];

export const demoMatches = ["anaya", "meera"].map((id, index) => {
  const profile = demoProfiles.find((item) => item.id === id);
  return { ...profile, matchedOn: index === 0 ? "Nov 12" : "Nov 09" };
});

export const demoConversations = [
  {
    id: "anaya",
    profileId: "anaya",
    preview: "What kind of food do you like cooking?",
    time: "10:42 AM",
    unread: true,
    messages: [
      { from: "them", text: "Hi! I liked your note about a relaxed home.", time: "10:18 AM" },
      { from: "you", text: "Thanks! Cooking together sometimes sounds nice.", time: "10:26 AM" },
      { from: "them", text: "What kind of food do you like cooking?", time: "10:42 AM" },
    ],
  },
  {
    id: "meera",
    profileId: "meera",
    preview: "A quiet evening sounds perfect.",
    time: "Yesterday",
    unread: false,
    messages: [
      { from: "them", text: "I usually keep weeknights pretty quiet.", time: "Yesterday" },
      { from: "you", text: "A quiet evening sounds perfect.", time: "Yesterday" },
    ],
  },
];

export const demoNotifications = [
  { id: "profile", type: "profile", title: "Complete your demo profile", body: "A few more details can help make your preview more useful.", time: "Today", read: false },
  { id: "suggestion", type: "suggestion", title: "A new profile to explore", body: "There are fictional profiles waiting in Discover.", time: "Yesterday", read: false },
  { id: "match", type: "match", title: "A demo match is ready", body: "Explore how mutual interest could look in the prototype.", time: "Nov 12", read: true },
  { id: "expiry", type: "reminder", title: "Keep a search up to date", body: "In a future service, you would be able to renew an active search.", time: "Nov 10", read: true },
];

export const cities = ["Bengaluru", "Mumbai", "Pune", "Delhi"];

export const lifestyleChoices = {
  wake: ["Early", "Flexible", "Late", "Prefer not to say"],
  sleep: ["Early", "Flexible", "Late", "Prefer not to say"],
  noise: ["Quiet", "Moderate", "Lively", "Prefer not to say"],
  guests: ["Rarely", "Sometimes", "Often", "Prefer not to say"],
  cooking: ["Daily", "Often", "Sometimes", "Rarely", "Prefer not to say"],
  food: ["Vegetarian", "Mostly vegetarian", "No preference", "Other", "Prefer not to say"],
  cleanliness: ["Very tidy", "Generally tidy", "Relaxed", "Prefer not to say"],
  chores: ["Shared schedule", "Take turns", "Discuss together", "Prefer not to say"],
  pets: ["Comfortable with pets", "No pets at home", "Discuss first", "Prefer not to say"],
  smoking: ["Smoke-free home", "Discuss first", "Prefer not to say"],
};
