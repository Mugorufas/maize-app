export const INITIAL_GUIDES = {
  planting: {
    heroTitle: "Maize Planting Guide",
    heroSubtitle: "Complete guide to timing, varieties, and precision planting.",
    cards: [
      { id: "best-time", title: "Best Time to Plant", imageKey: "best-time" },
      { id: "varieties", title: "Choosing Maize Varieties", imageKey: "varieties" },
      { id: "land-prep", title: "Land Preparation & Spacing", imageKey: "land-prep" },
      { id: "planting-methods", title: "Planting Methods", imageKey: "methods" }
    ],
    sections: [
      {
        id: "best-time",
        title: "Best Time to Plant",
        items: [
          { label: "Ideal Soil Temperature", text: "Plant when soil reaches 8°C–10°C for several consecutive days. Never sow into cold soil as it prevents germination." },
          { label: "Why Timing Matters", text: "Warm soil guarantees uniform germination and shields seeds from rot caused by cold, waterlogged conditions." },
          { label: "How to Check Readiness", text: "Use a soil thermometer at 5–10 cm depth and wait for the rains to establish steady soil moisture before sowing." },
          { label: "Best Field Location", text: "Prioritize well-drained loamy fields and avoid low-lying depressions prone to early-season waterlogging." },
          { label: "Aligning With Rainfall", text: "Match your planting window to your region's peak rainfall season to maximize moisture during the critical grain fill stage." }
        ],
        explanation: "Successful maize cultivation relies on precise timing. Planting too early into cold soil can lead to poor, uneven emergence and increased susceptibility to soil-borne pests. Conversely, planting too late may subject the crop to heat stress during critical reproductive stages."
      },
      {
        id: "varieties",
        title: "Choosing Maize Varieties",
        items: [
          { label: "Types of Varieties", text: "Choose between hybrid, open-pollinated (OPV), or specialty types. Hybrids offer higher yields while OPVs allow seed saving." },
          { label: "Why Variety Selection Is Critical", text: "Your choice directly determines yield potential, disease resistance, and how well the crop adapts to your local environment." },
          { label: "How to Make the Right Choice", text: "Evaluate your local rainfall pattern, altitude, and intended market before approaching any certified seed dealer." },
          { label: "When to Purchase Seeds", text: "Buy from certified dealers well before the planting season begins to guarantee availability, viability, and quality." },
          { label: "Matching Altitude & Climate", text: "High-altitude farms need cold-tolerant, late-maturing varieties; lowland farms perform best with early-maturing, drought-tolerant types." }
        ],
        explanation: "Variety selection is the foundation of your harvest. Late-maturing hybrids typically offer higher yields but require more water over a longer period. Early-maturing varieties are safer for regions with shorter rainy seasons."
      },
      {
        id: "land-prep",
        title: "Land Preparation & Spacing",
        items: [
          { label: "Tillage Depth & Technique", text: "Till to 20–30 cm to break hardpans, loosen the soil, and fully work in compost or organic matter before sowing." },
          { label: "Benefits of Deep Tillage", text: "A well-tilled soil improves root aeration and water infiltration, allowing seedlings to emerge quickly and establish strongly." },
          { label: "Preparation Timeline", text: "Complete all land preparation 2–4 weeks before planting so the soil can settle and organic matter can begin breaking down into nutrients." },
          { label: "Levelling & Erosion Control", text: "Keep the seedbed surface level and correct any slope to prevent soil erosion and nutrient loss during irrigation or heavy rainfall." },
          { label: "Correct Row Spacing", text: "Space rows 60–90 cm apart and plants 15–25 cm within rows for the optimal planting density." }
        ],
        explanation: "A uniform seedbed is critical. Soil pH should ideally be between 5.8 and 7.0 for optimal nutrient uptake. Accurate spacing ensures every plant has access to its own vertical tunnel of sunlight and root zone."
      },
      {
        id: "planting-methods",
        title: "Planting Methods",
        items: [
          { label: "Planting Depth & Tools", text: "Use a precision planter or dibbling stick to maintain a consistent seed depth of 4–7 cm across the entire field." },
          { label: "Why Uniform Depth Matters", text: "Consistent depth produces 'synchronous emergence' so all plants rise together and compete equally for light, water, and nutrients." },
          { label: "Optimal Planting Moment", text: "Sow immediately after soil preparation while moisture is at its peak — ideally at the very start of the seasonal rains." },
          { label: "Seeding Method Options", text: "Direct seeding is standard, but zero-tillage planting is increasingly popular for conserving soil moisture and reducing erosion." },
          { label: "Correct Seed Placement", text: "Always place seeds in the moist soil layer, never in dry topsoil — seeds sitting above the moisture zone will simply fail to germinate." }
        ],
        explanation: "Precision is the key difference between a good crop and a great one. Mechanical planting at a steady speed ensures equidistant spacing, which simplifies future tasks like weeding and harvesting."
      }
    ]
  },
  care: {
    heroTitle: "Maize Crop Care & Maintenance",
    heroSubtitle: "Optimize your harvest with professional management during the critical growth phases.",
    steps: [
      { id: "watering", title: "Watering & Irrigation", description: "Managing moisture for peak yield.", imageKey: "watering", accent: "mint" },
      { id: "fertilizer", title: "Fertilizer Application", description: "Fueling growth with nutrients.", imageKey: "fertilizer", accent: "gold" },
      { id: "weeding", title: "Weed Control", description: "Protecting resources from competition.", imageKey: "weeding", accent: "mint" }
    ],
    sections: [
      {
        id: "watering",
        badge: "Watering & Irrigation",
        title: "How to Master Moisture Control",
        items: [
          { label: "Most Critical Growth Stage", text: "Tasseling and silking are the peak water-demand period. Drought stress here alone can reduce your yield by up to 50%." },
          { label: "Why Maize Is Water-Sensitive", text: "Maize relies on turgor pressure for silk elongation and successful pollination, making it highly vulnerable to any water shortage." },
          { label: "Recommended Irrigation Method", text: "Drip or furrow irrigation delivers water directly to the root zone. Avoid overhead sprinklers during tasseling." },
          { label: "Effective Root Zone Depth", text: "Target the 30–60 cm soil depth where the plant performs 70% of its water and nutrient uptake activity." },
          { label: "Drought-Proofing Strategy", text: "In dry regions, pair drought-tolerant seed varieties with surface mulching to maximize moisture retention." }
        ],
        expertTip: "Professional Tip: Check soil moisture by 'balling' soil in your hand. If it crumbles easily, it's time to irrigate."
      },
      {
        id: "fertilizer",
        badge: "Fertilizer Application",
        title: "Maximizing Nutrient Efficiency",
        items: [
          { label: "Best Fertilizer at Planting", text: "Use a balanced NPK (e.g., 20:10:10) as a basal dressing and follow with nitrogen-rich CAN or Urea for topdressing." },
          { label: "Optimal Topdressing Timing", text: "Apply topdress at the V6 (knee-high) stage, around 4–6 weeks after emergence, when demand accelerates sharply." },
          { label: "Role of Each Nutrient", text: "Nitrogen drives leaf area and grain protein. Phosphorus establishes strong roots and cob formation." },
          { label: "Safe Application Method", text: "Ring or band fertilizer 5–10 cm from the stem base to avoid burning. Always incorporate Urea into moist soil." },
          { label: "Application on Sloped Fields", text: "On inclined plots, apply fertilizer on the uphill side so rainfall moves nutrients toward the root zone." }
        ],
        expertTip: "Professional Tip: Yellowing of lower leaves (V-shaped) usually indicates a Nitrogen deficiency."
      },
      {
        id: "weeding",
        badge: "Weed Control",
        title: "The Fight for Resources",
        items: [
          { label: "First Weeding Window", text: "Begin weeding within 2–3 weeks of crop emergence when weeds are still small and plants are at most vulnerable." },
          { label: "Yield Loss From Weeds", text: "Striga weed alone can steal up to 80% of soil nutrients. Weeds also shelter pests and block light." },
          { label: "Manual vs. Chemical Control", text: "Use mechanical hoeing on small plots. On larger farms, apply pre- and post-emergence herbicides." },
          { label: "Natural Weed Suppression", text: "Once the canopy closes around the V10 stage, natural shading suppresses further weed germination." },
          { label: "Managing Parasitic Weeds", text: "For Striga infestations, apply the 'Push-Pull' intercropping technique or use resistant varieties." }
        ],
        expertTip: "Professional Tip: Avoid weeding during flowering as soil disturbance can disturb delicate root activity."
      }
    ]
  },
  harvest: {
    heroTitle: "Maize Harvesting Guide",
    heroSubtitle: "Turn your hard work into a high-quality yield with professional harvesting and storage.",
    steps: [
      { id: "timing", title: "Timing & Maturity", description: "Identifying the perfect window for maximum grain quality.", imageKey: "timing", accent: "gold" },
      { id: "methods", title: "Harvesting Methods", description: "Precision manual and mechanical techniques.", imageKey: "methods", accent: "mint" },
      { id: "storage", title: "Handling & Storage", description: "Ensuring long-term safety and quality preservation.", imageKey: "storage", accent: "gold" }
    ],
    sections: [
      {
        id: "timing",
        badge: "Timing & Maturity",
        title: "How to Identify Physiological Maturity",
        items: [
          { label: "Black Layer Formation", text: "Watch for the black layer at the kernel base — it signals the plant has stopped sending nutrients to the grain." },
          { label: "Risk of Wrong Timing", text: "Early harvest yields shrivelled grains; late harvest exposes crop to lodging, pests, and mold." },
          { label: "Visual Maturity Signs", text: "Look for drooping cobs and dry, brown husks. Kernels should be rock hard and impossible to dent." },
          { label: "Field Sampling Before Harvest", text: "Test cobs from several locations to confirm uniform maturity before large-scale harvesting." },
          { label: "Moisture Targets by Use", text: "Harvest silage at 30–35% moisture. For dry storage, target 20–25% at field harvest." }
        ],
        expertTip: "Professional Tip: Grain moisture content at physiological maturity is typically 30–35%."
      },
      {
        id: "methods",
        badge: "Harvesting Methods",
        title: "Precision Manual and Mechanical Tools",
        items: [
          { label: "Manual Harvesting Technique", text: "Pull cobs firmly downward and snap from the stalk. Calibrate combine settings to reduce cracking." },
          { label: "Danger of Poor Machine Settings", text: "Cracked grain surfaces act as entry points for mold and insects during storage." },
          { label: "Ideal Field Moisture for Machines", text: "Begin mechanical operations when field moisture is below 25% to prevent soil compaction." },
          { label: "Tools for Stalk Harvesting", text: "Use sharp sickles or machetes when collecting stalks alongside cobs for animal fodder." },
          { label: "Systematic Field Movement", text: "Always start at one end and work in a consistent direction to avoid trampling unharvested rows." }
        ],
        expertTip: "Professional Tip: If harvesting manually, use a 'cobbing' tool to speed up the process."
      },
      {
        id: "storage",
        badge: "Handling & Storage",
        title: "Ensuring Long-Term Safety",
        items: [
          { label: "Safe Storage Moisture Level", text: "Grain must reach 13–14% moisture or below. Higher levels lead to aflatoxin and spoilage." },
          { label: "Aflatoxin Health Risk", text: "Aspergillus fungi thrive in damp grain and produce aflatoxins dangerous to human health." },
          { label: "Correct Drying Practice", text: "Spread grain on tarpaulins, never on bare ground. Move to airtight hermetic bins for storage." },
          { label: "Pre-Harvest Storage Prep", text: "Clean and disinfect storage structures 2–4 weeks before harvest to eliminate pests." },
          { label: "Preventing Floor Moisture", text: "Always place bags on wooden pallets to block ground dampness. Store in cool, shaded areas." }
        ],
        expertTip: "Professional Tip: Perform a 'salt test' in a jar to check if grain is dry enough if you lack a meter."
      }
    ]
  },
  pests: {
    heroTitle: "Maize Pest & Disease Defense",
    heroSubtitle: "Implement a professional 'Crop Defense' strategy to protect your yields from evolving threats.",
    steps: [
      { id: "pests", title: "Common Pests", description: "Managing Fall Armyworm and other major threats.", imageKey: "pests", accent: "alert" },
      { id: "diseases", title: "Common Diseases", description: "Identifying and treating Northern Leaf Blight and Rot.", imageKey: "diseases", accent: "caution" },
      { id: "ipm", title: "Integrated Pest Management", description: "A proactive 'Crop Defense' strategy for long-term health.", imageKey: "ipm", accent: "safe" }
    ],
    sections: [
      {
        id: "pests",
        badge: "Common Pests",
        title: "Fall Armyworm & Stem Borers Strategy",
        items: [
          { label: "Early Scouting Protocol", text: "Start scouting from seedling emergence. Check leaf undersides for egg masses and whorls for larvae." },
          { label: "Speed of Crop Damage", text: "Fall Armyworm can strip a plant's entire leaf area within days, causing total crop failure." },
          { label: "Treatment Application Method", text: "Apply Neem-based bio-pesticides or approved insecticides directly into the plant whorl." },
          { label: "Targeting the Larval Hiding Zone", text: "Larvae hide deep inside the whorl. Treatment must be poured inside the funnel to reach them." },
          { label: "Preventing Chemical Resistance", text: "Rotate between different insecticide groups. Supplement with biological agents like Telenomus wasps." }
        ],
        expertTip: "Defense Tip: Deep ploughing before planting exposes pest pupae to the sun and predators."
      },
      {
        id: "diseases",
        badge: "Common Diseases",
        title: "Northern Leaf Blight & Rot Management",
        items: [
          { label: "Identifying Northern Leaf Blight", text: "Look for long, tan, canoe-shaped lesions that start on lower leaves and progress upward." },
          { label: "Conditions That Favour Disease", text: "High humidity and warm nighttime temperatures create ideal conditions for fungal spread." },
          { label: "Breaking the Disease Cycle", text: "Rotate with non-cereal crops like soybeans to starve fungal spores of their host plant." },
          { label: "Highest-Risk Growth Window", text: "Scout weekly from V10 through to silking — when damage to leaf area causes most damage." },
          { label: "The Ear Leaf Indicator", text: "Monitor the ear leaf closely — if it stays green through silking, grain fill will likely be successful." }
        ],
        expertTip: "Defense Tip: Northern Leaf Blight spores survive on old maize residue. Removing infected stalks is crucial."
      },
      {
        id: "ipm",
        badge: "Integrated Pest Management (IPM)",
        title: "Proactive Crop Defense",
        items: [
          { label: "The Four Pillars of IPM", text: "IPM integrates cultural, mechanical, biological, and chemical controls. Healthy soil is the foundation." },
          { label: "Why Not to Rely on Chemicals", text: "Chemical-only approaches breed resistance and harm beneficial insects. A diverse strategy is better." },
          { label: "IPM as a Season-Long System", text: "Implementation starts before land preparation and runs continuously through harvest." },
          { label: "Field Border Trap Crops", text: "Plant sacrificial crops around the perimeter to attract and concentrate pests away from maize." },
          { label: "Push-Pull Technology", text: "Intercrop Desmodium (pushes pests) and plant Napier Grass on borders (pulls them) for control." }
        ],
        expertTip: "Defense Tip: Maintaining balanced fertilization ensures plants have the strength to outgrow minor damage."
      }
    ]
  }
};
