/*
 * NEXORA UNIVERSAL TEXTBOOK VISUAL ENGINE
 *
 * Purpose:
 * Identify chapter concepts that benefit from a textbook-style
 * educational visual and emit a semantic visual marker.
 *
 * The renderer should create an ORIGINAL educational diagram,
 * not copy a copyrighted textbook image.
 */

function norm(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

const VISUAL_RULES = [
  {
    keys: ["solar system", "सौरमंडल", "planets", "ग्रह"],
    marker: "[[NEXORA_DIAGRAM:solar-system]]",
    description: "Labelled Solar System showing Sun and planets in correct order."
  },
  {
    keys: ["rotation", "revolution", "motions of the earth", "घूर्णन", "परिक्रमण"],
    marker: "[[NEXORA_DIAGRAM:earth-motions]]",
    description: "Earth rotation and revolution diagram with axis, orbit and arrows."
  },
  {
    keys: ["latitude", "longitude", "अक्षांश", "देशांतर"],
    marker: "[[NEXORA_DIAGRAM:latitude-longitude]]",
    description: "Globe showing Equator, latitude, longitude and poles."
  },
  {
    keys: ["layers of the earth", "inside our earth", "पृथ्वी के अंदर", "earth interior"],
    marker: "[[NEXORA_DIAGRAM:earth-layers]]",
    description: "Labelled Earth interior showing crust, mantle and core."
  },
  {
    keys: ["water cycle", "hydrological cycle", "जल चक्र"],
    marker: "[[NEXORA_DIAGRAM:water-cycle]]",
    description: "Water cycle with evaporation, condensation, precipitation, runoff and collection."
  },
  {
    keys: ["rock cycle", "चट्टान चक्र"],
    marker: "[[NEXORA_DIAGRAM:rock-cycle]]",
    description: "Rock cycle showing igneous, sedimentary and metamorphic processes."
  },
  {
    keys: ["food chain", "food web", "खाद्य श्रृंखला", "खाद्य जाल"],
    marker: "[[NEXORA_DIAGRAM:food-chain]]",
    description: "Labelled food chain/web with arrows showing energy flow."
  },
  {
    keys: ["photosynthesis", "प्रकाश संश्लेषण"],
    marker: "[[NEXORA_DIAGRAM:photosynthesis]]",
    description: "Photosynthesis diagram showing sunlight, carbon dioxide, water, glucose and oxygen."
  },
  {
    keys: ["cell", "कोशिका"],
    marker: "[[NEXORA_DIAGRAM:cell]]",
    description: "Labelled biological cell diagram with major structures."
  },
  {
    keys: ["human heart", "heart", "मानव हृदय", "हृदय"],
    marker: "[[NEXORA_DIAGRAM:heart]]",
    description: "Simplified labelled heart with chambers and blood-flow arrows."
  },
  {
    keys: ["digestive system", "पाचन तंत्र"],
    marker: "[[NEXORA_DIAGRAM:digestive-system]]",
    description: "Labelled human digestive system."
  },
  {
    keys: ["respiratory system", "श्वसन तंत्र"],
    marker: "[[NEXORA_DIAGRAM:respiratory-system]]",
    description: "Labelled respiratory system showing lungs and airway."
  },
  {
    keys: ["circulatory system", "रक्त परिसंचरण"],
    marker: "[[NEXORA_DIAGRAM:circulatory-system]]",
    description: "Circulatory system with simplified blood-flow pathway."
  },
  {
    keys: ["waterfall", "river", "river system", "नदी", "जलप्रपात"],
    marker: "[[NEXORA_DIAGRAM:river-system]]",
    description: "Educational river/river-system diagram with source, tributaries, channel and mouth."
  },
  {
    keys: ["volcano", "ज्वालामुखी"],
    marker: "[[NEXORA_DIAGRAM:volcano]]",
    description: "Labelled volcano cross-section."
  },
  {
    keys: ["waterfall", "meander", "delta", "डेल्टा", "meander"],
    marker: "[[NEXORA_DIAGRAM:river-landforms]]",
    description: "River landform diagram showing meander, erosion, deposition and delta."
  },
  {
    keys: ["layers of atmosphere", "atmosphere", "वायुमंडल"],
    marker: "[[NEXORA_DIAGRAM:atmosphere-layers]]",
    description: "Atmospheric layers arranged vertically with labels."
  },
  {
    keys: ["rock", "rocks", "igneous", "sedimentary", "metamorphic", "आग्नेय", "अवसादी", "रूपांतरित"],
    marker: "[[NEXORA_DIAGRAM:rock-types]]",
    description: "Three major rock types with formation pathways."
  },
  {
    keys: ["electric circuit", "circuit", "विद्युत परिपथ"],
    marker: "[[NEXORA_DIAGRAM:electric-circuit]]",
    description: "Simple labelled electric circuit using standard educational symbols."
  },
  {
    keys: ["reflection", "refraction", "परावर्तन", "अपवर्तन"],
    marker: "[[NEXORA_DIAGRAM:light-rays]]",
    description: "Ray diagram showing incident, reflected/refracted rays and normals."
  },
  {
    keys: ["force", "motion", "बल", "गति"],
    marker: "[[NEXORA_DIAGRAM:force-motion]]",
    description: "Force and motion vector diagram with labelled directions."
  },
  {
    keys: ["atom", "molecule", "परमाणु", "अणु"],
    marker: "[[NEXORA_DIAGRAM:atomic-structure]]",
    description: "Simplified educational atomic structure diagram."
  },
  {
    keys: ["chemical reaction", "रासायनिक अभिक्रिया"],
    marker: "[[NEXORA_DIAGRAM:chemical-reaction]]",
    description: "Reactants-to-products process diagram with arrows."
  },
  {
    keys: ["quadrilateral", "triangle", "circle", "geometry", "त्रिभुज", "चतुर्भुज", "वृत्त"],
    marker: "[[NEXORA_DIAGRAM:geometry-figure]]",
    description: "Clean labelled mathematical geometry figure relevant to the chapter."
  },
  {
    keys: ["life cycle", "जीवन चक्र"],
    marker: "[[NEXORA_DIAGRAM:life-cycle]]",
    description: "Circular labelled life-cycle diagram."
  },
  {
    keys: ["process", "cycle", "stages", "steps", "प्रक्रिया", "चरण", "चक्र"],
    marker: "[[NEXORA_DIAGRAM:process-flow]]",
    description: "Chapter-specific process flow diagram using arrows and labelled stages."
  }
];

function getVisualForChapter(chapterTitle, subject, book, sourceText) {
  const haystack = norm([
    chapterTitle,
    subject,
    book,
    sourceText
  ].join(" "));

  for (const rule of VISUAL_RULES) {
    if (rule.keys.some(key => haystack.includes(norm(key)))) {
      return {
        marker: rule.marker,
        description: rule.description,
        source: "semantic-textbook-reference"
      };
    }
  }

  return null;
}

function getAllRelevantVisuals(chapterTitle, subject, book, sourceText) {
  const haystack = norm([
    chapterTitle,
    subject,
    book,
    sourceText
  ].join(" "));

  const found = [];

  for (const rule of VISUAL_RULES) {
    if (
      rule.keys.some(key => haystack.includes(norm(key))) &&
      !found.some(v => v.marker === rule.marker)
    ) {
      found.push({
        marker: rule.marker,
        description: rule.description,
        source: "semantic-textbook-reference"
      });
    }
  }

  return found;
}

module.exports = {
  VISUAL_RULES,
  getVisualForChapter,
  getAllRelevantVisuals
};
