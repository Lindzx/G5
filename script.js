/* ---------- Show any JavaScript error on screen (helps find problems on phones) ---------- */
window.addEventListener("error", e => {
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:999;background:#b00020;color:#fff;font:13px/1.4 sans-serif;padding:8px 12px";
  d.textContent = "Error: " + e.message + " (line " + e.lineno + ")";
  document.body.appendChild(d);
});

/* ===== TapinacCravings – all behavior ===== */

/* ---------- Data (edit your restaurants here) ---------- */
// Folder that holds your pictures (next to index.html). If you put the pictures beside index.html instead,
// change this to: const IMG = "";
const IMG = "";

const places = [
  { name: "Aling Nena's Carinderia", cat: "Heavy meals", price: "₱40–100", area: "Rizal Ave", icon: "🍛", bg: "#e8d5b8",
    thumb: IMG + "Jempay_Card.jpg",          // Jempay FoodLab logo shown on the Explore card
    student: true,  deal: "Student deal: Student meal starts at ₱50-60 with free soup refills",   hours: ["06:00", "20:00"],
    photos: [
      { emoji: "🏪", label: "Jempay FoodLab", src: IMG + "Jempay_Logo.jpg" },
      { emoji: "🍖", label: "Stufado ₱70", src: IMG + "Stufado.jpg" },
      { emoji: "🍗", label: "Fried chicken ₱60", src: IMG + "Fried_Chicken.jpg" },
      { emoji: "🍲", label: "Tokwa baboy ₱70", src: IMG + "Tokwa_Baboy.jpg" },
      { emoji: "🥦", label: "Beef broccoli ₱100", src: IMG + "Beef_Broccoli.jpg" },
      { emoji: "🍲", label: "Sinigang ₱80", src: IMG + "Sinigang.jpg" },
      { emoji: "🥬", label: "Labong ₱40", src: IMG + "Labong.jpg" },
      { emoji: "🎃", label: "Sitaw kalabasa ₱40", src: IMG + "Sitaw_Kalabasa.jpg" },
      { emoji: "🌶️", label: "Bicol ₱70", src: IMG + "Bicol.jpg" },
      { emoji: "🥩", label: "Sisig ₱80", src: IMG + "Sisig.jpg" },
      { emoji: "🍛", label: "Dinuguan ₱70", src: IMG + "Dinuguan.jpg" }
    ] },
  { name: "Milk Tea Corner", cat: "Drinks", price: "₱45–90", area: "Near campus", icon: "🧋", bg: "#d9e3d4",
    thumb: IMG + "Jeco_Cafe.jpg",          // picture shown on the Explore card (instead of the emoji)
    student: true,  deal: "Student deal: ₱10 off with school ID", hours: ["10:00", "22:00"],
    photos: [
      { emoji: "🏪", label: "Shop", src: IMG + "Jeco_Cafe.jpg" },
      { emoji: "🧋", label: "Milk tea", src: IMG + "Milktea.jpg" },
      { emoji: "🧋", label: "Premium milk tea", src: IMG + "Prem_Milktea.jpg" },
      { emoji: "🍹", label: "Frappe", src: IMG + "Frappe.jpg" },
      { emoji: "☕", label: "Iced coffee", src: IMG + "Ice_Coffee.jpg" }
    ] },
  { name: "Meryenda Hub", cat: "Snacks", price: "₱30–80", area: "Gordon Ave", icon: "🍟", bg: "#efe1b8",
    thumb: IMG + "Foodstall.jpg",
    student: true,  deal: "Student deal: snack + drink combo",   hours: ["09:00", "21:00"],
    photos: [
      { emoji: "🛒", label: "Food stall", src: IMG + "Foodstall.jpg" },
      { emoji: "🍢", label: "Isaw", src: IMG + "Isaw.jpg" },
      { emoji: "🥚", label: "Kwek-kwek", src: IMG + "Kwek_Kwek.jpg" },
      { emoji: "🍢", label: "Fishball", src: IMG + "Fishball.jpg" },
      { emoji: "🥟", label: "Kickiam", src: IMG + "Kickiam.jpg" },
      { emoji: "🍟", label: "Hash browns", src: IMG + "Hash_browns.jpg" },
      { emoji: "🥤", label: "Gulaman", src: IMG + "Gulaman.jpg" }
    ] },
  { name: "Weirdos Café", cat: "Drinks", price: "₱100–200", area: "Olongapo City", icon: "☕", bg: "#e6dccf",
    thumb: IMG + "Weirdos_Card.jpg",
    student: false, deal: "",   hours: ["08:00", "20:00"],      // hours are a placeholder - replace with the real ones
    photos: [
      { emoji: "🏪", label: "Weirdos Café", src: IMG + "Weirdos_Cafe.jpg" },
      { emoji: "📋", label: "Menu board", src: IMG + "Weirdos_Menu.jpg" },
      { emoji: "☕", label: "Americano ₱100", src: IMG + "Americano.jpg" },
      { emoji: "🥛", label: "Caramel macchiato", src: IMG + "Caramel_Macchiato.jpg" }
    ] }
];

/* ---------- Map pins + directions (one entry per spot, same names as above) ----------
   lat, lng = where the pin goes on the map (leave them out and the map shows the whole area, no pin)
   dir      = where "Get directions" sends people (a name + address, or coordinates)
   addr     = the address shown on the page */
const MAPDATA = {
  "Aling Nena's Carinderia": {          // Jempay FoodLab  (pin coordinates still needed)
    dir: "Jempay FoodLab, 1390 Rizal, Olongapo City, 2200 Zambales",
    addr: "1390 Rizal Ave, East Tapinac, Olongapo City"
  },
  "Milk Tea Corner": {                  // Jeco's Café  (pin is approximate)
    lat: 14.831665, lng: 120.282532,
    dir: "Jeco's Café, 29 Bacon St, Olongapo City, Zambales",
    addr: "29 Bacon St, East Tapinac, Olongapo City"
  },
  "Weirdos Café": {                     // add lat, lng and the real address when you have the pin
    dir: "Weirdos Café, Olongapo City",
    addr: "Olongapo City (exact address coming soon)"
  },
  "Meryenda Hub": {                     // pin dropped on the food stall's spot
    lat: 14.831737, lng: 120.282609,
    dir: "14.831737,120.282609",
    addr: "Near E 9th St, Purok 8, East Tapinac, Olongapo City"
  }
};

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

/* ---------- Student / regular customer ---------- */
let userType = "regular";
try { userType = localStorage.getItem("tc-type") || "regular"; } catch (e) {}

/* ---------- Open now ---------- */
// For demos you can fake the time: add ?time=22:30 to the page address
function nowMinutes() {
  const fake = new URLSearchParams(location.search).get("time");
  if (fake && /^\d{1,2}:\d{2}$/.test(fake)) { const [h, m] = fake.split(":"); return +h * 60 + +m; }
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}
const toMin = t => { const [h, m] = t.split(":"); return +h * 60 + +m; };
function fmtTime(t) {
  const [h, m] = t.split(":").map(Number);
  return ((h % 12) || 12) + ":" + String(m).padStart(2, "0") + (h < 12 ? " AM" : " PM");
}
function isOpen(p) {
  const n = nowMinutes(), o = toMin(p.hours[0]), c = toMin(p.hours[1]);
  return c > o ? (n >= o && n < c) : (n >= o || n < c);   // second case = open past midnight
}
function statusText(p) {
  return isOpen(p) ? "Open now · closes " + fmtTime(p.hours[1]) : "Closed · opens " + fmtTime(p.hours[0]);
}
let onlyOpen = false;

/* ---------- Explore ---------- */
let cat = "all";

function renderExplore(animate = false) {
  const term = $("explore-q").value.trim().toLowerCase();
  const student = userType === "student";
  const shown = places.filter(p =>
    (cat === "all" || p.cat === cat) &&
    (!onlyOpen || isOpen(p)) &&
    (p.name + " " + p.cat + " " + p.area).toLowerCase().includes(term))
    .sort((a, b) => student ? (b.student - a.student) : 0);   // students see student-friendly spots first
  $("explore-list").classList.toggle("anim", animate);   // fade-up only when asked
  $("explore-list").innerHTML = shown.length ? shown.map((p, i) => `
    <article class="place" style="--i:${i}">
      <div class="art" style="background:${p.bg}">${p.thumb ? `<img class="thumb" src="${p.thumb}" alt="${p.name}">` : p.icon}
        ${student && p.student ? '<span class="badge">🎓 Student pick</span>' : ""}
        <button class="heart" data-name="${p.name}" aria-label="Favourite">${faved.has(p.name) ? "❤️" : "🤍"}</button>
      </div>
      <div class="info">
        <div>
          <h2>${p.name}</h2>
          <p>${p.cat} · ${p.price} · ${p.area}</p>
          <p class="status ${isOpen(p) ? "on" : "off"}">● ${statusText(p)}</p>
          ${student && p.student ? `<p class="deal">🎓 ${p.deal}</p>` : ""}
        </div>
        <button class="go" data-name="${p.name}">View</button>
      </div>
    </article>`).join("")
    : '<p class="empty">No spots match yet. Try another search or filter.</p>';
}

function setCategory(value) {
  cat = value;
  $("explore-chips").querySelectorAll(".chip[data-cat]").forEach(c =>
    c.setAttribute("aria-pressed", c.dataset.cat === value));
  renderExplore(true);
}

$("explore-chips").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  if (b.dataset.toggle === "open") {            // "Open now" filter on/off
    onlyOpen = !onlyOpen;
    b.setAttribute("aria-pressed", onlyOpen);
    renderExplore(true);
    return;
  }
  setCategory(b.dataset.cat);
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
      <div class="art" style="background:${p.bg}">${p.thumb ? `<img class="thumb" src="${p.thumb}" alt="${p.name}">` : p.icon}</div>
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

let spot = 0;
let pendingMap = "";
// OpenStreetMap picture for a spot (with a pin when we know the coordinates)
function mapSrc(d) {
  const base = "https://www.openstreetmap.org/export/embed.html?layer=mapnik&bbox=";
  if (d.lat == null) return base + "120.2790,14.8270,120.2890,14.8350";
  const dx = 0.002, dy = 0.0012;
  return base + [d.lng - dx, d.lat - dy, d.lng + dx, d.lat + dy].map(n => n.toFixed(6)).join(",") + "&marker=" + d.lat + "," + d.lng;
}
// Loads the map only when the Map screen is open (not while the page starts up)
function flushMap() {
  const frame = document.querySelector(".mapbox iframe");
  if (pendingMap && frame.getAttribute("src") !== pendingMap) frame.setAttribute("src", pendingMap);
}
function showSpot(i) {
  const p = places[i];
  if (!p) return;
  spot = i;
  $("map-icon").textContent = p.icon;
  $("map-name").textContent = p.name;
  $("map-cat").textContent = p.cat;
  const d = MAPDATA[p.name] || { dir: p.name + " " + p.area + " Olongapo", addr: p.area + ", Olongapo City" };
  $("map-addr").textContent = d.addr;
  $("map-price").textContent = p.price;
  $("map-hours").textContent = fmtTime(p.hours[0]) + " – " + fmtTime(p.hours[1]) + "  (" + (isOpen(p) ? "Open now" : "Closed") + ")";
  $("map-hours").style.color = isOpen(p) ? "#2e7d32" : "#c0392b";
  $("map-deal-row").hidden = !(userType === "student" && p.student);
  $("map-deal").textContent = p.deal;
  // no starting point is given, so Google uses the visitor's current location
  $("map-dir").href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d.dir);
  // move the map to the chosen spot (only reloads when the spot changes)
  pendingMap = mapSrc(d);
  if (!$("screen-map").hidden) flushMap();
  $("map-chips").querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", +c.dataset.i === i));
  // Photos: shows the real image if "src" is filled in, otherwise the emoji placeholder
  $("map-photos").innerHTML = p.photos.map((ph, i) => `
    <figure class="photo" style="background:${p.bg}; animation-delay:${(0.05 + i * 0.07).toFixed(2)}s">
      ${ph.src ? `<img src="${ph.src}" alt="${ph.label}">` : `<span>${ph.emoji}</span>`}
      <figcaption>${ph.label}</figcaption>
    </figure>`).join("");
}
$("map-chips").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (b) showSpot(+b.dataset.i);
});

/* ---------- Student / regular switching ---------- */
function setType(t) {
  userType = t;
  try { localStorage.setItem("tc-type", t); } catch (e) {}
  document.querySelectorAll(".w-pick").forEach(b => b.setAttribute("aria-pressed", b.dataset.type === t));
  $("mode-pill").textContent = t === "student" ? "🎓 Student mode · tap to switch to Regular"
                                               : "🙂 Regular mode · tap to switch to Student";
  showSpot(spot);
}
$("who").addEventListener("click", e => {
  const b = e.target.closest(".w-pick");
  if (b) setType(b.dataset.type);
});
$("mode-pill").addEventListener("click", () => {
  setType(userType === "student" ? "regular" : "student");
  renderExplore(true);
});
setType(userType);

// keep "Open now" labels fresh while the page stays open
setInterval(() => { if (current === "explore") renderExplore(); }, 60000);

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
  // Start the fade-up animations, and switch them off again after 2s so nothing can stay hidden
  document.body.classList.add("fx");
  clearTimeout(window.fxTimer);
  window.fxTimer = setTimeout(() => document.body.classList.remove("fx"), 2000);
  screens.forEach(s => { $("screen-" + s).hidden = s !== name; });
  document.body.dataset.screen = name;   // lets CSS style each screen
  $("nav").hidden = name === "welcome";
  document.querySelectorAll("#nav a").forEach(a =>
    a.classList.toggle("on", a.getAttribute("href") === "#" + name));
  if (name === "explore") renderExplore(true);
  if (name === "favourites") renderFavs(true);
  if (name === "map") flushMap();
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
setType(userType);
show(hashName());