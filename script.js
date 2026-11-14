const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("searchButton");
const statusBox = document.getElementById("status");
const resultsBox = document.getElementById("results");
const clearButton = document.getElementById("clearButton");

// These are public profile URL patterns, not account-existence checks.
const platforms = [
  { name: "GitHub", url: username => `https://github.com/${encodeURIComponent(username)}` },
  { name: "Reddit", url: username => `https://www.reddit.com/user/${encodeURIComponent(username)}/` },
  { name: "YouTube", url: username => `https://www.youtube.com/@${encodeURIComponent(username)}` },
  { name: "Instagram", url: username => `https://www.instagram.com/${encodeURIComponent(username)}/` }
];

function isValidUsername(value) {
  // A simple username format check for this classroom prototype.
  return /^[A-Za-z0-9._-]{1,39}$/.test(value);
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const username = usernameInput.value.trim().replace(/^@/, "");

  resultsBox.replaceChildren();

  if (!username) {
    statusBox.textContent = "Please enter a username.";
    usernameInput.focus();
    return;
  }

  if (!isValidUsername(username)) {
    statusBox.textContent = "Use 1–39 letters, numbers, dots, underscores, or hyphens.";
    usernameInput.focus();
    return;
  }

  searchButton.disabled = true;
  statusBox.textContent = "Preparing public profile links…";

  // This demo does not query platforms or claim that profiles were found.
  platforms.forEach(platform => {
    const card = document.createElement("article");
    card.className = "result-card";

    const details = document.createElement("div");
    const name = document.createElement("div");
    name.className = "platform";
    name.textContent = platform.name;

    const note = document.createElement("div");
    note.className = "result-note";
    note.textContent = "Open the public profile page to check manually.";

    details.append(name, note);

    const link = document.createElement("a");
    link.href = platform.url(username);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open profile ↗";

    card.append(details, link);
    resultsBox.append(card);
  });

  statusBox.textContent = `Public profile links prepared for “${username}”. Account availability is not verified.`;
  searchButton.disabled = false;
});

clearButton.addEventListener("click", () => {
  usernameInput.value = "";
  resultsBox.replaceChildren();
  statusBox.textContent = "";
  usernameInput.focus();
});
