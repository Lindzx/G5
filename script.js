/* ===== TapinacCravings – all behavior ===== */

/* ---------- Data (edit your restaurants here) ---------- */
const places = [
  { name: "Aling Nena's Carinderia", cat: "Heavy meals", price: "₱60–120", area: "Rizal Ave", icon: "🍛", bg: "#e8d5b8",
    // To use a real picture later: put the file in an "images" folder and set src: "images/alingnena-1.jpg"
    photos: [
      { emoji: "🏪", label: "Storefront", src: "" },
      { emoji: "🍛", label: "Best seller", src: "" },
      { emoji: "🍚", label: "Rice meals", src: "" }
    ] },
  { name: "Milk Tea Corner", cat: "Drinks", price: "₱45–90", area: "Near campus", icon: "🧋", bg: "#d9e3d4",
    photos: [
      { emoji: "🏪", label: "Shop", src: "" },
      { emoji: "🧋", label: "Milk tea", src: "" },
      { emoji: "🍹", label: "Fruit tea", src: "" }
    ] },
  { name: "Kanto Fries & Fishballs", cat: "Street Foods", price: "₱10–50", area: "East Tapinac", icon: "🍢", bg: "#ecd2c0",
    photos: [
      { emoji: "🛒", label: "Food stall", src: "" },
      { emoji: "🍢", label: "Fishballs", src: "" },
      { emoji: "🍟", label: "Fries", src: "" }
    ] },
  { name: "Meryenda Hub", cat: "Snacks", price: "₱30–80", area: "Gordon Ave", icon: "🍟", bg: "#efe1b8",
    photos: [
      { emoji: "🏪", label: "Storefront", src: "" },
      { emoji: "🍟", label: "Fries", src: "" },
      { emoji: "🍩", label: "Sweet snacks", src: "" }
    ] },
  { name: "Bahay Luto", cat: "Home cooked", price: "₱80–150", area: "East Tapinac", icon: "🍲", bg: "#d6d9e2",
    photos: [
      { emoji: "🏠", label: "The place", src: "" },
      { emoji: "🍲", label: "Soup of the day", src: "" },
      { emoji: "🥘", label: "Ulam", src: "" }
    ] }
];

/* ---------- Favourites storage ---------- */
function loadFavs() {
  try { return new Set(JSON.parse(localStorage.getItem("tc-favs") || "[]")); }
  catch (e) { return new Set(); }
}
function saveFavs() {
  try { localStorage.setItem("tc-favs", JSON.stringify([...faved])); } catch (e) {}
}
const faved = loadFavs();
const $ = id => document.getElementById(id);

/* ---------- Explore ---------- */
let cat = "all";

function renderExplore(animate = false) {
  const term = $("explore-q").value.trim().toLowerCase();
  const shown = places.filter(p =>
    (cat === "all" || p.cat === cat) &&
    (p.name + " " + p.cat + " " + p.area).toLowerCase().includes(term));
  $("explore-list").classList.toggle("anim", animate);   // fade-up only when asked
  $("explore-list").innerHTML = shown.length ? shown.map((p, i) => `
    <article class="place" style="--i:${i}">
      <div class="art" style="background:${p.bg}">${p.icon}
        <button class="heart" data-name="${p.name}" aria-label="Favourite">${faved.has(p.name) ? "❤️" : "🤍"}</button>
      </div>
      <div class="info">
        <div><h2>${p.name}</h2><p>${p.cat} · ${p.price} · ${p.area}</p></div>
        <button class="go" data-name="${p.name}">View</button>
      </div>
    </article>`).join("")
    : '<p class="empty">No spots match yet. Try another search.</p>';
}

function setCategory(value) {
  cat = value;
  $("explore-chips").querySelectorAll(".chip").forEach(c =>
    c.setAttribute("aria-pressed", c.dataset.cat === value));
  renderExplore(true);
}

$("explore-chips").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (b) setCategory(b.dataset.cat);
});
$("explore-list").addEventListener("click", e => {
  const h = e.target.closest(".heart");
  if (h) {
    faved.has(h.dataset.name) ? faved.delete(h.dataset.name) : faved.add(h.dataset.name);
    saveFavs();
    renderExplore();
    return;
  }
  const v = e.target.closest(".go");       // "View" opens that spot on the map
  if (v) {
    showSpot(places.findIndex(p => p.name === v.dataset.name));
    go("map");
  }
});
$("explore-q").addEventListener("input", () => renderExplore());

/* Welcome chips jump to Explore with that category */
$("welcome-chips").addEventListener("click", e => {
  const b = e.target.closest(".w-chip");
  if (!b) return;
  setCategory(b.dataset.cat);
  go("explore");
});

/* ---------- Favourites ---------- */
function renderFavs(animate = false) {
  const term = $("fav-q").value.trim().toLowerCase();
  const shown = places.filter(p => faved.has(p.name) && (p.name + p.cat).toLowerCase().includes(term));
  $("fav-count").textContent = faved.size + " saved spots";
  $("fav-grid").classList.toggle("anim", animate);
  $("fav-grid").innerHTML = shown.length ? shown.map((p, i) => `
    <article class="place" style="--i:${i}">
      <div class="art" style="background:${p.bg}">${p.icon}</div>
      <div class="info">
        <h2 style="font-size:15px">${p.name}</h2>
        <span class="price">${p.price}</span>
        <button class="go" data-name="${p.name}">Remove</button>
      </div>
    </article>`).join("")
    : '<p class="empty" style="grid-column:1/-1">Nothing saved yet. Tap the heart on the Explore page.</p>';
}
$("fav-grid").addEventListener("click", e => {
  const b = e.target.closest(".go");
  if (!b) return;
  faved.delete(b.dataset.name);
  saveFavs();
  renderFavs();
});
$("fav-q").addEventListener("input", () => renderFavs());

/* ---------- Map ---------- */
$("map-chips").innerHTML = places.map((p, i) =>
  `<button class="chip" data-i="${i}" aria-pressed="false">${p.icon} ${p.name}</button>`).join("");

function showSpot(i) {
  const p = places[i];
  if (!p) return;
  $("map-icon").textContent = p.icon;
  $("map-name").textContent = p.name;
  $("map-cat").textContent = p.cat;
  $("map-addr").textContent = p.area + ", Olongapo City";
  $("map-price").textContent = p.price;
  $("map-dir").href = "https://www.google.com/maps/search/" + encodeURIComponent(p.name + " " + p.area + " Olongapo");
  $("map-chips").querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", +c.dataset.i === i));
  // Photos: shows the real image if "src" is filled in, otherwise the emoji placeholder
  $("map-photos").innerHTML = p.photos.map(ph => `
    <figure class="photo" style="background:${p.bg}">
      ${ph.src ? `<img src="${ph.src}" alt="${ph.label}">` : `<span>${ph.emoji}</span>`}
      <figcaption>${ph.label}</figcaption>
    </figure>`).join("");
}
$("map-chips").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (b) showSpot(+b.dataset.i);
});

/* ---------- Screen switching ---------- */
const screens = ["welcome", "explore", "favourites", "map"];
let current = null;

function hashName() {
  const n = location.hash.slice(1);
  return screens.includes(n) ? n : "welcome";
}

// Shows one screen. Works even if the browser never fires "hashchange".
function show(name) {
  if (name === current) return;          // already here, nothing to redo
  current = name;
  screens.forEach(s => { $("screen-" + s).hidden = s !== name; });
  document.body.dataset.screen = name;   // lets CSS style each screen
  $("nav").hidden = name === "welcome";
  document.querySelectorAll("#nav a").forEach(a =>
    a.classList.toggle("on", a.getAttribute("href") === "#" + name));
  if (name === "explore") renderExplore(true);
  if (name === "favourites") renderFavs(true);
  window.scrollTo(0, 0);
}

// Go to a screen: show it right away, then update the address bar (best effort)
function go(name) {
  show(name);
  try { if (location.hash !== "#" + name) location.hash = "#" + name; } catch (e) {}
}

// Every link like <a href="#explore"> goes through go()
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  go(a.getAttribute("href").slice(1));
});

// Phone back button / manual address changes
window.addEventListener("hashchange", () => show(hashName()));

showSpot(0);
show(hashName());
