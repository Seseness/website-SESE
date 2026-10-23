/* SESE products - canonical names + copy. All 9 SKUs. */
window.SESE_PRODUCTS = [
  {
    id: "cleansing-foam", name: "Cleansing Foam", step: "01 · Cleanse",
    benefit: "Gentle gel-to-foam that removes the day without stripping.",
    use: "Morning & evening · all skin types", price: "€26",
    img: "../../assets/products/cleansing-foam-front-alt.jpg",
    studio: "../../assets/products/cleansing-foam-tiles.jpg",
    color: "#C5DAEA"
  },
  {
    id: "hydrating-toner", name: "Hydrating Toner", step: "02 · Tone",
    benefit: "A weightless mist that preps skin to drink up what comes next.",
    use: "Morning & evening · all skin types", price: "€28",
    img: "../../assets/products/hydrating-toner-front-alt.jpg",
    studio: "../../assets/products/hydrating-toner-studio.jpg",
    color: "#C9D7C9"
  },
  {
    id: "vitamin-c-serum", name: "Vitamin C Serum", step: "03 · Treat · AM",
    benefit: "Brightens and evens the morning skin tone.",
    use: "Morning · all skin types", price: "€44",
    img: "../../assets/products/vitamin-c-serum-front-alt.jpg",
    studio: "../../assets/products/vitamin-c-serum-studio.jpg",
    color: "#F4C9A8"
  },
  {
    id: "peptide-serum", name: "Peptide Serum", step: "03 · Treat · AM/PM",
    benefit: "Firms and improves skin elasticity.",
    use: "Morning or evening · all skin types", price: "€48",
    img: "../../assets/products/peptide-serum-front.jpg",
    studio: "../../assets/products/peptide-serum-studio.jpg",
    color: "#E9B7A8"
  },
  {
    id: "retinol-alt-serum", name: "Retinol Alternative Serum", step: "03 · Treat · PM",
    benefit: "Smooths fine lines, gentle on sensitive skin.",
    use: "Evening · sensitive welcome", price: "€48",
    img: "../../assets/products/retinol-alt-serum-front.jpg",
    studio: "../../assets/products/retinol-alt-serum-front-alt.jpg",
    color: "#D8A48F"
  },
  {
    id: "firming-day-cream", name: "Firming Day Cream", step: "04 · Moisturise · AM",
    benefit: "Light, breathable hydration with a soft plumping finish.",
    use: "Morning · normal to dry", price: "€42",
    img: "../../assets/products/firming-day-cream-front.jpg",
    studio: "../../assets/products/firming-day-cream-studio.jpg",
    color: "#E9B7A8"
  },
  {
    id: "ceramide-night-cream", name: "Ceramide Repair Night Cream", step: "04 · Moisturise · PM",
    benefit: "Restores the moisture barrier overnight.",
    use: "Evening · dry & mature welcome", price: "€44",
    img: "../../assets/products/ceramide-night-cream-front-alt.jpg",
    studio: "../../assets/products/ceramide-night-cream-studio.jpg",
    color: "#EFDFC2"
  },
  {
    id: "smoothing-eye-cream", name: "Smoothing Eye Cream", step: "Targeted care",
    benefit: "Cools, brightens and softens the line around the eye.",
    use: "Morning & evening · all skin types", price: "€36",
    img: "../../assets/products/smoothing-eye-cream-front.jpg",
    studio: "../../assets/products/smoothing-eye-cream-studio.jpg",
    color: "#C9D7C9"
  },
  {
    id: "spf50-stick", name: "SPF 50 Sunscreen Stick", step: "05 · Protect",
    benefit: "Mineral-blend daily defence in a pocket-sized stick.",
    use: "Every morning · everywhere outdoors", price: "€32",
    img: "../../assets/products/spf50-stick-front.jpg",
    studio: "../../assets/products/spf50-stick-tiles.jpg",
    color: "#E8D5B0"
  }
];

window.SESE_ROUTINES = [
  { id: "starter", name: "Starter Routine Bundle", desc: "Begin where it matters - five steps, one box.", price: "€168", saved: "Save €18", products: [0,1,3,5,8] },
  { id: "day", name: "Day Routine", desc: "Glow, protect, go.", price: "€176", products: [0,1,2,5,8] },
  { id: "night", name: "Night Routine", desc: "While you sleep, your skin remembers.", price: "€184", products: [0,1,4,7,6] }
];
