// ========================================
// NEXORA SMART MAPPING — STATE DATA
// ========================================

const NEXORA_STATE_DATA = {

    "Bihar": {
        capital: "Patna",
        region: "Eastern India",
        importantRivers: ["Ganga", "Kosi", "Gandak", "Son"],
        physicalFeatures: ["Gangetic Plain"],
        importantPlaces: ["Bodh Gaya", "Nalanda", "Vaishali"],
        upscFacts: [
            "Bihar lies mainly in the fertile Gangetic Plain.",
            "The Ganga flows through the state from west to east.",
            "Kosi is known for its shifting course and flood problems."
        ],
        ncertFacts: [
            "The northern part of Bihar is drained by Himalayan rivers.",
            "The southern part includes tributaries such as the Son."
        ]
    },

    "Uttar Pradesh": {
        capital: "Lucknow",
        region: "Northern India",
        importantRivers: ["Ganga", "Yamuna", "Ghaghara", "Gomti"],
        physicalFeatures: ["Ganga-Yamuna Plain"],
        importantPlaces: ["Agra", "Varanasi", "Prayagraj", "Ayodhya"],
        upscFacts: [
            "Uttar Pradesh occupies a major part of the Ganga Plain.",
            "The Ganga and Yamuna are major rivers of the state."
        ],
        ncertFacts: [
            "The northern and central parts are dominated by the Indo-Gangetic Plain."
        ]
    },

    "Rajasthan": {
        capital: "Jaipur",
        region: "Western India",
        importantRivers: ["Chambal", "Banas", "Luni"],
        physicalFeatures: ["Thar Desert", "Aravalli Range"],
        importantPlaces: ["Jaisalmer", "Udaipur", "Jodhpur"],
        upscFacts: [
            "The Thar Desert occupies much of western Rajasthan.",
            "The Aravalli Range runs across the state."
        ],
        ncertFacts: [
            "Rainfall generally decreases towards the western part of Rajasthan."
        ]
    },

    "Madhya Pradesh": {
        capital: "Bhopal",
        region: "Central India",
        importantRivers: ["Narmada", "Tapti", "Chambal", "Betwa"],
        physicalFeatures: ["Central Highlands", "Malwa Plateau"],
        importantPlaces: ["Khajuraho", "Sanchi", "Ujjain"],
        upscFacts: [
            "Madhya Pradesh is located in central India.",
            "The Narmada flows westward through a rift valley."
        ],
        ncertFacts: [
            "The state contains parts of the Central Highlands."
        ]
    },

    "Maharashtra": {
        capital: "Mumbai",
        region: "Western India",
        importantRivers: ["Godavari", "Krishna", "Tapi", "Bhima"],
        physicalFeatures: ["Western Ghats", "Deccan Plateau"],
        importantPlaces: ["Mumbai", "Pune", "Nashik", "Aurangabad"],
        upscFacts: [
            "The Western Ghats form the western highland belt.",
            "Much of Maharashtra lies on the Deccan Plateau."
        ],
        ncertFacts: [
            "The Godavari and Krishna river systems drain important parts of the Deccan."
        ]
    }

};

console.log(
    "NEXORA State Data loaded:",
    Object.keys(NEXORA_STATE_DATA).length,
    "states"
);
