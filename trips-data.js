/**
 * ============================================================
 *  MOUNTAIN SLAYERS KENYA — TRIPS DATA
 *  ============================================================
 *  This file now fetches live data from Google Sheets via a
 *  Google Apps Script Web App URL.
 *
 *  ► HOW TO SWITCH TO LIVE DATA:
 *    1. Deploy the Apps Script (see apps-script.gs)
 *    2. Paste your Web App URL into SHEETS_API_URL below
 *    3. Set USE_SHEETS_API = true
 *    4. The site will now read directly from your Google Sheet!
 *
 *  ► FALLBACK:
 *    If the API call fails, the site automatically falls back
 *    to the static FALLBACK_TRIPS array below — so the site
 *    never breaks even if Sheets is temporarily unreachable.
 *
 *  ► ADDING TRIPS WITHOUT THE SHEET:
 *    Set USE_SHEETS_API = false and edit FALLBACK_TRIPS below.
 * ============================================================
 */

// ── CONFIGURATION ────────────────────────────────────────────────────────────

/**
 * Paste your Google Apps Script Web App URL here.
 * It looks like: https://script.google.com/macros/s/XXXX.../exec
 */
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycby2Eb2bdgHMUSYn2z-K4OWz7EYQfjeb_azkxn5aeLr0BzhisgXZD9sxC8a_nA-goFnf/exec";

/**
 * Set to true once you've deployed the Apps Script and pasted
 * the URL above. Set to false to use only the static fallback.
 */
const USE_SHEETS_API = true;


// ── STATIC FALLBACK DATA ─────────────────────────────────────────────────────
// This is the same data your client originally had.
// Keep this up to date as a safety net, or leave it as-is —
// the Sheet will take over once USE_SHEETS_API is true.

const FALLBACK_TRIPS = [
  {
    id: "northern-kenya",
    title: "Northern Kenya",
    category: "OVERNIGHT TRIPS",
    dates: "The Date For This Trip Will Be Announced",
    startDate: "2099-01-01",   // Far future = always shown until confirmed
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80",
    tagline: "Off the Beaten Path, Into the Wild",
    description: "Explore off-the-beaten-path adventures on a hike in northern Kenya. Traverse rugged landscapes unlike any other, discover hidden cultures, and witness wildlife in its most untouched form.",
    duration: "3 Days / 2 Nights",
    difficulty: "Moderate",
    groupSize: "10–20 People",
    price: "KES 18,500",
    highlights: ["Traverse the dramatic Mathews Range","Encounter the Samburu and Rendille communities","Sleep under a sky bursting with stars","Expert-guided night hikes and wildlife tracking"],
    whatsIncluded: ["Transport from Nairobi (return)","All meals during the trip","Professional certified guide","Camping equipment","Park entry fees"],
    whatsNotIncluded: ["Personal spending money","Travel insurance","Any items of personal nature"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "vietnam-thailand",
    title: "Vietnam & Thailand",
    category: "INTERNATIONAL TRIPS",
    dates: "Nov 1st to Nov 14th",
    startDate: "2026-11-01",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80",
    tagline: "Two Countries, One Epic Adventure",
    description: "Explore the contrasting landscapes of Southeast Asia — trek through verdant rice terraces in Sapa, then venture to the misty mountains of Chiang Mai.",
    duration: "14 Days / 13 Nights",
    difficulty: "Moderate to Challenging",
    groupSize: "10–16 People",
    price: "USD 2,800",
    highlights: ["Trek the famous Sapa rice terraces in Vietnam","Hike to Doi Inthanon — Thailand's highest peak","Explore ancient temples and local villages","Street food tours in Hanoi and Chiang Mai"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation (hotels & lodges)","All breakfasts and select dinners","All park and entry fees","Professional guide and local guides"],
    whatsNotIncluded: ["Personal shopping and souvenirs","Travel insurance (mandatory)","Visa fees","Some lunches and personal snacks"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya",
    category: "BIG MOUNTAIN TRIPS",
    dates: "October 17th to October 20th",
    startDate: "2026-10-17",
    image: "https://afar.brightspotcdn.com/dims4/default/90383d0/2147483647/strip/true/crop/728x500+36+0/resize/1320x906!/format/webp/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F52%2F27%2F75e5a780203adc8e148104996ede%2Foriginal-925782c19d188263e00bf14985b940b2.jpg",
    heroImage: "https://afar.brightspotcdn.com/dims4/default/90383d0/2147483647/strip/true/crop/728x500+36+0/resize/1320x906!/format/webp/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F52%2F27%2F75e5a780203adc8e148104996ede%2Foriginal-925782c19d188263e00bf14985b940b2.jpg",
    tagline: "Africa's Second-Highest. Completely Untamed.",
    description: "Scale the majestic heights of Mount Kenya, Africa's second-highest peak, for an epic challenge and unforgettable views.",
    duration: "4 Days / 3 Nights",
    difficulty: "Challenging",
    groupSize: "8–15 People",
    price: "KES 32,000",
    highlights: ["Summit Point Lenana at 5,199m","Traverse the stunning Naro Moru route","Experience unique high-altitude ecosystems","Sunrise above the clouds on summit day"],
    whatsIncluded: ["Transport from Nairobi (return)","All meals on the mountain","Professional certified mountain guide","Park entry fees and rescue fund","Camping/hut accommodation"],
    whatsNotIncluded: ["Personal gear (boots, hiking poles, etc.)","Travel insurance","Personal medication","Tips for guides and porters"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "cape-town",
    title: "South Africa Cape Town",
    category: "INTERNATIONAL TRIPS",
    dates: "September 24th to September 29th",
    startDate: "2026-09-24",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1920&q=80",
    tagline: "Where Mountains Meet the Ocean",
    description: "Hike Cape Town's iconic peaks for breathtaking views and diverse challenges. From the legendary Table Mountain to Lion's Head at sunset.",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    groupSize: "10–20 People",
    price: "USD 1,600",
    highlights: ["Hike Table Mountain via Platteklip Gorge","Conquer Lion's Head for a 360° sunset view","Explore the Cape Peninsula and Cape Point","Visit Boulders Beach to meet the penguins!"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation","Daily breakfast","Airport transfers","Professional guide"],
    whatsNotIncluded: ["Personal meals (lunches & dinners)","Travel insurance (mandatory)","Visa fees if applicable","Table Mountain cableway (optional)"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "drakensburg",
    title: "Lesotho & South Africa Drackensburg",
    category: "INTERNATIONAL TRIPS",
    dates: "September 20th to September 24th",
    startDate: "2026-09-20",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1920&q=80",
    tagline: "The Kingdom in the Sky",
    description: "Hike Lesotho, the 'Kingdom in the Sky'. Challenge yourself on soaring trails with dramatic mountain backdrops, ancient San rock art, and the warmth of the Basotho people.",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate to Challenging",
    groupSize: "10–18 People",
    price: "USD 1,400",
    highlights: ["Trek the legendary Drakensberg escarpment","Visit ancient San Bushman rock paintings","Ride horses with Basotho herdsmen","Cross into Lesotho — Africa's mountain kingdom"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation","All meals during trek days","Professional guide","All park and entry fees"],
    whatsNotIncluded: ["Personal spending money","Travel insurance","Visa fees","Personal hiking gear"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "tanzania-meru",
    title: "Tanzania Mount Meru",
    category: "BIG MOUNTAIN TRIPS",
    dates: "September 9th",
    startDate: "2026-09-09",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80",
    tagline: "Kilimanjaro's Fierce Little Sister",
    description: "Tackle the challenge of Mount Meru, Tanzania's second-highest peak! Hike alongside diverse landscapes, conquer the dramatic crater rim.",
    duration: "4 Days / 3 Nights",
    difficulty: "Challenging",
    groupSize: "8–14 People",
    price: "USD 980",
    highlights: ["Summit Socialist Peak at 4,566m","Incredible views of Mount Kilimanjaro","Game viewing on the mountain slopes","Dramatic volcanic crater scenery"],
    whatsIncluded: ["Return flights from Nairobi","All park and conservation fees","Professional mountain guide","All meals on the mountain","Accommodation in mountain huts"],
    whatsNotIncluded: ["Personal gear and clothing","Travel insurance","Tips","Personal snacks"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "portugal",
    title: "Portugal",
    category: "INTERNATIONAL TRIPS",
    dates: "August 6th to August 13th",
    startDate: "2026-08-06",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1920&q=80",
    tagline: "Ancient Trails, Atlantic Views",
    description: "Hike Portugal's diverse landscapes, from dramatic mountains to charming villages. Explore hidden gems, savor delicious cuisine, and experience the warmth of Portuguese culture.",
    duration: "8 Days / 7 Nights",
    difficulty: "Easy to Moderate",
    groupSize: "10–20 People",
    price: "USD 2,200",
    highlights: ["Hike the iconic Rota Vicentina coastal trail","Explore the Douro Valley vineyards","Visit Sintra's fairy-tale palaces and hills","Sample pastel de nata and local wines"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation","Daily breakfast","Professional guide","Airport transfers"],
    whatsNotIncluded: ["Most lunches and dinners","Travel insurance","Personal shopping","Optional excursions"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "mont-blanc",
    title: "France and Switzerland Mt Blanc",
    category: "INTERNATIONAL TRIPS",
    dates: "July 31st to August 9th",
    startDate: "2026-07-31",
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1920&q=80",
    tagline: "Europe's Roof. Africa's Finest Climbers.",
    description: "Mont Blanc is the highest mountain in Western Europe at 4,810m. The Tour du Mont Blanc crosses three countries in pure alpine majesty.",
    duration: "10 Days / 9 Nights",
    difficulty: "Very Challenging",
    groupSize: "8–12 People",
    price: "USD 3,800",
    highlights: ["Trek sections of the legendary Tour du Mont Blanc","Cross between France, Switzerland, and Italy","Glaciers, moraines, and 4,000m+ alpine passes","Chamonix — the adventure capital of the world"],
    whatsIncluded: ["Return flights from Nairobi","All mountain hut and hotel accommodation","Daily breakfast and select dinners","IFMGA-certified mountain guide","Cable car and chairlift passes"],
    whatsNotIncluded: ["Personal alpine gear (boots, crampons, ice axe)","Travel insurance (mandatory — mountain rescue)","Some meals","Visa fees"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "uganda-gorilla",
    title: "Uganda Gorilla Tracking",
    category: "INTERNATIONAL TRIPS",
    dates: "July 2nd to July 11th",
    startDate: "2026-07-02",
    image: "https://www.bwindiforestnationalpark.com/wp-content/uploads/2008/07/gorillas-gorilla.jpg",
    heroImage: "https://www.bwindiforestnationalpark.com/wp-content/uploads/2008/07/gorillas-gorilla.jpg",
    tagline: "Face to Face with Our Ancestors",
    description: "Track gorillas in Uganda's lush rainforests, coming face-to-face with mountain gorilla families in their natural habitat.",
    duration: "10 Days / 9 Nights",
    difficulty: "Moderate (jungle terrain)",
    groupSize: "8–16 People",
    price: "USD 3,200",
    highlights: ["Gorilla tracking permit in Bwindi Impenetrable Forest","Chimpanzee tracking in Kibale Forest","Game drives in Queen Elizabeth National Park","Boat safari on the Kazinga Channel"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation (lodges)","Gorilla and chimpanzee tracking permits","All meals","Professional guide"],
    whatsNotIncluded: ["Personal spending money","Travel insurance","Tips","Uganda visa fees"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "peru-machu-picchu",
    title: "Peru Machu Pic-chu",
    category: "INTERNATIONAL TRIPS",
    dates: "June 15th to June 28th",
    startDate: "2026-06-15",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1920&q=80",
    tagline: "The Lost City. Found.",
    description: "Hike alongside the ancient Inca Trail, acclimatise in the Sacred Valley, and arrive at the Sun Gate to witness Machu Picchu emerge from the morning mist.",
    duration: "14 Days / 13 Nights",
    difficulty: "Challenging",
    groupSize: "8–16 People",
    price: "USD 3,500",
    highlights: ["Trek the legendary 4-day Classic Inca Trail","Arrive at the Sun Gate at sunrise","Explore the Sacred Valley and Cusco","Acclimatization day in the Andes"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation","Inca Trail permit","All meals on trek","Professional guide"],
    whatsNotIncluded: ["Personal gear","Travel insurance","Visa fees","Personal spending"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "kenya-lolldaiga",
    title: "Kenya Lolldaiga",
    category: "OVERNIGHT TRIPS",
    dates: "May 31 to June 2nd",
    startDate: "2026-05-31",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80",
    tagline: "Kenya's Best-Kept Secret",
    description: "Scale the majestic heights of Mount Kenya's lesser-known wilderness area, Lolldaiga Hills — conservancy land teeming with wildlife.",
    duration: "3 Days / 2 Nights",
    difficulty: "Moderate",
    groupSize: "10–20 People",
    price: "KES 15,000",
    highlights: ["Hike through the private Lolldaiga Conservancy","Wildlife sightings on foot","Stunning views of Mount Kenya","Campfire evenings under African skies"],
    whatsIncluded: ["Transport from Nairobi (return)","All meals","Camping equipment","Conservancy fees","Professional guide"],
    whatsNotIncluded: ["Personal gear","Personal spending","Travel insurance"],
    bookingLink: "https://wa.me/254722957390"
  },
  {
    id: "morocco-toubkal",
    title: "Morocco Mount Toubkal",
    category: "BIG MOUNTAIN TRIPS",
    dates: "July 5th–16th",
    startDate: "2026-07-05",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1920&q=80",
    tagline: "Africa's North. Africa's Highest Atlas.",
    description: "Conquer Jebel Toubkal, Morocco's highest peak, with stunning views and a rich cultural backdrop. Then descend into the magical medina of Marrakech.",
    duration: "12 Days / 11 Nights",
    difficulty: "Challenging",
    groupSize: "8–16 People",
    price: "USD 2,600",
    highlights: ["Summit Jebel Toubkal at 4,167m","Trek through Berber villages in the High Atlas","Explore the souks and riads of Marrakech","Traditional tagine and mint tea experiences"],
    whatsIncluded: ["Return flights from Nairobi","All accommodation","All meals on trek","Berber guide and mountain guide","Marrakech city tour"],
    whatsNotIncluded: ["Personal spending (souvenirs, hammam, etc.)","Travel insurance","Visa fees","Personal gear"],
    bookingLink: "https://wa.me/254722957390"
  }
];


// ═══════════════════════════════════════════════════════════════════════════
//  ENGINE — Do not edit below this line unless you know what you're doing
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Filters out trips whose startDate has already passed.
 * Trips with startDate "2099-01-01" (TBA) are always shown.
 */
function filterUpcoming(trips) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return trips.filter(trip => {
    if (!trip.startDate) return true; // No date = always show
    const start = new Date(trip.startDate);
    return start >= today;
  });
}

/**
 * Global state — pages use window.MSL_TRIPS after this file loads.
 * Async if fetching from Sheets, synchronous if using fallback.
 */
window.MSL_TRIPS = [];
window.MSL_READY = false;

// Callbacks registered before data is ready
const _mslReadyCallbacks = [];

/**
 * onTripsReady(fn) — call this instead of DOMContentLoaded
 * when your page needs trip data. Works whether data comes from
 * Sheets (async) or the static fallback (sync).
 *
 * Usage:
 *   onTripsReady(function(trips) {
 *     renderCards(trips);
 *   });
 */
function onTripsReady(fn) {
  if (window.MSL_READY) {
    fn(window.MSL_TRIPS);
  } else {
    _mslReadyCallbacks.push(fn);
  }
}

function _mslDispatch(trips) {
  window.MSL_TRIPS = trips;
  window.MSL_READY = true;
  // Also expose as the old global for backwards compatibility
  window.MOUNTAIN_SLAYERS_TRIPS = trips;
  _mslReadyCallbacks.forEach(fn => fn(trips));
}

function _mslUseFallback(reason) {
  if (reason) console.warn('[MSL] Falling back to static data:', reason);
  _mslDispatch(filterUpcoming(FALLBACK_TRIPS));
}

// ── Fetch from Sheets or use fallback ────────────────────────────────────────
if (USE_SHEETS_API && SHEETS_API_URL && SHEETS_API_URL !== 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
  fetch(SHEETS_API_URL)
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(data) {
      if (data.status !== 'ok' || !Array.isArray(data.trips)) {
        throw new Error('Unexpected API response: ' + JSON.stringify(data));
      }
      console.log('[MSL] Loaded ' + data.trips.length + ' trips from Google Sheets.');
      _mslDispatch(filterUpcoming(data.trips));
    })
    .catch(function(err) {
      _mslUseFallback(err.message);
    });
} else {
  // Synchronous — data is ready immediately
  _mslUseFallback(USE_SHEETS_API ? 'API URL not configured' : null);
}

// ── Helper used by index.html slot builder ───────────────────────────────────
function getUpcomingByCategory(category, count) {
  count = count || Infinity;
  return window.MSL_TRIPS
    .filter(function(t) { return t.category === category; })
    .sort(function(a, b) { return new Date(a.startDate) - new Date(b.startDate); })
    .slice(0, count);
}