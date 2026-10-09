/**
 * Utility helper to resolve waste item image paths and fallbacks.
 * Prevents 404 image errors and ensures consistent visual representation
 * across demo items, live AI scans, and category lookups.
 */

// Available static images in /public/images/items/
export const KNOWN_ITEM_IMAGES = {
  "plastic-bottle": "/images/items/plastic-bottle.jpg",
  "aluminum-can": "/images/items/aluminum-can.jpg",
  "banana-peel": "/images/items/banana-peel.jpg",
  "paper": "/images/items/paper.jpg",
  "glass-bottle": "/images/items/glass-bottle.jpg",
  "food-waste": "/images/items/food-waste.jpg",
  "plastic-bag": "/images/items/plastic-bag.jpg",
  "battery": "/images/items/battery.jpg",
  "cardboard": "/images/items/cardboard.jpg",
};

// Category fallback image mappings
export const CATEGORY_FALLBACK_IMAGES = {
  plastic: "/images/items/plastic-bottle.jpg",
  plastics: "/images/items/plastic-bottle.jpg",
  metal: "/images/items/aluminum-can.jpg",
  metals: "/images/items/aluminum-can.jpg",
  organic: "/images/items/banana-peel.jpg",
  organics: "/images/items/banana-peel.jpg",
  compost: "/images/items/banana-peel.jpg",
  food: "/images/items/food-waste.jpg",
  paper: "/images/items/paper.jpg",
  cardboard: "/images/items/cardboard.jpg",
  glass: "/images/items/glass-bottle.jpg",
  special: "/images/items/battery.jpg",
  ewaste: "/images/items/battery.jpg",
  hazardous: "/images/items/battery.jpg",
  "non-recyclable": "/images/items/plastic-bag.jpg",
  landfill: "/images/items/plastic-bag.jpg",
};

/**
 * Resolves the best image URL for a given waste item.
 *
 * @param {Object} item - The waste result or demo item object.
 * @param {string|null} userImage - Explicit user-uploaded or captured photo URL.
 * @returns {string|null} The resolved image URL, or null if no valid image.
 */
export function resolveWasteImage(item, userImage = null) {
  if (userImage) return userImage;
  if (!item) return null;

  // 1. Direct explicit image property
  if (item.image) return item.image;
  if (item.userImage) return item.userImage;
  if (item.scannedImageUrl) return item.scannedImageUrl;

  // 2. Direct ID lookup in known items
  const id = item.id?.toLowerCase()?.trim();
  if (id && KNOWN_ITEM_IMAGES[id]) {
    return KNOWN_ITEM_IMAGES[id];
  }

  // 3. Name alias matching (handles variations returned by Gemini Vision AI)
  const name = (item.itemName || item.name || "").toLowerCase().trim();
  if (name) {
    const slug = name.replace(/\s+/g, "-");
    if (KNOWN_ITEM_IMAGES[slug]) {
      return KNOWN_ITEM_IMAGES[slug];
    }

    // Keyword heuristics
    if (name.includes("plastic") && (name.includes("bottle") || name.includes("jug") || name.includes("cup"))) {
      return KNOWN_ITEM_IMAGES["plastic-bottle"];
    }
    if (name.includes("plastic") && (name.includes("bag") || name.includes("wrap") || name.includes("film") || name.includes("pouch"))) {
      return KNOWN_ITEM_IMAGES["plastic-bag"];
    }
    if (name.includes("can") || name.includes("tin") || name.includes("aluminum") || name.includes("aluminium") || name.includes("foil")) {
      return KNOWN_ITEM_IMAGES["aluminum-can"];
    }
    if (name.includes("banana") || name.includes("peel") || name.includes("fruit")) {
      return KNOWN_ITEM_IMAGES["banana-peel"];
    }
    if (name.includes("cardboard") || name.includes("box") || name.includes("carton")) {
      return KNOWN_ITEM_IMAGES["cardboard"];
    }
    if (name.includes("paper") || name.includes("newspaper") || name.includes("magazine") || name.includes("document")) {
      return KNOWN_ITEM_IMAGES["paper"];
    }
    if (name.includes("glass") || name.includes("jar") || name.includes("wine") || name.includes("beer")) {
      return KNOWN_ITEM_IMAGES["glass-bottle"];
    }
    if (name.includes("food") || name.includes("scrap") || name.includes("leftover") || name.includes("meal")) {
      return KNOWN_ITEM_IMAGES["food-waste"];
    }
    if (name.includes("battery") || name.includes("cell") || name.includes("electronic") || name.includes("phone")) {
      return KNOWN_ITEM_IMAGES["battery"];
    }
  }

  // 4. Category-based fallback
  const category = (item.category || "").toLowerCase().trim();
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }

  // 5. Bin-based fallback
  const bin = (item.bin || "").toLowerCase().trim();
  if (bin && CATEGORY_FALLBACK_IMAGES[bin]) {
    return CATEGORY_FALLBACK_IMAGES[bin];
  }

  return null;
}
