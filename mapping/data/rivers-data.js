// ========================================
// NEXORA SMART MAPPING — RIVER DATA
// ========================================

const NEXORA_RIVER_DATA = {

    "Ganga": {
        type: "Major River",
        origin: "Gangotri Glacier, Uttarakhand",
        flowsThrough: ["Uttarakhand", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"],
        drainage: "Bay of Bengal",
        tributaries: ["Yamuna", "Ghaghara", "Gandak", "Kosi", "Son"],
        upscFacts: [
            "Ganga is one of India's most important river systems.",
            "It forms a major part of the Northern Plains.",
            "Its river basin is among the most densely populated regions of India."
        ]
    },

    "Yamuna": {
        type: "Major River",
        origin: "Yamunotri Glacier, Uttarakhand",
        flowsThrough: ["Uttarakhand", "Himachal Pradesh", "Haryana", "Delhi", "Uttar Pradesh"],
        drainage: "Bay of Bengal",
        tributaries: ["Chambal", "Betwa", "Ken", "Sind"],
        upscFacts: [
            "Yamuna is the largest tributary of the Ganga.",
            "It joins the Ganga at Prayagraj."
        ]
    },

    "Brahmaputra": {
        type: "Major River",
        origin: "Tibet",
        flowsThrough: ["Tibet", "Arunachal Pradesh", "Assam"],
        drainage: "Bay of Bengal",
        tributaries: ["Dibang", "Lohit", "Subansiri", "Manas"],
        upscFacts: [
            "The Brahmaputra enters India through Arunachal Pradesh.",
            "It is known for its braided channel in Assam."
        ]
    },

    "Narmada": {
        type: "Peninsular River",
        origin: "Amarkantak, Madhya Pradesh",
        flowsThrough: ["Madhya Pradesh", "Maharashtra", "Gujarat"],
        drainage: "Arabian Sea",
        tributaries: ["Tawa", "Hiran", "Banjar"],
        upscFacts: [
            "Narmada flows westward through a rift valley.",
            "It drains into the Arabian Sea."
        ]
    },

    "Godavari": {
        type: "Peninsular River",
        origin: "Trimbakeshwar, Maharashtra",
        flowsThrough: ["Maharashtra", "Telangana", "Andhra Pradesh"],
        drainage: "Bay of Bengal",
        tributaries: ["Pranhita", "Indravati", "Manjira"],
        upscFacts: [
            "Godavari is the largest Peninsular river system of India.",
            "It drains into the Bay of Bengal."
        ]
    },

    "Krishna": {
        type: "Peninsular River",
        origin: "Mahabaleshwar, Maharashtra",
        flowsThrough: ["Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"],
        drainage: "Bay of Bengal",
        tributaries: ["Bhima", "Tungabhadra", "Ghataprabha", "Malaprabha"],
        upscFacts: [
            "Krishna is an important east-flowing Peninsular river.",
            "Its basin covers parts of several states."
        ]
    },

    "Mahanadi": {
        type: "Peninsular River",
        origin: "Chhattisgarh",
        flowsThrough: ["Chhattisgarh", "Odisha"],
        drainage: "Bay of Bengal",
        tributaries: ["Seonath", "Hasdeo", "Ib", "Tel"],
        upscFacts: [
            "Mahanadi is an important river of central and eastern India.",
            "It forms a large delta before entering the Bay of Bengal."
        ]
    }

};

console.log(
    "NEXORA River Data loaded:",
    Object.keys(NEXORA_RIVER_DATA).length,
    "rivers"
);
